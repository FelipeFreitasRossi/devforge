from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from app.auth import get_current_user
from app.database import (
    progress_collection,
    daily_activity_collection,
    lesson_submissions_collection,
)
from app.analytics import get_lesson_sidebar, check_achievements
from app.lessons import get_lesson, get_adjacent_lesson_ids, validate_submission
from app.code_runner import run_student_code

router = APIRouter(prefix="/api/lessons", tags=["lessons"])


class CodeSubmission(BaseModel):
    code: str
    exercise_id: str | None = None
    time_spent_seconds: int = 0


def _find_exercise(lesson: dict, exercise_id: str | None) -> dict:
    """Encontra o exercício pelo id. Se não passar, pega o primeiro."""
    exercises = lesson.get("exercises") or []
    if not exercises:
        if "exercise" in lesson:
            return lesson["exercise"]
        raise HTTPException(status_code=404, detail="Exercício não encontrado")

    if exercise_id is None:
        return exercises[0]

    for ex in exercises:
        if ex.get("id") == exercise_id:
            return ex
    raise HTTPException(status_code=404, detail="Exercício não encontrado")


@router.get("/{lesson_id}")
async def get_lesson_detail(lesson_id: str, user=Depends(get_current_user)):
    lesson = get_lesson(lesson_id)
    if not lesson:
        raise HTTPException(status_code=404, detail="Lição não encontrada")

    user_id = str(user["_id"])
    prev_id, next_id = get_adjacent_lesson_ids(lesson_id)

    already_completed = progress_collection.find_one({
        "user_id": user_id,
        "lesson_id": lesson_id,
        "completed": True,
    }) is not None

    attempts = lesson_submissions_collection.count_documents({
        "user_id": user_id,
        "lesson_id": lesson_id,
    })

    return {
        "lesson": lesson,
        "already_completed": already_completed,
        "attempts": attempts,
        "prev_lesson_id": prev_id,
        "next_lesson_id": next_id,
        "sidebar": get_lesson_sidebar(user_id, lesson_id),
    }


@router.post("/{lesson_id}/submit")
async def submit_code(
    lesson_id: str, data: CodeSubmission, user=Depends(get_current_user)
):
    lesson = get_lesson(lesson_id)
    if not lesson:
        raise HTTPException(status_code=404, detail="Lição não encontrada")

    exercise = _find_exercise(lesson, data.exercise_id)
    user_id = str(user["_id"])

    execution = run_student_code(data.code)

    attempts_before = lesson_submissions_collection.count_documents({
        "user_id": user_id,
        "lesson_id": lesson_id,
    })

    if not execution.ok:
        lesson_submissions_collection.insert_one({
            "user_id": user_id,
            "lesson_id": lesson_id,
            "module_id": lesson["module_id"],
            "exercise_id": data.exercise_id,
            "code": data.code,
            "success": False,
            "attempts": attempts_before + 1,
            "time_spent_seconds": data.time_spent_seconds,
            "submitted_at": datetime.utcnow(),
            "output": execution.stdout,
            "error_type": execution.error_type,
        })
        return {
            "success": False,
            "error_type": execution.error_type or "RuntimeError",
            "error_message": execution.error_message or "Erro ao executar o código.",
            "hint": exercise["hint"],
        }

    validation = validate_submission(exercise, execution.stdout)

    lesson_submissions_collection.insert_one({
        "user_id": user_id,
        "lesson_id": lesson_id,
        "module_id": lesson["module_id"],
        "exercise_id": data.exercise_id,
        "code": data.code,
        "success": validation["success"],
        "attempts": attempts_before + 1,
        "time_spent_seconds": data.time_spent_seconds,
        "submitted_at": datetime.utcnow(),
        "output": execution.stdout,
    })

    if not validation["success"]:
        return {
            "success": False,
            "error_type": "WrongOutput",
            "expected": validation.get("expected"),
            "got": validation.get("got"),
            "hint": exercise["hint"],
        }

    today = datetime.utcnow().strftime("%Y-%m-%d")
    reading_minutes = lesson.get("reading_time_minutes", 10)
    time_spent_minutes = max(1, round(data.time_spent_seconds / 60)) or reading_minutes

    progress_collection.update_one(
        {"user_id": user_id, "module_id": lesson["module_id"], "lesson_id": lesson_id},
        {
            "$set": {
                "user_id": user_id,
                "module_id": lesson["module_id"],
                "lesson_id": lesson_id,
                "completed": True,
                "time_spent_minutes": time_spent_minutes,
                "completed_at": datetime.utcnow(),
            }
        },
        upsert=True,
    )

    daily_activity_collection.update_one(
        {"user_id": user_id, "date": today},
        {
            "$inc": {"minutes_studied": time_spent_minutes},
            "$setOnInsert": {"user_id": user_id, "date": today},
        },
        upsert=True,
    )

    new_achievements = check_achievements(user_id)
    _, next_lesson_id = get_adjacent_lesson_ids(lesson_id)

    return {
        "success": True,
        "output": execution.stdout.strip(),
        "message": "Parabéns! Exercício concluído.",
        "next_lesson_id": next_lesson_id,
        "new_achievements": new_achievements,
    }
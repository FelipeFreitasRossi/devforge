from fastapi import APIRouter, Depends
from pydantic import BaseModel
from datetime import datetime
from app.auth import get_current_user
from app.database import (
    progress_collection,
    daily_activity_collection,
)
from app.analytics import (
    calculate_streak,
    calculate_total_hours,
    get_next_lesson,
    get_weekly_goal_progress,
    get_all_modules_with_progress,
    get_all_achievements,
    check_achievements,
    CURRICULUM,
)

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])


class ProgressInput(BaseModel):
    module_id: str
    lesson_id: str
    time_spent_minutes: int
    completed: bool


@router.get("/overview")
async def get_overview(user=Depends(get_current_user)):
    user_id = str(user["_id"])

    modules = get_all_modules_with_progress(user_id)
    active = sum(1 for m in modules if m["status"] == "in_progress")
    completed = sum(1 for m in modules if m["status"] == "completed")

    return {
        "user": {"name": user["name"], "email": user["email"]},
        "stats": {
            "active_modules": active,
            "completed_modules": completed,
            "study_hours": calculate_total_hours(user_id),
            "weekly_goal_progress": get_weekly_goal_progress(user_id),
        },
        "streak": calculate_streak(user_id),
        "next_lesson": get_next_lesson(user_id),
    }


@router.get("/modules")
async def get_modules(user=Depends(get_current_user)):
    user_id = str(user["_id"])
    return {"modules": get_all_modules_with_progress(user_id)}


@router.get("/achievements")
async def get_achievements(user=Depends(get_current_user)):
    user_id = str(user["_id"])
    return {"achievements": get_all_achievements(user_id)}


@router.post("/progress")
async def post_progress(
    data: ProgressInput, user=Depends(get_current_user)
):
    user_id = str(user["_id"])
    today = datetime.utcnow().strftime("%Y-%m-%d")

    # Salva progresso da aula
    progress_collection.update_one(
        {
            "user_id": user_id,
            "module_id": data.module_id,
            "lesson_id": data.lesson_id,
        },
        {
            "$set": {
                "user_id": user_id,
                "module_id": data.module_id,
                "lesson_id": data.lesson_id,
                "completed": data.completed,
                "time_spent_minutes": data.time_spent_minutes,
                "completed_at": datetime.utcnow() if data.completed else None,
            }
        },
        upsert=True,
    )

    # Registra atividade diária (para streak)
    daily_activity_collection.update_one(
        {"user_id": user_id, "date": today},
        {
            "$inc": {"minutes_studied": data.time_spent_minutes},
            "$setOnInsert": {"user_id": user_id, "date": today},
        },
        upsert=True,
    )

    # Verifica conquistas
    new_achievements = check_achievements(user_id)

    return {"success": True, "new_achievements": new_achievements}
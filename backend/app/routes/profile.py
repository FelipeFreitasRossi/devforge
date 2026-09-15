from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, EmailStr, Field

from app.auth import get_current_user, hash_password, verify_password
from app.database import users_collection, progress_collection
from app.analytics import (
    calculate_streak,
    calculate_total_hours,
    get_all_modules_with_progress,
    get_all_achievements,
)

router = APIRouter(prefix="/api/profile", tags=["profile"])


class UpdateProfileRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=80)


class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str = Field(..., min_length=6, max_length=72)


@router.get("")
async def get_profile(user=Depends(get_current_user)):
    user_id = str(user["_id"])

    modules = get_all_modules_with_progress(user_id)
    active = sum(1 for m in modules if m["status"] == "in_progress")
    completed = sum(1 for m in modules if m["status"] == "completed")
    achievements = get_all_achievements(user_id)
    unlocked = sum(1 for a in achievements if a["unlocked"])
    streak = calculate_streak(user_id)

    created_at = user.get("created_at")
    if isinstance(created_at, datetime):
        created_at_str = created_at.isoformat()
    else:
        created_at_str = str(created_at) if created_at else None

    return {
        "user": {
            "id": user_id,
            "name": user["name"],
            "email": user["email"],
            "created_at": created_at_str,
            "paid": user.get("paid", False),
        },
        "stats": {
            "active_modules": active,
            "completed_modules": completed,
            "study_hours": calculate_total_hours(user_id),
            "streak_current": streak["current_days"],
            "streak_longest": streak["longest_days"],
            "achievements_unlocked": unlocked,
            "achievements_total": len(achievements),
        },
    }


@router.put("")
async def update_profile(
    data: UpdateProfileRequest, user=Depends(get_current_user)
):
    users_collection.update_one(
        {"_id": user["_id"]},
        {"$set": {"name": data.name.strip()}},
    )

    updated = users_collection.find_one({"_id": user["_id"]})
    return {
        "success": True,
        "user": {
            "id": str(updated["_id"]),
            "name": updated["name"],
            "email": updated["email"],
            "paid": updated.get("paid", False),
        },
    }


@router.put("/password")
async def change_password(
    data: ChangePasswordRequest, user=Depends(get_current_user)
):
    # Verifica senha atual
    if not verify_password(data.current_password, user["password_hash"]):
        raise HTTPException(status_code=400, detail="Senha atual incorreta")

    # Verifica se a nova é diferente
    if verify_password(data.new_password, user["password_hash"]):
        raise HTTPException(
            status_code=400,
            detail="A nova senha deve ser diferente da atual",
        )

    # Atualiza no banco
    users_collection.update_one(
        {"_id": user["_id"]},
        {"$set": {"password_hash": hash_password(data.new_password)}},
    )

    return {"success": True, "message": "Senha atualizada com sucesso"}
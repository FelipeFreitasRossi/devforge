from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from app.auth import hash_password, verify_password, create_access_token
from app.database import users_collection

router = APIRouter()

class RegisterRequest(BaseModel):
    name: str = Field(..., min_length=2)
    email: EmailStr
    password: str = Field(..., min_length=6)

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(data: RegisterRequest):
    if users_collection.find_one({"email": data.email}):
        raise HTTPException(status_code=400, detail="Email já cadastrado")

    user = {
        "name": data.name,
        "email": data.email,
        "password_hash": hash_password(data.password),
        "paid": False,
        "created_at": datetime.utcnow(),
    }
    result = users_collection.insert_one(user)

    token = create_access_token({"sub": data.email})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": str(result.inserted_id),
            "name": data.name,
            "email": data.email,
            "paid": False,
        },
    }

@router.post("/login")
async def login(data: LoginRequest):
    user = users_collection.find_one({"email": data.email})
    if not user or not verify_password(data.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Email ou senha incorretos")

    token = create_access_token({"sub": data.email})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"],
            "paid": user.get("paid", False),
        },
    }

@router.get("/me")
async def me(user = None):
    from app.auth import get_current_user
    from fastapi import Depends
    # Esse endpoint precisa do get_current_user como dep
    # Vou deixar simples abaixo:

from app.auth import get_current_user
from fastapi import Depends

@router.get("/me", dependencies=[])
async def get_me(current_user = Depends(get_current_user)):
    return {
        "id": str(current_user["_id"]),
        "name": current_user["name"],
        "email": current_user["email"],
        "paid": current_user.get("paid", False),
    }
import os
from datetime import datetime, timedelta
import bcrypt
from jose import JWTError, jwt
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.database import users_collection

security = HTTPBearer()

def hash_password(password: str) -> str:
    """Gera hash bcrypt da senha."""
    # bcrypt tem limite de 72 bytes; truncamos por segurança
    password_bytes = password.encode("utf-8")[:72]
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password_bytes, salt).decode("utf-8")

def verify_password(plain: str, hashed: str) -> bool:
    """Verifica se a senha confere com o hash."""
    try:
        password_bytes = plain.encode("utf-8")[:72]
        return bcrypt.checkpw(password_bytes, hashed.encode("utf-8"))
    except Exception:
        return False

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(
        hours=int(os.getenv("JWT_EXPIRATION_HOURS", 24))
    )
    to_encode.update({"exp": expire})
    return jwt.encode(
        to_encode,
        os.getenv("JWT_SECRET"),
        algorithm=os.getenv("JWT_ALGORITHM", "HS256"),
    )

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
):
    token = credentials.credentials
    try:
        payload = jwt.decode(
            token,
            os.getenv("JWT_SECRET"),
            algorithms=[os.getenv("JWT_ALGORITHM", "HS256")],
        )
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Token inválido")
    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido")

    user = users_collection.find_one({"email": email})
    if user is None:
        raise HTTPException(status_code=401, detail="Usuário não encontrado")
    return user
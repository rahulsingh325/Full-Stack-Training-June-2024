from datetime import datetime, timedelta, timezone
from fastapi import HTTPException, status
from jose import jwt, JWTError
from app.core.config import settings


def create_access_token(user_id: int) -> str:
    payload = {
        "sub": str(user_id),  # FIXED
        "exp": datetime.now(timezone.utc)
        + timedelta(minutes=settings.JWT_EXPIRE_MINUTES),
    }

    return jwt.encode(
        payload,
        settings.JWT_SECRET_KEY,
        algorithm=settings.JWT_ALGORITHM,
    )



def verify_access_token(token: str) -> dict:
    try:
        payload = jwt.decode(
            token,
            settings.JWT_SECRET_KEY,
            algorithms=[settings.JWT_ALGORITHM],
        )
    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token",
        )

    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(
            status_code=401,
            detail="Invalid token payload",
        )

    return {
        "user_id": int(user_id),
    }


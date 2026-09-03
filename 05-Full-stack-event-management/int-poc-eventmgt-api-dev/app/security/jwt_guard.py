from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from app.core.config import settings

security = HTTPBearer()

def jwt_guard(
    creds: HTTPAuthorizationCredentials = Depends(security),
) -> dict:
    try:
        payload = jwt.decode(
            creds.credentials,
            settings.JWT_SECRET_KEY,
            algorithms=[settings.JWT_ALGORITHM],
        )

        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(401, "Invalid token payload")

        return {
            "user_id": int(user_id),
            "email": payload.get("email"),
            "name": payload.get("name"),
        }

    except JWTError:
        raise HTTPException(401, "Invalid or expired token")


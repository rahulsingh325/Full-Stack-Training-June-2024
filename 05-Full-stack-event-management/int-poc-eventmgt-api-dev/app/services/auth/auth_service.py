from fastapi import HTTPException

from app.security.password import hash_password, verify_password
from app.security.jwt_token import create_access_token

from app.db.session import get_system_db
from app.db.procedures import call_procedure_read, call_procedure






def signup_user(email: str, password: str):
    conn = get_system_db()
    try:
        password_hash = hash_password(password)
        call_procedure(
            conn,
            "emd.sp_user_signup",
            {
                "email": email,
                "password_hash": password_hash,
            },
        )
        return {"message": "Signup successful"}
    except Exception as exc:
        if "EMAIL_ALREADY_EXISTS" in f"{exc}":
            raise HTTPException(400, "Email already exists")
        raise
    finally:
        conn.close()


def login_user(email: str, password: str):
    conn = get_system_db()
    try:
        rows = call_procedure_read(
            conn,
            "emd.sp_user_login",
            {"email": email},
        )

        if not rows:
            raise HTTPException(401, "Invalid credentials")

        user = rows[0]

        if not user["is_active"]:
            raise HTTPException(403, "User disabled")

        if not verify_password(password, user["password_hash"]):
            raise HTTPException(401, "Invalid credentials")

        token = create_access_token(user["id"])

        return {
            "access_token": token,
            "token_type": "bearer",
        }
    finally:
        conn.close()

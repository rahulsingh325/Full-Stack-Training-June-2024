from fastapi import APIRouter
from app.schemas.auth.auth_schema import SignupRequest, LoginRequest
from app.services.auth.auth_service import signup_user, login_user

router = APIRouter()

@router.post("/signup")
def signup(payload: SignupRequest):
    return signup_user(payload.email, payload.password)


@router.post("/login")
def login(payload: LoginRequest):
    return login_user(payload.email, payload.password)


@router.post("/logout")
def logout():
    return {"message": "Logged out"}

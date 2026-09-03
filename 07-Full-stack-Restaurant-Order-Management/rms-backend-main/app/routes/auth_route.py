from fastapi import APIRouter, Form, Request, Response, Depends, BackgroundTasks
from app.services.auth_service import create_user, login_user, check_user, update_password, send_otp, update_user_profile, verify_top, set_new_password
from app.models.user_model import User, ChangePasswordModel, LoginModel, UserUpdateRequest
from app.utils.check_auth import check_auth
from pydantic import EmailStr



router = APIRouter()


@router.post('/register')
def register(user:User, response:Response):
   return create_user(user, response)

@router.post('/login')
async def login(login_model:LoginModel, response: Response):
    return login_user(login_model.email, login_model.password, response)

@router.get('/me')
def check(user: str = Depends(check_auth)):
    return check_user(user)

@router.patch('/update-password')
def password_change(password_model:ChangePasswordModel, user:dict = Depends(check_auth)):
    return update_password(user, password_model)

@router.post('/forgot-password')
async def forgot_password(request:Request ,background_tasks:BackgroundTasks):
    data = await request.json()
    return await send_otp(data.get('email'), background_tasks)

@router.post('/otp-verify')
async def otp_verify(request:Request):
    return await verify_top(request)

@router.post('/reset-password')
async def reset_password(request:Request):
    return await set_new_password(request)

@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie(
        key="access_token",
        httponly=True,
        samesite="none",
        secure=True,
        path="/"   # REQUIRED
    )
    return {"success": True, "data": "Logged out successfully"}

@router.put('/update-profile')
async def update_profile(updated_user:UserUpdateRequest, user:dict = Depends(check_auth)):
    return await update_user_profile(user, updated_user)
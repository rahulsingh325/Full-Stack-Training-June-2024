
import datetime
from pydantic import BaseModel, Field, EmailStr
from typing import Optional, Literal
import uuid
from fastapi import HTTPException
import secrets

class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str 
    email: EmailStr
    password: str 
    profilePicture: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    role: Literal['user', 'admin'] = 'user'
    resetPasswordToken: Optional[str] = Field(default=None)
    resetPasswordExpires: Optional[datetime.datetime] = Field(default=None)
    
    otp: Optional[str] = Field(default=None)
    otp_expiry: Optional[str] = Field(default=None)
    otp_verified: bool = Field(default=False)

    def set_otp(self, length: int = 7, expiry_minutes: int = 5):
        otp = str(secrets.randbelow(10**length)).zfill(length)
        self.otp = otp
        self.otp_expiry = (datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=expiry_minutes)).isoformat()
        self.otp_verified = False
        return otp

    def verify_otp(self, otp: str) -> bool:
        if self.otp == otp and self.otp_expiry and datetime.datetime.fromisoformat(self.otp_expiry) > datetime.datetime.now(datetime.timezone.utc):
            print('otp verified')
            self.otp_verified = True
            return True
        print('otp not verified')
    
        return False

    def reset_password(self, new_password: str):
        if not self.otp_verified:
            raise HTTPException(status_code=403, detail="OTP not verified")
        self.password = new_password
        self.otp = None
        self.otp_expiry = None
        self.otp_verified = False
        return True

    def response_dict(self):
        return self.model_dump(exclude={
            "otp",
            "otp_expiry",
            "otp_verified",
            "password",
            "resetPasswordToken",
            "resetPasswordExpires"
        })

class UserUpdateRequest(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    address: Optional[str] = None 

     
class ChangePasswordModel(BaseModel):
    current_password: str
    new_password: str

class LoginModel(BaseModel):
    email: EmailStr
    password: str 
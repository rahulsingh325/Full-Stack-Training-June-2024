from app.config import USER_FILE
from app.utils.read_data import read_data
from app.utils.write_data import write_data
from app.utils.upload_file import upload_single_file
from fastapi import HTTPException, Response, Request
import bcrypt
from app.utils.send_token import send_token
from app.models.user_model import  User, ChangePasswordModel, UserUpdateRequest
from app.utils.mailer import send_mail

def create_user(user:User, response:Response):
    users = read_data(USER_FILE)
    
    #checking user already registered with email or not
    for u in users:
        if u['email'] == user.email:
            raise HTTPException(status_code=409, detail='Email already exist')
        
    password_byte = user.password.encode('utf-8')
    salt = bcrypt.gensalt()
    hash_password = bcrypt.hashpw(password_byte, salt)
    
    user.password = hash_password.decode('utf-8')
    users.append(user.model_dump())
    write_data(USER_FILE, users)
    send_token(user.id, response)
    return user.response_dict()
    
def login_user(email, password, response):
    try:
        users = read_data(USER_FILE)

        for user in users:
            user = User(**user)
            if user.email == email:
                check_password = bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8'))
                if(check_password):
                    send_token(user.id, response)
                    return user.response_dict()
                
        raise HTTPException(status_code=401, detail="wrong credentials")
    except:
        raise HTTPException(status_code=401, detail='wrong credentials')

def check_user(user_payload):
    users = read_data(USER_FILE)
    for user in users:
        user = User(**user)
        if user.id == user_payload['user_id']:
            return user.response_dict()
    HTTPException(status_code=404, detail="User not found")
    
def update_password(user_payload, password_model:ChangePasswordModel):
    users = read_data(USER_FILE)
    for user in users:
        if user['id'] == user_payload['user_id']:
            check_password = bcrypt.checkpw(password_model.current_password.encode('utf-8'), user['password'].encode('utf-8'))
            if check_password:
                salt = bcrypt.gensalt()
                hash_password = bcrypt.hashpw(password_model.new_password.encode('utf-8'), salt)
                user['password'] = hash_password.decode('utf-8')
                write_data(USER_FILE, users)
                return 'Password updated successful'
            else:
                raise HTTPException(status_code=403, detail='Current password did not match')
    raise HTTPException(status_code=404, detail="User not found")
    
async def send_otp(email, background_tasks):
    users = read_data(USER_FILE)

    for user in users:
        if(user['email'] == email):
            userModel = User(**user)
            otp = userModel.set_otp()
            user['otp'] = otp
            user['otp_expiry'] = userModel.otp_expiry
            write_data(USER_FILE, users)
            body = f"""
                    {userModel.name}
                    Your One-Time Password (OTP) is: <b>{otp}</b><br>
                    It will expire in 5 minuts.<br><br>
                    If you did not request this, please ignore this message.
                    """
            await send_mail(background_tasks, userModel.email, 'otp', body)
            return 'OTP send successful'
    raise HTTPException(status_code=404, detail='user not found')

async def verify_top(request:Request):
    data = await request.json()
    users = read_data(USER_FILE)
    for user in users:
        if user['email'] == data.get('email'):
            user_model = User(**user)
            verified = user_model.verify_otp(data.get('otp'))
            if(verified):
                user_dict = user_model.model_dump()
                user.update(user_dict)
                write_data(USER_FILE, users)
                return 'otp verified successful'

            else:
                raise HTTPException(status_code=403, detail='wrong or invalid otp')
    raise HTTPException(status_code=404, detail='user not found')
    
async def set_new_password(request:Request):
    data = await request.json()
    users = read_data(USER_FILE)
    for user in users:
        if user['email'] == data.get('email'):
            salt = bcrypt.gensalt()
            hash_password = bcrypt.hashpw(data.get('new_password').encode('utf-8'), salt)
            user_model = User(**user)
            user_model.reset_password(hash_password.decode('utf-8'))
            user_dict = user_model.model_dump()
            user.update(user_dict)
            write_data(USER_FILE, users)
            return 'Password reset successful'
    raise HTTPException(status_code=404, detail="User not found")

async def update_user_profile(user_payload, updated_user:UserUpdateRequest):
    users = read_data(USER_FILE)
    for user in users:
        if user['id'] == user_payload['user_id']:
            user_dict = updated_user.model_dump()
            user.update(user_dict)
            write_data(USER_FILE, users)
            return user
    raise HTTPException(status_code=404, detail="User not found")
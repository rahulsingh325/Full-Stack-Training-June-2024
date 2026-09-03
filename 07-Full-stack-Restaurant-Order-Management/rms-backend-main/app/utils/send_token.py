import datetime
import jwt
import os

def send_token(user_id, response):
    payload = {
        'user_id':user_id,
        "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=1)
    }
    token = jwt.encode(payload, os.getenv('JWT_SECRET'), algorithm="HS256")
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        max_age=3600,
        samesite="none",
        secure=True,
        path="/"   # IMPORTANT
    )
from fastapi import Request, HTTPException
import jwt, os


def check_auth(request:Request):
    token = request.cookies.get("access_token")
    
    if(not token):
        raise HTTPException(status_code=401, detail='Not authenticated')
    try:
        payload = jwt.decode(token, os.getenv('JWT_SECRET'), algorithms='HS256')
        request.state.user = payload
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail='Token Expired')
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail='Invalid token')
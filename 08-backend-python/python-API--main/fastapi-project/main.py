# main.py
from fastapi import FastAPI, Header, Request
from pydantic import BaseModel
class User(BaseModel):
    id : str
    name : str
    address : str 
    
    
users = []

app = FastAPI()

# Root endpoint
@app.post("/users")
def add_users(user:User):
    users.append(user.__dict__)
    return user

@app.get("/users")
def get_all_users():
    return users


@app.get("/users/{user_id}")
def get_user_by_id(user_id):
    for user in users:
        if user_id == user["id"]:
            return user
    return "user not found"


@app.put("/users/{user_id}")
def update_user(user_id,user:User):
    for u in users:
        if user_id == u["id"]:
            u.update(user.__dict__)
            return u
    return "user not found"


@app.delete("/users/{user_id}")
def delete_user_by_id(user_id):
    for u in users:
        if user_id == u["id"]:
            users.remove(u)
            return u
    return "user not found"






    




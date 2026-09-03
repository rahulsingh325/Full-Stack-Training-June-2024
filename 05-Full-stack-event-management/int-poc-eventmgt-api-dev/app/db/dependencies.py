from fastapi import Depends
from app.db.session import get_system_db


def get_db():
    conn = get_system_db()
    try:
        yield conn
    finally:
        conn.close()


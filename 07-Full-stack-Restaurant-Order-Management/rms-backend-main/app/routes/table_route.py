from fastapi import APIRouter
from app.services.table_service import get_all_tables

router = APIRouter()

@router.get('/')
def get_tables():
    return get_all_tables()
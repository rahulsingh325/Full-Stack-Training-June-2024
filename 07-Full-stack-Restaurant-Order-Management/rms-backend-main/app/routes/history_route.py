from fastapi import APIRouter, Depends
from app.dependencies.query_dependency import get_common_query
from app.services.history_service import get_all_history


router = APIRouter()


@router.get('/')
def get_history(queries:dict = Depends(get_common_query)): 
    return get_all_history(queries)
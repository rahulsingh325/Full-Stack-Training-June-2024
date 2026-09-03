from fastapi import APIRouter, Depends
from app.services.menu_service import get_all_menu_items, get_menu_categories, get_menu_item_by_category
from app.utils.check_auth import check_auth
from app.dependencies.query_dependency import get_common_query

router = APIRouter()

@router.get('/categories')
def get_categories():
    return get_menu_categories()

@router.get('/')
def get_menu(queries : dict = Depends(get_common_query)): #auth: None = Depends(check_auth)
    return get_all_menu_items(queries)

@router.get('/category/{category}')
def get_menu_items(category, queries : dict = Depends(get_common_query)):
    return get_menu_item_by_category(category, queries)

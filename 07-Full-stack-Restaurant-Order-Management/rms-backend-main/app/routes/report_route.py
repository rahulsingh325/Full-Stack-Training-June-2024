from fastapi import APIRouter, Depends
from app.dependencies.query_dependency import get_common_query
from app.services.report_service import get_income, get_overall, get_reports, get_trasactions, get_trending_menu


router = APIRouter()


@router.get('/')
def reports(queries:dict = Depends(get_common_query)):
    return get_reports(queries)

@router.get('/transactions')
def transactions(queries:dict = Depends(get_common_query)):
    return get_trasactions(queries)

@router.get('/overall')
def overall(queries:dict = Depends(get_common_query)):
    return get_overall(queries)

@router.get('/income')
def income(queries:dict = Depends(get_common_query)):
    return get_income(queries)

@router.get('/trending-menu')
def trending_menu(queries:dict = Depends(get_common_query)):
    return get_trending_menu(queries)
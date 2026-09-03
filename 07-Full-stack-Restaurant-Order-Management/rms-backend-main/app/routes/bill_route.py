from fastapi import APIRouter, Depends
from app.services.bill_service import (
    get_all_bills,
    get_bill_by_id,
    add_new_bill,
    delete_bill,
)
from app.dependencies.query_dependency import get_common_query

router = APIRouter()

@router.get("/")
def get_bills(queries: dict = Depends(get_common_query)):
    return get_all_bills(queries)

@router.get("/{bill_id}")
def get_bill(bill_id: int):
    return get_bill_by_id(bill_id)

@router.post("/")
def create_bill(bill: dict):
    return add_new_bill(bill)

@router.delete("/{bill_id}")
def remove_bill(bill_id: int):
    return delete_bill(bill_id)

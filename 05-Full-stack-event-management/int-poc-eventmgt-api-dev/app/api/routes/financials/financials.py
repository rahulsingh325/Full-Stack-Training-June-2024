from datetime import date
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query

from app.security.context import get_current_user
from app.security.jwt_guard import jwt_guard
from app.db.dependencies import get_db
from app.schemas.financials.expense_schema import (
    ExpenseCreate,
    ExpenseCategoryCreate,
)
from app.services.financials.financials_service import (
    create_expense,
    create_expense_category,
    get_financial_full,
    list_expense_categories,
    list_expenses,
)

router = APIRouter()


@router.get("/all_data")
def financials(
    from_date: date | None = None,
    to_date: date | None = None,
    months: int = Query(6, ge=1, le=24),
    transactions_limit: int = Query(10, ge=1, le=50),
    search: str | None = None,
    month_filter: str = Query("this_month", regex="^(this_month|last_month|custom)$"),
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=5, le=50),

    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_financial_full(
        conn=conn,
        user_id=current_user["user_id"],
        from_date=from_date,
        to_date=to_date,
        months=months,
        transactions_limit=transactions_limit,

        search=search,
        month_filter=month_filter,
        page=page,
        page_size=page_size,
    )



@router.post("/expenses")
def add_expense(
    payload: ExpenseCreate,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return create_expense(
        conn=conn,
        user_id=current_user["user_id"],
        payload=payload,
    )


@router.get("/expenses")
def get_expenses(
    from_date: Optional[date] = None,
    to_date: Optional[date] = None,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return list_expenses(
        conn=conn,
        user_id=current_user["user_id"],
        from_date=from_date,
        to_date=to_date,
    )


@router.post("/expense-categories")
def add_expense_category(
    payload: ExpenseCategoryCreate,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    try:
        return create_expense_category(
            conn=conn,
            user_id=current_user["user_id"],
            payload=payload,
        )
    except ValueError as exc:
        if str(exc) == "category_already_exists":
            raise HTTPException(
                status_code=409,
                detail="Expense category already exists",
            )
        if str(exc) == "category_name_required":
            raise HTTPException(
                status_code=400,
                detail="Category name is required",
            )
        raise

@router.get("/expense-categories")
def get_expense_categories(
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return list_expense_categories(
        conn=conn,
        user_id=current_user["user_id"],
    )

from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException

from app.schemas.category_schema import CategoryCreate
from app.security.context import get_current_user
from app.security.jwt_guard import jwt_guard
from app.db.dependencies import get_db
from app.services.category_service import (
    create_category,
    list_categories,
    delete_category,
)

router = APIRouter()


@router.post("/create")
def create(
    payload: CategoryCreate,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    result = create_category(
        conn=conn,
        user_id=current_user["user_id"],
        payload=payload,
    )
    if not result:
        raise HTTPException(status_code=400, detail="Category not created")
    return result


@router.get("/list")
def list_(
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return list_categories(
        conn=conn,
        user_id=current_user["user_id"],
    )


@router.delete("/delete/{category_id}")
def delete_(
    category_id: UUID,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    result = delete_category(
        conn=conn,
        user_id=current_user["user_id"],
        category_id=category_id,
    )
    if not result:
        raise HTTPException(status_code=404, detail="Category not found")
    return result

from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException

from app.schemas.organization_schema import (
    OrganizationCreate,
    OrganizationUpdate,
)
from app.security.context import get_current_user
from app.security.jwt_guard import jwt_guard
from app.db.dependencies import get_db
from app.services.organization_service import (
    create_organization,
    get_organization,
    list_organizations,
    update_organization,
    delete_organization,
)

router = APIRouter()


@router.post("/create")
def create(
    payload: OrganizationCreate,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return create_organization(
        conn=conn,
        user_id=current_user["user_id"],
        payload=payload,
    )


@router.get("/list")
def list_(
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return list_organizations(
        conn=conn,
        user_id=current_user["user_id"],
    )


@router.get("/by_id/{organization_id}")
def get_(
    organization_id: UUID,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    org = get_organization(
        conn=conn,
        user_id=current_user["user_id"],
        organization_id=organization_id,
    )
    if not org:
        raise HTTPException(status_code=404, detail="Organization not found")
    return org


@router.put("/update/{organization_id}")
def update_(
    organization_id: UUID,
    payload: OrganizationUpdate,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return update_organization(
        conn=conn,
        user_id=current_user["user_id"],
        organization_id=organization_id,
        payload=payload,
    )


@router.delete("/delete/{organization_id}")
def delete_(
    organization_id: UUID,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return delete_organization(
        conn=conn,
        user_id=current_user["user_id"],
        organization_id=organization_id,
    )

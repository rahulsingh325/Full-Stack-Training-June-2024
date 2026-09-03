from uuid import UUID
from app.db.procedures import call_procedure, call_procedure_read


def create_organization(
    conn,
    user_id: int,
    payload,
):
    rows = call_procedure_read(
        conn,
        "emd.sp_organization_create",
        {
            "user_id": user_id,
            **payload.model_dump(),
        },
    )
    return rows[0] if rows else None


def get_organization(
    conn,
    user_id: int,
    organization_id: UUID,
):
    rows = call_procedure_read(
        conn,
        "emd.sp_organization_get",
        {
            "user_id": user_id,
            "organization_id": organization_id,
        },
    )
    return rows[0] if rows else None


def list_organizations(
    conn,
    user_id: int,
):
    rows = call_procedure_read(
        conn,
        "emd.sp_organization_list",
        {
            "user_id": user_id,
        },
    )
    return rows or []


def update_organization(
    conn,
    user_id: int,
    organization_id: UUID,
    payload,
):
    rows = call_procedure_read(
        conn,
        "emd.sp_organization_update",
        {
            "user_id": user_id,
            "organization_id": organization_id,
            **payload.model_dump(),
        },
    )
    return rows[0] if rows else None


def delete_organization(
    conn,
    user_id: int,
    organization_id: UUID,
):
    rows = call_procedure_read(
        conn,
        "emd.sp_organization_delete",
        {
            "user_id": user_id,
            "organization_id": organization_id,
        },
    )
    return rows[0] if rows else None

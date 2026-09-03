from uuid import UUID
from app.db.procedures import call_procedure, call_procedure_read
from app.schemas.category_schema import CategoryCreate


def create_category(
    conn,
    user_id: int,
    payload: CategoryCreate,
):
    rows = call_procedure_read(
        conn,
        "emd.sp_category_create",
        {
            "user_id": user_id,
            **payload.model_dump(),
        },
    )

    if not rows:
        return None

    row = rows[0]

    return {
        "category_id": str(row["id"]),  
        "name": row["name"],
        "is_active": row["is_active"],
    }



def list_categories(
    conn,
    user_id: int,
):
    rows = call_procedure_read(
        conn,
        "emd.sp_category_list_get",
        {
            "user_id": user_id,
        },
    )
    return rows or []


def delete_category(
    conn,
    user_id: int,
    category_id: UUID,
):
    rows = call_procedure_read(
        conn,
        "emd.sp_category_delete",
        {
            "user_id": user_id,
            "category_id": category_id,
        },
    )

    if not rows:
        return None

    row = rows[0]

    return {
        "category_id": str(row["category_id"]),
        "status": row["status"],
    }

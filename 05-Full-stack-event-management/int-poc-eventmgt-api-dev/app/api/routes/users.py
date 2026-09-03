from fastapi import APIRouter, Depends
from typing import Optional
from app.db.dependencies import get_db
from app.security.context import get_current_user
from app.db.procedures import call_procedure_read

router = APIRouter()


@router.get("/search")
def search_users(
    q: Optional[str] = None,
    limit: int = 10,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    rows = call_procedure_read(
        conn,
        "emd.sp_user_search",
        {
            "q": q,
            "limit": limit,
        },
    )
    return rows

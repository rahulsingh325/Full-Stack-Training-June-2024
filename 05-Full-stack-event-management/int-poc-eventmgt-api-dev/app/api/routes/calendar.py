from uuid import UUID
from datetime import date

from fastapi import APIRouter, Depends, HTTPException, Query

from app.security.context import get_current_user
from app.security.jwt_guard import jwt_guard
from app.db.dependencies import get_db
from app.services.calendar_service import (
    get_calendar_agenda,
    get_calendar_list,
)

router = APIRouter()


@router.get("/agenda/{calendar_agenda_id}")
def get_agenda(
    calendar_agenda_id: UUID,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    result = get_calendar_agenda(
        conn=conn,
        user_id=current_user["user_id"],
        calendar_agenda_id=calendar_agenda_id,
    )
    if not result:
        raise HTTPException(status_code=404, detail="Agenda not found")
    return result


@router.get("/agendas")
def calendar_list(
    from_date: date = Query(...),
    to_date: date = Query(...),
    agenda_type: str | None = Query(None),
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_calendar_list(
        conn=conn,
        user_id=current_user["user_id"],
        from_date=from_date,
        to_date=to_date,
        agenda_type=agenda_type,
    )

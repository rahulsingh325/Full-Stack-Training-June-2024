from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException

from app.schemas.ticket_schema import TicketUpsert
from app.security.context import get_current_user
from app.security.jwt_guard import jwt_guard
from app.db.dependencies import get_db
from app.services.ticket_service import (
    upsert_ticket,
    list_tickets,
    delete_ticket,
)

router = APIRouter(
    dependencies=[Depends(jwt_guard)]
)


@router.post("/save")
def save(
    payload: TicketUpsert,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    result = upsert_ticket(
        conn=conn,
        user_id=current_user["user_id"],
        payload=payload,
    )
    if not result:
        raise HTTPException(status_code=400, detail="Ticket not saved")

    return result


@router.get("/list/{event_id}")
def list_(
    event_id: UUID,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return list_tickets(
        conn=conn,
        user_id=current_user["user_id"],
        event_id=event_id,
    )


@router.delete("/delete/{ticket_id}")
def delete_(
    ticket_id: UUID,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    result = delete_ticket(
        conn=conn,
        user_id=current_user["user_id"],
        ticket_id=ticket_id,
    )
    if not result:
        raise HTTPException(status_code=404, detail="Ticket not found")

    return result

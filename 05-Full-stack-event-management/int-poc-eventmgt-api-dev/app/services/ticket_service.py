import json
from uuid import UUID
from app.db.procedures import call_procedure, call_procedure_read
from app.schemas.ticket_schema import TicketUpsert


def upsert_ticket(
    conn,
    user_id: int,
    payload: TicketUpsert,
):
    if user_id is None:
        raise ValueError("user_id is required")

    params = payload.model_dump()

    benefits = params.pop("benefits", None)
    if benefits is not None:
        params["benefits"] = json.dumps(benefits)

    rows = call_procedure(
        conn,
        "emd.sp_ticket_upsert",
        {
            "user_id": user_id,
            **params,
        },
    )

    return rows[0] if rows else None


def list_tickets(
    conn,
    user_id: int,
    event_id: UUID,
):
    result_sets = call_procedure_read(
        conn,
        "emd.sp_ticket_list_get",
        {
            "user_id": user_id,
            "event_id": event_id,
        },
        multi=True,
    )

    if not result_sets:
        return []

    tickets = result_sets[0] or []
    benefits = result_sets[1] or []

    benefit_map: dict[str, list[str]] = {}
    for row in benefits:
        benefit_map.setdefault(str(row["ticket_id"]), []).append(row["benefit"])

    for ticket in tickets:
        ticket["benefits"] = benefit_map.get(str(ticket["ticket_id"]), [])

    return tickets


def delete_ticket(
    conn,
    user_id: int,
    ticket_id: UUID,
):
    rows = call_procedure(
        conn,
        "emd.sp_ticket_delete",
        {
            "user_id": user_id,
            "ticket_id": ticket_id,
        },
    )
    return rows[0] if rows else None

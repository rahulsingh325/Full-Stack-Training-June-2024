from fastapi import HTTPException
from uuid import UUID
from app.db.procedures import call_procedure, call_procedure_read
from app.schemas.event import (
    EventCreateDraft,
    EventUpdateDraft,
    EventUpdateActive,
    EventListQuery,
)
from app.schemas.event_agenda import EventAgendaCreate, EventAgendaUpdate


# ===========================
# EVENT – WRITE
# ===========================

def create_event_draft(
    conn,
    user_id: int,
    payload: EventCreateDraft,
):
    rows = call_procedure_read(
        conn,
        "emd.sp_event_create_draft",
        {
            "user_id": user_id,
            **payload.model_dump(),
        },
    )

    if not rows:
        return None

    row = rows[0]

    if not row.get("event_id"):
        raise HTTPException(
            status_code=400,
            detail=row.get("message", "Invalid request"),
        )
    
    return {
        "event_id": str(row["event_id"]),
        "status": row.get("status", "created"),
    }


def update_event_draft(
    conn,
    user_id: int,
    event_id: UUID,
    payload: EventUpdateDraft,
):
    rows = call_procedure_read(
        conn,
        "emd.sp_event_update_draft",
        {
            "user_id": user_id,
            "event_id": event_id,
            **payload.model_dump(exclude_none=True),
        },
    )

    if not rows:
        return None

    row = rows[0]

    return {
        "event_id": str(row["event_id"]),
        "status": row.get("status", "updated"),
    }


def activate_event(
    conn,
    user_id: int,
    event_id: UUID,
):
    rows = call_procedure_read(
        conn,
        "emd.sp_event_activate",
        {
            "user_id": user_id,
            "event_id": event_id,
        },
    )

    if not rows:
        return None

    row = rows[0]
    return {
        "event_id": str(row["event_id"]),
        "status": row.get("status", "active"),
    }


def update_active_event(
    conn,
    user_id: int,
    event_id: UUID,
    payload: EventUpdateActive,
):
    rows = call_procedure(
        conn,
        "emd.sp_event_update_active",
        {
            "user_id": user_id,
            "event_id": event_id,
            **payload.model_dump(exclude_none=True),
        },
    )

    if not rows:
        return None

    row = rows[0]
    return {
        "event_id": str(row["event_id"]),
        "status": row.get("status", "updated"),
    }


def delete_event(
    conn,
    user_id: int,
    event_id: UUID,
):
    rows = call_procedure(
        conn,
        "emd.sp_event_delete",
        {
            "user_id": user_id,
            "event_id": event_id,
        },
    )

    if not rows:
        return None

    row = rows[0]
    return {
        "event_id": str(row["event_id"]),
        "status": row.get("status", "deleted"),
    }


# ===========================
# AGENDA – WRITE
# ===========================

def create_event_agenda_service(
    conn,
    user_id: int,
    event_id: UUID,
    payload: EventAgendaCreate,
):
    rows = call_procedure(
        conn,
        "emd.sp_event_agenda_create",
        {
            "user_id": user_id,
            "event_id": event_id,
            **payload.model_dump(exclude_none=True),
        },
    )

    if not rows:
        return None

    row = rows[0]
    return {
        "agenda_id": str(row["agenda_id"]),
        "status": row.get("status", "created"),
    }


def update_event_agenda(
    conn,
    user_id: int,
    event_id: UUID,
    agenda_id: UUID,
    payload: EventAgendaUpdate,
):
    rows = call_procedure(
        conn,
        "emd.sp_event_agenda_update",
        {
            "user_id": user_id,
            "event_id": event_id,
            "agenda_id": agenda_id,
            **payload.model_dump(exclude_none=True),
        },
    )

    if not rows:
        return None

    row = rows[0]
    return {
        "agenda_id": str(row["agenda_id"]),
        "status": row.get("status", "updated"),
    }


def delete_event_agenda(
    conn,
    user_id: int,
    event_id: UUID,
    agenda_id: UUID,
):
    rows = call_procedure(
        conn,
        "emd.sp_event_agenda_delete",
        {
            "user_id": user_id,
            "event_id": event_id,
            "agenda_id": agenda_id,
        },
    )

    if not rows:
        return None

    row = rows[0]
    return {
        "agenda_id": str(row["agenda_id"]),
        "status": row.get("status", "deleted"),
    }


# ===========================
# EVENT – READ
# ===========================

def list_events(
    conn,
    user_id: int,
    query: EventListQuery,
):
    rs = call_procedure_read(
        conn,
        "emd.sp_event_list_get",
        {
            "user_id": user_id,
            "limit": query.limit,
            "offset": query.offset,
            "status": query.status,
            "search": query.search,
            "category": query.category,
            "date_filter": query.date_filter,
            "from_date": query.from_date,
            "to_date": query.to_date,
        },
        multi=True,
    )

    rows = rs[0] if rs and rs[0] else []
    counts = rs[1][0] if len(rs) > 1 and rs[1] else {}

    return {
        "items": rows,
        "total": counts.get("total", 0),
        "status_counts": {
            "active": counts.get("active_count", 0),
            "draft": counts.get("draft_count", 0),
            "past": counts.get("past_count", 0),
        },
    }


def get_event_detail(
    conn,
    user_id: int,
    event_id: UUID,
):
    rs = call_procedure_read(
        conn,
        "emd.sp_event_detail_get",
        {
            "user_id": user_id,
            "event_id": event_id,
        },
        multi=True,
    )

    if not rs or not rs[0]:
        return None

    return {
        "event": rs[0][0],
        "calendar": rs[1][0] if len(rs) > 1 and rs[1] else None,
        "timings": rs[2][0] if len(rs) > 2 and rs[2] else None,
        "venue": rs[3][0] if len(rs) > 3 and rs[3] else None,
        "getting_there": rs[4][0] if len(rs) > 4 and rs[4] else None,
        "seat_zones": rs[5] if len(rs) > 5 else [],
        "tickets": rs[6] if len(rs) > 6 else [],
        "ticket_benefits": rs[7] if len(rs) > 7 else [],
        "terms": rs[8][0] if len(rs) > 8 and rs[8] else None,
        "notes": rs[9] if len(rs) > 9 else [],
        "partners": rs[10] if len(rs) > 10 else [],
        "merchandise": rs[11] if len(rs) > 11 else [],
        "artists": rs[12] if len(rs) > 12 else [],
        "prohibited_items": rs[13] if len(rs) > 13 else [],
    }


# ===========================
# AGENDA – READ
# ===========================

def get_agenda_by_id(
    conn,
    user_id: int,
    agenda_id: UUID,
):
    rows = call_procedure_read(
        conn,
        "emd.sp_event_agenda_get",
        {
            "user_id": user_id,
            "agenda_id": agenda_id,
        },
    )
    return rows[0] if rows else None


def list_agendas_by_date(
    conn,
    user_id: int,
    from_date,
    to_date,
):
    rows = call_procedure_read(
        conn,
        "emd.sp_calendar_list_get",
        {
            "user_id": user_id,
            "from_date": from_date,
            "to_date": to_date,
        },
    )
    return rows or []

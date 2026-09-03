from uuid import UUID
from app.db.procedures import call_procedure, call_procedure_read
from app.schemas.venue_schema import VenueUpsert


def upsert_venue(
    conn,
    user_id: int,
    payload: VenueUpsert,
):
    rows = call_procedure(
        conn,
        "emd.sp_venue_upsert",
        {
            "user_id": user_id,
            **payload.model_dump(),
        },
    )

    if not rows:
        return None

    row = rows[0]

    return {
        "venue_id": str(row["venue_id"]),
        "status": row["status"],
    }


def get_venue(
    conn,
    user_id: int,
    event_id: UUID,
):
    result_sets = call_procedure_read(
        conn,
        "emd.sp_venue_get",
        {
            "user_id": user_id,
            "event_id": event_id,
        },
        multi=True,
    )

    if not result_sets:
        return {
            "venue": None,
            "getting_there": None,
        }

    venue_rows = result_sets[0] or []
    getting_there_rows = result_sets[1] if len(result_sets) > 1 else []

    return {
        "venue": venue_rows[0] if venue_rows else None,
        "getting_there": getting_there_rows[0] if getting_there_rows else None,
    }


def delete_venue(
    conn,
    user_id: int,
    event_id: UUID,
):
    rows = call_procedure(
        conn,
        "emd.sp_venue_delete",
        {
            "user_id": user_id,
            "event_id": event_id,
        },
    )
    return rows[0] if rows else None

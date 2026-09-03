from uuid import UUID
from app.db.procedures import call_procedure, call_procedure_read


def add_artist(
    conn,
    user_id: int,
    payload: dict,
):
    rows = call_procedure(
        conn,
        "emd.sp_event_artist_add",
        {
            "user_id": user_id,
            **payload,
        },
    )

    if not rows:
        return None

    row = rows[0]

    return {
        "artist_id": str(row["artist_id"]),
        "status": row["status"],
    }



def list_artists(
    conn,
    user_id: int,
    event_id: UUID,
):
    rows = call_procedure_read(
        conn,
        "emd.sp_event_artists_get",
        {
            "user_id": user_id,
            "event_id": event_id,
        },
    )
    return rows or []


def update_artist(
    conn,
    user_id: int,
    payload: dict,
):
    rows = call_procedure(
        conn,
        "emd.sp_event_artist_update",
        {
            "user_id": user_id,
            **payload,
        },
    )
    return rows[0] if rows else None


def delete_artist(
    conn,
    user_id: int,
    artist_id: UUID,
):
    rows = call_procedure(
        conn,
        "emd.sp_event_artist_delete",
        {
            "user_id": user_id,
            "artist_id": artist_id,
        },
    )
    return rows[0] if rows else None

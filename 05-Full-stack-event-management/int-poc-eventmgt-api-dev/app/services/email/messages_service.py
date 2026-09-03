from app.db.procedures import call_procedure, call_procedure_read
from uuid import UUID
from fastapi import HTTPException


def create_draft(conn, user_id: int, subject: str, body: str):
    rows = call_procedure(
        conn,
        "emd.sp_email_draft_create",
        {
            "user_id": user_id,
            "subject": subject,
            "body": body,
        },
    )
    return rows[0]["email_id"]


def send_email(conn, user_id: int, email_id: UUID, receiver_user_id: int):
    call_procedure(
        conn,
        "emd.sp_email_send",
        {
            "user_id": user_id,
            "email_id": email_id,
            "receiver_user_id": receiver_user_id,
        },
    )


def list_mailbox(conn, user_id: int, folder: str, page: int, page_size: int):
    offset = (page - 1) * page_size

    rows = call_procedure_read(
        conn,
        "emd.sp_email_list_mailbox",
        {
            "user_id": user_id,
            "folder": folder,
            "limit": page_size,
            "offset": offset,
        },
    )

    return {
        "items": rows,
        "page": page,
        "page_size": page_size,
    }


def update_email_state(
    conn,
    user_id: int,
    email_id: UUID,
    is_read,
    is_starred,
    target_folder,
):
    call_procedure(
        conn,
        "emd.sp_email_update_state",
        {
            "user_id": user_id,
            "email_id": email_id,
            "is_read": is_read,
            "is_starred": is_starred,
            "target_folder": target_folder,
        },
    )


def get_email_detail(conn, user_id: int, email_id: UUID):
    rows = call_procedure_read(
        conn,
        "emd.sp_email_get_detail",
        {
            "user_id": user_id,
            "email_id": email_id,
        },
    )

    if not rows:
        raise HTTPException(status_code=404, detail="Email not found")

    return rows[0]

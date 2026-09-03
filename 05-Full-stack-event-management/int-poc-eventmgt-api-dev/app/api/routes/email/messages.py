from fastapi import APIRouter, Depends, HTTPException
from app.security.context import get_current_user
from app.db.dependencies import get_db

from app.schemas.email.messages import (
    EmailDraftCreateRequest,
    EmailSendRequest,
    EmailUpdateStateRequest,
)
from app.services.email.messages_service import (
    create_draft,
    send_email,
    list_mailbox,
    update_email_state,
    get_email_detail,
)

router = APIRouter()


@router.post("/draft")
def create_email_draft(
    payload: EmailDraftCreateRequest,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    email_id = create_draft(
        conn,
        current_user["user_id"],
        payload.subject,
        payload.body,
    )
    return {"email_id": email_id}



@router.post("/send")
def send_email_api(
    payload: EmailSendRequest,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    send_email(
        conn,
        current_user["user_id"],
        payload.email_id,
        payload.receiver_user_id,
    )
    return {"status": "sent"}


@router.get("/list")
def list_emails(
    folder: str | None = None,
    page: int = 1,
    page_size: int = 20,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return list_mailbox(
        conn,
        current_user["user_id"],
        folder,
        page,
        page_size,
    )



@router.patch("/update/{email_id}")
def update_email(
    email_id: str,
    payload: EmailUpdateStateRequest,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    update_email_state(
        conn,
        current_user["user_id"],
        email_id,
        payload.is_read,
        payload.is_starred,
        payload.target_folder,
    )
    return {"status": "updated"}


# 🔹 RECEIVER DETAILS (Inbox / Spam / Trash)
@router.get("/receiver/details/{email_id}")
def get_received_email_details(
    email_id: str,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_email_detail(
        conn,
        current_user["user_id"],
        email_id,
    )


# 🔹 SENDER DETAILS (Sent)
@router.get("/sender/details/{email_id}")
def get_sent_email_details(
    email_id: str,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_email_detail(
        conn,
        current_user["user_id"],
        email_id,
    )

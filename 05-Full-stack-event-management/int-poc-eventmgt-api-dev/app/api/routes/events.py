import json
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Form, UploadFile, File

from app.schemas.event import (
    EventCreateDraft,
    EventUpdateDraft,
    EventUpdateActive,
    EventListQuery,
)
from app.schemas.event_agenda import EventAgendaCreate, EventAgendaUpdate
from app.security.context import get_current_user
from app.security.jwt_guard import jwt_guard
from app.db.dependencies import get_db
from app.services.event_service import (
    create_event_draft,
    update_event_draft,
    activate_event,
    update_active_event,
    delete_event,
    list_events,
    get_event_detail,
    create_event_agenda_service,
    update_event_agenda,
    delete_event_agenda,
)
from app.utils.upload_image import upload_image

router = APIRouter()

@router.post("/draft")
def create_draft(
    data: str = Form(...),
    banner_image: UploadFile = File(...),
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    payload_dict = json.loads(data)

    payload_dict["banner_image_url"] = upload_image(
        banner_image,
        "events/banners",
    )

    payload = EventCreateDraft(**payload_dict)

    result = create_event_draft(
        conn=conn,
        user_id=current_user["user_id"],
        payload=payload,
    )

    if not result:
        raise HTTPException(status_code=400, detail="Event draft not created")

    return result

@router.put("/draft/{event_id}")
def update_draft(
    event_id: UUID,
    data: str = Form(...),
    banner_image: UploadFile | None = File(None),
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    payload_dict = json.loads(data)

    if banner_image:
        payload_dict["banner_image_url"] = upload_image(
            banner_image,
            "events/banners",
        )

    payload = EventUpdateDraft(**payload_dict)

    result = update_event_draft(
        conn=conn,
        user_id=current_user["user_id"],
        event_id=event_id,
        payload=payload,
    )

    if not result:
        raise HTTPException(status_code=404, detail="Draft not found")

    return result



@router.post("/{event_id}/agendas")
def create_agenda(
    event_id: UUID,
    payload: EventAgendaCreate,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    result = create_event_agenda_service(
        conn=conn,
        user_id=current_user["user_id"],
        event_id=event_id,
        payload=payload,
    )
    if not result:
        raise HTTPException(status_code=400, detail="Agenda not created")
    return result


@router.patch("/{event_id}/agendas/{agenda_id}")
def update_agenda(
    event_id: UUID,
    agenda_id: UUID,
    payload: EventAgendaUpdate,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    result = update_event_agenda(
        conn=conn,
        user_id=current_user["user_id"],
        event_id=event_id,
        agenda_id=agenda_id,
        payload=payload,
    )
    if not result:
        raise HTTPException(status_code=404, detail="Agenda not found")
    return result


@router.delete("/{event_id}/agendas/{agenda_id}")
def delete_agenda(
    event_id: UUID,
    agenda_id: UUID,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    result = delete_event_agenda(
        conn=conn,
        user_id=current_user["user_id"],
        event_id=event_id,
        agenda_id=agenda_id,
    )
    if not result:
        raise HTTPException(status_code=404, detail="Agenda not found")
    return result


@router.post("/{event_id}/activate")
def activate(
    event_id: UUID,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return activate_event(
        conn=conn,
        user_id=current_user["user_id"],
        event_id=event_id,
    )


@router.put("/{event_id}/active")
def update_active(
    event_id: UUID,
    payload: EventUpdateActive,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return update_active_event(
        conn=conn,
        user_id=current_user["user_id"],
        event_id=event_id,
        payload=payload,
    )


@router.delete("/{event_id}")
def delete(
    event_id: UUID,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return delete_event(
        conn=conn,
        user_id=current_user["user_id"],
        event_id=event_id,
    )


@router.get("/all_events_list")
def list_events_api(
    query: EventListQuery = Depends(),
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return list_events(
        conn=conn,
        user_id=current_user["user_id"],
        query=query,
    )


@router.get("/events_detail/{event_id}")
def get_detail(
    event_id: UUID,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    result = get_event_detail(
        conn=conn,
        user_id=current_user["user_id"],
        event_id=event_id,
    )
    if not result:
        raise HTTPException(status_code=404, detail="Event not found")
    return result

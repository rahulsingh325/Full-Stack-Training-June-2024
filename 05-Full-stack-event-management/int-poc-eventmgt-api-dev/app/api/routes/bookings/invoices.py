from datetime import date
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query

from app.schemas.bookings.invoice_schema import (
    InvoiceEditRequest,
    InvoiceActionResponse,
)
from app.security.context import get_current_user
from app.security.jwt_guard import jwt_guard
from app.db.dependencies import get_db
from app.services.bookings.invoice_service import (
    edit_invoice,
    get_invoice_pdf_data,
    search_invoices,
    send_invoice,
    hold_invoice,
    list_invoices,
    get_invoice_detail,
    get_invoice_by_number,
)

router = APIRouter()


@router.get("/list")
def invoice_list(
    status: str | None = Query(None),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return list_invoices(
        conn=conn,
        user_id=current_user["user_id"],
        status=status,
        page=page,
        page_size=page_size,
    )


@router.get("/details/{invoice_id}")
def invoice_detail(
    invoice_id: UUID,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    data = get_invoice_detail(
        conn=conn,
        user_id=current_user["user_id"],
        invoice_id=invoice_id,
    )
    if not data:
        raise HTTPException(status_code=404, detail="Invoice not found")
    return data


@router.put("/edit/{invoice_id}", response_model=InvoiceActionResponse)
def update_invoice(
    invoice_id: UUID,
    payload: InvoiceEditRequest,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return edit_invoice(
        conn=conn,
        user_id=current_user["user_id"],
        invoice_id=invoice_id,
        payload=payload,
    )


@router.post("/{invoice_id}/send", response_model=InvoiceActionResponse)
def send(
    invoice_id: UUID,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return send_invoice(
        conn=conn,
        user_id=current_user["user_id"],
        invoice_id=invoice_id,
    )


@router.post("/{invoice_id}/hold", response_model=InvoiceActionResponse)
def hold(
    invoice_id: UUID,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return hold_invoice(
        conn=conn,
        user_id=current_user["user_id"],
        invoice_id=invoice_id,
    )


@router.get("/by-number")
def invoice_by_number(
    invoice_no: str = Query(...),
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    result = get_invoice_by_number(
        conn=conn,
        user_id=current_user["user_id"],
        invoice_no=invoice_no,
    )
    if not result:
        raise HTTPException(status_code=404, detail="Invoice not found")
    return result


@router.get("/{invoice_id}/pdf")
def invoice_pdf(
    invoice_id: UUID,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    data = get_invoice_pdf_data(
        conn=conn,
        user_id=current_user["user_id"],
        invoice_id=invoice_id,
    )
    if not data:
        raise HTTPException(status_code=404, detail="Invoice not found")
    return data


@router.get("/search")
def invoice_search(
    status: str | None = Query(None),
    from_date: date | None = Query(None),
    to_date: date | None = Query(None),
    search: str | None = Query(None),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    return search_invoices(
        conn=conn,
        user_id=current_user["user_id"],
        status=status,
        from_date=from_date,
        to_date=to_date,
        search=search,
        page=page,
        page_size=page_size,
    )

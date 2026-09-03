from uuid import UUID
from app.db.procedures import call_procedure_read
from app.schemas.bookings.invoice_schema import InvoiceEditRequest


def edit_invoice(
    conn,
    user_id: int,
    invoice_id: UUID,
    payload: InvoiceEditRequest,
):
    rows = call_procedure_read(
        conn,
        "emd.sp_invoice_edit",
        {
            "user_id": user_id,
            "invoice_id": invoice_id,
            "bill_to_name": payload.bill_to_name,
            "bill_to_email": payload.bill_to_email,
            "bill_to_address": payload.bill_to_address,
            "notes": payload.notes,
            "due_date": payload.due_date,
        },
    )
    return rows[0] if rows else None


def send_invoice(conn, user_id: int, invoice_id: UUID):
    rows = call_procedure_read(
        conn,
        "emd.sp_invoice_send",
        {
            "user_id": user_id,
            "invoice_id": invoice_id,
        },
    )
    return rows[0] if rows else None


def hold_invoice(conn, user_id: int, invoice_id: UUID):
    rows = call_procedure_read(
        conn,
        "emd.sp_invoice_hold",
        {
            "user_id": user_id,
            "invoice_id": invoice_id,
        },
    )
    return rows[0] if rows else None


def list_invoices(
    conn,
    user_id: int,
    status: str | None,
    page: int,
    page_size: int,
):
    result_sets = call_procedure_read(
        conn,
        "emd.sp_invoice_list_get",
        {
            "user_id": user_id,
            "status": status,
            "limit": page_size,
            "offset": (page - 1) * page_size,
        },
        multi=True,
    )

    total_rs = result_sets[0] if result_sets and result_sets[0] else []
    data_rs = result_sets[1] if len(result_sets) > 1 else []

    return {
        "items": data_rs,
        "page": page,
        "page_size": page_size,
        "total": total_rs[0]["total"] if total_rs else 0,
    }


def get_invoice_detail(conn, user_id: int, invoice_id: UUID):
    result_sets = call_procedure_read(
        conn,
        "emd.sp_invoice_detail_get",
        {
            "user_id": user_id,
            "invoice_id": invoice_id,
        },
        multi=True,
    )

    if not result_sets or not result_sets[0]:
        return None

    return {
        "invoice": result_sets[0][0],
        "items": result_sets[1] if len(result_sets) > 1 else [],
    }


def get_invoice_by_number(conn, user_id: int, invoice_no: str):
    rows = call_procedure_read(
        conn,
        "emd.sp_invoice_get_by_number",
        {
            "user_id": user_id,
            "invoice_no": invoice_no,
        },
    )
    return rows[0] if rows else None


def get_invoice_pdf_data(conn, user_id: int, invoice_id: UUID):
    # single source of truth
    return get_invoice_detail(conn, user_id, invoice_id)


def search_invoices(
    conn,
    user_id: int,
    status: str | None,
    from_date,
    to_date,
    search: str | None,
    page: int,
    page_size: int,
):
    result_sets = call_procedure_read(
        conn,
        "emd.sp_invoice_search",
        {
            "user_id": user_id,
            "status": status,
            "from_date": from_date,
            "to_date": to_date,
            "search": search,
            "limit": page_size,
            "offset": (page - 1) * page_size,
        },
        multi=True,
    )

    total_rs = result_sets[0] if result_sets and result_sets[0] else []
    data_rs = result_sets[1] if len(result_sets) > 1 else []

    return {
        "items": data_rs,
        "page": page,
        "page_size": page_size,
        "total": total_rs[0]["total"] if total_rs else 0,
    }

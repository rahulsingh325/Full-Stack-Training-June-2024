from datetime import date
from uuid import UUID
import json

from app.db.procedures import call_procedure, call_procedure_read
from app.schemas.bookings.booking_schema import BookingCreate


def create_booking(conn, user_id: int, payload: BookingCreate):
    params = {
        "user_id": user_id,
        "event_id": payload.event_id,
        "customer_name": payload.customer_name,
        "customer_email": payload.customer_email,
        "customer_phone": payload.customer_phone,
        "customer_address": payload.customer_address,
        "items": json.dumps(
            [
                {"ticket_id": str(i.ticket_id), "quantity": i.quantity}
                for i in payload.items
            ]
        ),
    }

    rows = call_procedure_read(conn, "emd.sp_booking_create", params)
    if not rows:
        return None

    row = rows[0]

    return {
        "booking_id": str(row["booking_id"]),
        "booking_ref": row["booking_ref"],
        "total_amount": float(row["total_amount"]),
        "status": row["status"],
        "invoice_id": str(row["invoice_id"]),
        "invoice_no": row["invoice_no"],
    }


def confirm_booking(conn, user_id: int, booking_id: UUID):
    rows = call_procedure_read(
        conn,
        "emd.sp_booking_confirm",
        {
            "user_id": user_id,
            "booking_id": booking_id,
        },
    )
    if not rows:
        return None

    row = rows[0]

    return {
        "booking_id": str(row["booking_id"]),
        "status": row["status"],
        "voucher_code": row["voucher_code"],
    }


def cancel_booking(conn, user_id: int, booking_id: UUID):
    rows = call_procedure_read(
        conn,
        "emd.sp_booking_cancel",
        {
            "user_id": user_id,
            "booking_id": booking_id,
        },
    )

    if not rows:
        return None

    row = rows[0]

    return {
        "booking_id": str(row["booking_id"]),
        "status": row["status"],
    }


def list_bookings(
    conn,
    user_id: int,
    status: str | None,
    from_date: str | None,
    to_date: str | None,
    search: str | None,
    page: int,
    page_size: int,
):
    params = {
        "user_id": user_id,
        "status": status,
        "from_date": from_date,
        "to_date": to_date,
        "search": search,
        "page": page,
        "page_size": page_size,
    }

    result_sets = call_procedure_read(
        conn,
        "emd.sp_booking_list",
        params,
        multi=True,
    )

    rows = result_sets[0] if result_sets and result_sets[0] else []
    total_count = (
        result_sets[1][0]["total_count"]
        if len(result_sets) > 1 and result_sets[1]
        else 0
    )

    return {
        "items": [
            {
                "booking_id": str(r["booking_id"]),
                "booking_ref": r["booking_ref"],
                "booking_date": r["booking_date"],
                "customer_name": r["customer_name"],
                "customer_email": r["customer_email"],

                "event_name": r["event_name"],
                "event_category": r["event_category"], 

                "ticket_category": r["ticket_category"],
                "price": float(r["price"]),
                "qty": int(r["qty"]),
                "amount": float(r["amount"]),
                "currency": r["currency"],
                "status": r["status"],

                "invoice_id": str(r["invoice_id"]) if r["invoice_id"] else None,
                "invoice_no": r["invoice_no"],
                "voucher_code": r["voucher_code"],
                "has_voucher": bool(r["has_voucher"]),
            }
            for r in rows
        ],
        "page": page,
        "page_size": page_size,
        "total_count": total_count,
    }



def get_booking_detail(conn, user_id: int, booking_id: UUID):
    result_sets = call_procedure_read(
        conn,
        "emd.sp_booking_detail_get",
        {
            "user_id": user_id,
            "booking_id": booking_id,
        },
        multi=True,
    )

    if not result_sets or not result_sets[0]:
        return None

    booking = result_sets[0][0]
    items = result_sets[1] if len(result_sets) > 1 else []
    voucher = result_sets[2][0] if len(result_sets) > 2 and result_sets[2] else None
    invoice = result_sets[3][0] if len(result_sets) > 3 and result_sets[3] else None

    return {
        "booking": booking,
        "items": items,
        "voucher": voucher,
        "invoice": invoice,   # ✅ SINGLE SOURCE
    }



def get_booking_kpis(conn, user_id: int, from_date: date | None, to_date: date | None):
    rows = call_procedure_read(
        conn,
        "emd.sp_dashboard_booking_kpis",
        {
            "user_id": user_id,
            "from_date": from_date,
            "to_date": to_date,
        },
    )
    return rows[0] if rows else None


def get_booking_trend(conn, user_id: int, from_date: date, to_date: date):
    return call_procedure_read(
        conn,
        "emd.sp_dashboard_booking_trend",
        {
            "user_id": user_id,
            "from_date": from_date,
            "to_date": to_date,
        },
    )


def get_booking_category_summary(
    conn, user_id: int, from_date: date | None, to_date: date | None
):
    return call_procedure_read(
        conn,
        "emd.sp_dashboard_booking_category_summary",
        {
            "user_id": user_id,
            "from_date": from_date,
            "to_date": to_date,
        },
    )


def get_booking_category_detail(
    conn,
    user_id: int,
    category_id: str,
    from_date: date | None,
    to_date: date | None,
):
    return call_procedure_read(
        conn,
        "emd.sp_dashboard_booking_category_detail",
        {
            "user_id": user_id,
            "category_id": UUID(category_id),
            "from_date": from_date,
            "to_date": to_date,
        },
    )


def get_recent_bookings(
    conn,
    user_id: int,
    search: str | None,
    start_date: date | None,
    end_date: date | None,
    limit: int,
    offset: int,
):
    return call_procedure_read(
        conn,
        "emd.sp_dashboard_recent_bookings",
        {
            "user_id": user_id,
            "search": search,
            "start_date": start_date,
            "end_date": end_date,
            "limit": limit,
            "offset": offset,
        },
    )

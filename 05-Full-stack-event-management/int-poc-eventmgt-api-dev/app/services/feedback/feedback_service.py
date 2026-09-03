import json
from app.db.procedures import call_procedure_read, call_procedure
from app.schemas.feedback.feedback_schema import FeedbackCreate


# ---------- CREATE FEEDBACK ----------

def add_feedback(
    conn,
    user_id: int,
    payload: FeedbackCreate,
):
    try:
        rows = call_procedure_read(
            conn,
            "emd.sp_feedback_add",
            {
                "user_id": user_id,
                "booking_id": payload.booking_id,
                "comment": payload.comment,
                "is_anonymous": payload.is_anonymous,
                "ratings": json.dumps(
                    [{"code": r.code, "value": r.value} for r in payload.ratings]
                ),
            },
        )
    except Exception as exc:
        msg = str(exc)

        if "98001" in msg:
            raise ValueError("feedback_not_allowed")
        if "98002" in msg:
            raise ValueError("feedback_already_submitted")
        if "98003" in msg:
            raise ValueError("invalid_rating")

        raise

    if not rows:
        return None

    row = rows[0]

    return {
        "feedback_id": str(row["feedback_id"]),
        "overall_rating": float(row["overall_rating"]),
    }


# ---------- LIST FEEDBACK ----------

def list_feedbacks(
    conn,
    user_id: int,
    event_id=None,
    min_rating=None,
    max_rating=None,
    page: int = 1,
    page_size: int = 6,
):
    result_sets = call_procedure_read(
        conn,
        "emd.sp_feedback_list",
        {
            "user_id": user_id,
            "event_id": event_id,
            "min_rating": min_rating,
            "max_rating": max_rating,
            "page": page,
            "page_size": page_size,
        },
        multi=True,
    )

    rows = result_sets[0] if result_sets and result_sets[0] else []
    total_rs = result_sets[1] if len(result_sets) > 1 and result_sets[1] else []

    return {
        "items": rows,
        "page": page,
        "page_size": page_size,
        "total_count": total_rs[0]["total_count"] if total_rs else 0,
    }


# ---------- SUMMARY ----------

def feedback_summary(conn, user_id: int):
    result_sets = call_procedure_read(
        conn,
        "emd.sp_feedback_summary",
        {"user_id": user_id},
        multi=True,
    )

    overall = (
        result_sets[0][0]
        if result_sets and result_sets[0]
        else {"overall_rating": 0, "total_reviews": 0}
    )

    dimensions = result_sets[1] if len(result_sets) > 1 else []

    return {
        "overall": overall,
        "dimensions": dimensions,
    }


# ---------- DISTRIBUTION ----------

def feedback_rating_distribution(conn, user_id: int):
    rows = call_procedure_read(
        conn,
        "emd.sp_feedback_rating_distribution",
        {"user_id": user_id},
    )
    return rows or []


# ---------- RATING TYPES ----------

def list_feedback_rating_types(conn, user_id: int):
    return call_procedure_read(
        conn,
        "emd.sp_feedback_rating_type_list",
        {"user_id": user_id},
    ) or []


def create_feedback_rating_type(
    conn,
    user_id: int,
    code: str,
    display_name: str,
    sort_order: int,
):
    try:
        rows = call_procedure_read(
            conn,
            "emd.sp_feedback_rating_type_create",
            {
                "user_id": user_id,
                "code": code,
                "display_name": display_name,
                "sort_order": sort_order,
            },
        )
    except Exception:
        raise

    if not rows:
        return None

    row = rows[0]

    if row.get("status") == "error":
        error_code = row.get("error_code")

        if error_code == 98101:
            raise ValueError("invalid_rating_type")
        if error_code == 98102:
            raise ValueError("rating_type_exists")

        raise RuntimeError(row.get("message", "rating_type_error"))

    return {
        "code": row.get("code", code),
        "status": "created",
    }

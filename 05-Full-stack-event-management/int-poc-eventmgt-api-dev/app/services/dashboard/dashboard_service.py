from app.db.procedures import call_procedure_read


def get_full_dashboard(
    conn,
    user_id: int,
    months: int,
    recent_limit: int,
    upcoming_limit: int,
    activity_limit: int,
    month: int,
    year: int,
):
    result_sets = call_procedure_read(
        conn,
        "emd.sp_dashboard_full",
        {
            "user_id": user_id,
            "months": months,
            "recent_limit": recent_limit,
            "upcoming_limit": upcoming_limit,
            "activity_limit": activity_limit,
            "calendar_month": month,
            "calendar_year": year,
        },
        multi=True,
    )

    if not result_sets or not result_sets[0]:
        return {}

    kpis_row = result_sets[0][0]

    return {
        "kpis": {
            "total_bookings": kpis_row["total_bookings"],
            "confirmed_bookings": kpis_row["confirmed_bookings"],
            "pending_bookings": kpis_row["pending_bookings"],
            "cancelled_or_expired": kpis_row["cancelled_or_expired"],
            "total_revenue": kpis_row["total_revenue"],
        },
        "ticket_sales": result_sets[4][0],   # ← ZONE-BASED
        "upcoming_event_count": result_sets[2][0]["upcoming_events"],
        "revenue_trend": result_sets[3],
        "popular_categories": calculate_category_percentages(result_sets[5]),
        "featured_event": result_sets[6][0] if result_sets[6] else None,
        "upcoming_events": result_sets[7],
        "recent_bookings": result_sets[8],
        "calendar_events": result_sets[9] if len(result_sets) > 9 else [],
        "activity": result_sets[10],
    }



def calculate_category_percentages(rows):
    if not rows:
        return []

    total_events = sum(r["total_events"] for r in rows)

    if total_events == 0:
        for r in rows:
            r["percentage"] = 0
        return rows

    for r in rows:
        r["percentage"] = round(
            (r["total_events"] / total_events) * 100
        )

    return rows

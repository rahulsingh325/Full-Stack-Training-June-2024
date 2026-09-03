from app.db.procedures import call_procedure_read


def get_voucher_detail(
    conn,
    user_id: int,
    voucher_code: str,
):
    result_sets = call_procedure_read(
        conn,
        "emd.sp_voucher_detail_get",
        {
            "user_id": user_id,
            "voucher_code": voucher_code,
        },
        multi=True,
    )

    if not result_sets or not result_sets[0]:
        return None

    voucher = result_sets[0][0]

    tickets = result_sets[1] if len(result_sets) > 1 and result_sets[1] else []

    # event_terms
    terms = (
        result_sets[2][0].get("terms")
        if len(result_sets) > 2 and result_sets[2]
        else None
    )

    prohibited_items = (
        result_sets[3]
        if len(result_sets) > 3 and result_sets[3]
        else []
    )

    artists = (
        result_sets[4]
        if len(result_sets) > 4 and result_sets[4]
        else []
    )

    return {
        "voucher": voucher,
        "tickets": tickets,
        "schedule": None,          
        "terms": terms,
        "prohibited_items": prohibited_items,
        "artists": artists,
    }

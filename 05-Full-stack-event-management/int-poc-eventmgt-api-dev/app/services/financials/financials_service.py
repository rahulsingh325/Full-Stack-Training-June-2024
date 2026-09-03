from app.db.procedures import call_procedure, call_procedure_read


# ==============================
# EXPENSE CATEGORY
# ==============================

def create_expense_category(
    conn,
    user_id: int,
    payload,
):
    try:
        rows = call_procedure_read(
            conn,
            "emd.sp_expense_category_create",
            {
                "user_id": user_id,
                "name": payload.name,
            },
        )
    except Exception as exc:
        msg = str(exc)

        if "96101" in msg:
            raise ValueError("category_name_required")
        if "96102" in msg:
            raise ValueError("category_already_exists")

        raise

    if not rows:
        return None

    row = rows[0]

    return {
        "category_id": str(row["category_id"]),
        "status": row["status"],
    }


def list_expense_categories(
    conn,
    user_id: int,
):
    rows = call_procedure_read(
        conn,
        "emd.sp_expense_category_list",
        {
            "user_id": user_id,
        },
    )
    return rows or []


# ==============================
# FINANCIAL DASHBOARD
# ==============================

def get_financial_full(
    conn,
    user_id: int,
    from_date,
    to_date,
    months: int,
    transactions_limit: int,
    search: str | None,
    month_filter: str,
    page: int,
    page_size: int,
):
    offset = (page - 1) * page_size

    result_sets = call_procedure_read(
        conn,
        "emd.sp_financial_full",
        {
            "user_id": user_id,
            "from_date": from_date,
            "to_date": to_date,
            "months": months,
            "transactions_limit": transactions_limit,
            "search": search,
            "month_filter": month_filter,
            "page_size": page_size,
            "offset": offset,
        },
        multi=True,
    )

    if not result_sets:
        return None

    return {
        "kpis": result_sets[0][0] if result_sets[0] else {},
        "monthly_change": result_sets[1][0] if result_sets[1] else {},
        "cashflow": result_sets[2] or [],
        "sales_by_category": result_sets[3] or [],
        "expense_summary": result_sets[4] or [],
        "recent_transactions": result_sets[5] or [],
        "pagination": {
            "page": page,
            "page_size": page_size,
            "total": result_sets[6][0]["total"] if result_sets[6] else 0,
        },
    }



# ==============================
# EXPENSES
# ==============================

def create_expense(
    conn,
    user_id: int,
    payload,
):
    try:
        rows = call_procedure_read(
            conn,
            "emd.sp_expense_add",
            {
                "user_id": user_id,
                "category_id": payload.category_id,
                "description": payload.description,
                "amount": payload.amount,
                "currency": payload.currency,
                "expense_date": payload.expense_date,
            },
        )
    except Exception as exc:
        msg = str(exc)

        if "96001" in msg:
            raise ValueError("expense_amount_invalid")
        if "96002" in msg:
            raise ValueError("invalid_expense_category")

        raise

    if not rows:
        return None

    row = rows[0]

    return {
        "expense_id": str(row["expense_id"]),
        "status": row["status"],
    }


def list_expenses(
    conn,
    user_id: int,
    from_date=None,
    to_date=None,
):
    rows = call_procedure_read(
        conn,
        "emd.sp_expense_list",
        {
            "user_id": user_id,
            "from_date": from_date,
            "to_date": to_date,
        },
    )
    return rows or []

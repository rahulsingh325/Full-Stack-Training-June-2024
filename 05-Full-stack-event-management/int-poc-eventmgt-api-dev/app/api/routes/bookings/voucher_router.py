from fastapi import APIRouter, Depends, HTTPException

from app.security.context import get_current_user
from app.db.dependencies import get_db
from app.services.bookings.voucher_service import get_voucher_detail

router = APIRouter()


@router.get("/details/{voucher_code}")
def voucher_detail(
    voucher_code: str,
    conn=Depends(get_db),
    current_user=Depends(get_current_user),
):
    data = get_voucher_detail(
        conn=conn,
        user_id=current_user["user_id"],
        voucher_code=voucher_code,
    )

    if not data:
        raise HTTPException(status_code=404, detail="Voucher not found")

    return data

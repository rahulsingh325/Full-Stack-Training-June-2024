import os
from apscheduler.schedulers.background import BackgroundScheduler
from app.db.procedures import call_procedure
from app.db.session import get_system_db

scheduler: BackgroundScheduler | None = None


def start_scheduler() -> None:
    global scheduler

    # DEFAULT OFF — must be explicitly enabled
    if os.getenv("ENABLE_BOOKING_EXPIRY", "false").lower() != "true":
        print("[Scheduler] Booking expiry disabled")
        return

    if scheduler and scheduler.running:
        return

    scheduler = BackgroundScheduler(timezone="UTC")

    # interval from env (minutes)
    interval_minutes = int(os.getenv("BOOKING_EXPIRY_INTERVAL_MINUTES", "30"))

    def expire_bookings_job():
        conn = get_system_db()
        try:
            call_procedure(conn, "emd.sp_booking_expire", {})
            print("[Scheduler] Booking expiry executed")
        except Exception as exc:
            print(f"[Scheduler][ERROR] {exc}")
        finally:
            conn.close()

    scheduler.add_job(
        expire_bookings_job,
        trigger="interval",
        minutes=interval_minutes,
        id="expire_bookings_job",
        replace_existing=True,
    )

    print(f"[Scheduler] Booking expiry enabled (every {interval_minutes} minutes)")
    scheduler.start()

from fastapi import FastAPI
from app.core.scheduler import scheduler, start_scheduler
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes.calendar import router as calendar_router
from app.api.routes.events import router as events_router
from app.api.routes.categories import router as categories_router
from app.api.routes.venue import router as venue_router
from app.api.routes.tickets import router as tickets_router
from app.api.routes.notes import router as notes_router
from app.api.routes.partners import router as partners_router
from app.api.routes.merchandise import router as merchandise_router
from app.api.routes.artists  import router as artists_router
from app.api.routes.prohibited_items import router as prohibited_item_router
from app.api.routes.seat_zone import router as seat_zone_router
from app.api.routes.bookings.booking_routes import router as booking_router
from app.api.routes.bookings.invoices import router as invoice_router
from app.api.routes.dashboard.dashboard import router as dashboard_router
from app.api.routes.financials.financials import router as financials_router
from app.api.routes.gallery.gallery import router as gallery_router
from app.api.routes.feedback.feedback import router as feedback_router
from app.api.routes.bookings.voucher_router import router as voucher_information_router
from app.api.routes.users import router as users_router

from app.api.routes.auth.auth import router as auth_router
from app.api.routes.email.messages import router as email_router
from app.api.routes.organizations import router as organization_router

app = FastAPI(
    title="Event Management API",
    version="1.0.0",
)


origins = [
    "http://localhost:3000",                          # local dev
    "https://dev.d2iv1o1pbknmr9.amplifyapp.com",       # AWS Amplify (DEV)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    start_scheduler()


@app.get("/health", tags=["Healths"])
def health_check():
    return {"status": "ok"}


@app.get("/__test")
def test():
    return {"ok": True}


app.include_router(calendar_router, prefix="/calendar", tags=["Calendar"])
app.include_router(events_router, prefix="/events", tags=["Events"])
app.include_router(categories_router, prefix="/categories", tags=["Categories"])
app.include_router(venue_router, prefix="/venue", tags=["Venue"])
app.include_router(tickets_router, prefix="/tickets", tags=["Tickets"])
app.include_router(notes_router, prefix="/notes", tags=["Notes"])
app.include_router(partners_router, prefix="/partners", tags=["Partners"])
app.include_router(merchandise_router, prefix="/merchandise", tags=["Merchandise"])
app.include_router(artists_router, prefix="/artists", tags=["Artists"])
app.include_router(prohibited_item_router, prefix="/prohibited_items", tags=["Prohibited Items"])
app.include_router(seat_zone_router, prefix="/seat_zones", tags=["Seat Zones"])
app.include_router(booking_router, prefix="/bookings", tags=["Bookings"])
app.include_router(invoice_router, prefix="/invoices", tags=["Invoices"])
app.include_router(dashboard_router, prefix="/dashboard", tags=["Dashboard"])
app.include_router(financials_router, prefix="/financials", tags=["Financials"])
app.include_router(gallery_router, prefix="/galleries", tags=["Galleries"])
app.include_router(feedback_router, prefix="/feedback", tags=["Feedback"])
app.include_router(voucher_information_router, prefix="/vouchers", tags=["Vouchers"])
app.include_router(users_router, prefix="/users", tags=["Users"])

app.include_router(auth_router, prefix="/authentication", tags=["Auth"])
app.include_router(email_router, prefix="/emails", tags=["Emails"])
app.include_router(organization_router, prefix="/organization", tags=["Organization"])
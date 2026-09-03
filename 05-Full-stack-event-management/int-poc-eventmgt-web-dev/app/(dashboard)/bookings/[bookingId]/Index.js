"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/helper/api";
import {
    Container,
    Row,
    Col,
    Card,
    Badge,
    Button,
    Spinner,
} from "react-bootstrap";
import { Calendar, MapPin, User } from "lucide-react";
import { formatDate } from "@/utils/dateTime";
import FeedbackModal from "@/components/feedback/FeedbackModal";

/* ---------------- STATUS UI MAP ---------------- */
const statusMap = {
    initiated: { label: "Pending", variant: "warning" },
    confirmed: { label: "Confirmed", variant: "success" },
    cancelled: { label: "Cancelled", variant: "danger" },
    expired: { label: "Expired", variant: "secondary" },
};

export default function BookingDetailsPage() {
    const { bookingId } = useParams();
    const router = useRouter();

    /* ---------------- STATES ---------------- */
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [confirming, setConfirming] = useState(false);
    const [cancelling, setCancelling] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [ratingTypes, setRatingTypes] = useState([]);

    /* ---------------- EFFECTS (ALL AT TOP) ---------------- */

    useEffect(() => {
        if (!bookingId) return;
        fetchDetails();
    }, [bookingId]);

    useEffect(() => {
        fetchRatingTypes();
    }, []);

    /* ---------------- API CALLS ---------------- */

    const fetchDetails = async () => {
        try {
            const res = await api.get(`/bookings/details/${bookingId}`);
            setData(res.data);
        } catch (err) {
            console.error("BOOKING DETAILS ERROR", err);
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    const fetchRatingTypes = async () => {
        try {
            const res = await api.get("/feedback/rating-types");
            setRatingTypes(res.data || []);
        } catch (err) {
            console.error("RATING TYPES ERROR", err);
        }
    };

    const handleFeedbackSubmit = async (payload) => {
        try {
            await api.post("/feedback/submit", payload);
            alert("Feedback submitted successfully");
            setShowFeedback(false);
        } catch {
            alert("Feedback already submitted or invalid");
        }
    };

    /* ---------------- SAFE RETURNS ---------------- */

    if (loading) {
        return (
            <div className="p-5 text-center">
                <Spinner animation="border" />
            </div>
        );
    }

    if (!data) {
        return <p className="p-5">Booking not found</p>;
    }

    /* ---------------- DATA ---------------- */

    const { booking, items, voucher } = data;
    const statusUI =
        statusMap[booking.status] || {
            label: booking.status,
            variant: "secondary",
        };

    const currency = booking.currency || "INR";

    /* ---------------- RENDER ---------------- */

    return (
        <>
            <Container fluid className="pb-5">
                {/* ================= HEADER ================= */}
                <Card className="rounded-4 mb-4">
                    <Card.Body className="d-flex flex-wrap justify-content-between align-items-center gap-3">
                        <div>
                            <h5 className="fw-bold mb-1">
                                {booking.event_name || "Event Deleted"}
                            </h5>
                            <div className="text-muted small">
                                Booking Ref:{" "}
                                <Badge bg="light" text="dark">
                                    {booking.booking_ref}
                                </Badge>
                            </div>
                        </div>

                        <Badge bg={statusUI.variant} className="fs-6 px-3 py-2">
                            {statusUI.label}
                        </Badge>
                    </Card.Body>
                </Card>

                {/* ================= EVENT & CUSTOMER ================= */}
                <Row className="g-4 mb-4">
                    <Col md={6}>
                        <Card className="rounded-4 h-100">
                            <Card.Body>
                                <h6 className="fw-bold mb-3">Event Information</h6>

                                <div className="small text-muted mb-2">
                                    <Calendar size={14} className="me-2" />
                                    Book on: {formatDate(booking.created_at)}
                                </div>

                                <div className="small text-muted">
                                    <MapPin size={14} className="me-2 text-danger" />
                                    {booking.event_location || "-"}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6}>
                        <Card className="rounded-4 h-100">
                            <Card.Body>
                                <h6 className="fw-bold mb-3">Customer Details</h6>

                                <div className="small text-muted mb-1">
                                    <User size={14} className="me-2" />
                                    {booking.customer_name}
                                </div>

                                <div className="small text-muted">
                                    {booking.customer_email}
                                </div>

                                <div className="small text-muted">
                                    {booking.customer_phone}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* ================= TICKETS ================= */}
                <Card className="rounded-4 mb-4">
                    <Card.Body>
                        <h6 className="fw-bold mb-3">Ticket Summary</h6>

                        {items.map((it) => (
                            <div
                                key={it.ticket_name}
                                className="d-flex justify-content-between align-items-center mb-2"
                            >
                                <div>
                                    <div className="fw-medium">{it.ticket_name}</div>
                                    <small className="text-muted">
                                        {it.seat_zone_name} × {it.quantity}
                                    </small>
                                </div>

                                <div className="fw-semibold">
                                    {currency} {it.line_total}
                                </div>
                            </div>
                        ))}

                        <hr />

                        <div className="d-flex justify-content-between fw-bold fs-5">
                            <span>Total</span>
                            <span>
                                {currency} {booking.total_amount}
                            </span>
                        </div>
                    </Card.Body>
                </Card>

                {/* ================= ACTIONS ================= */}
                <Card className="rounded-4">
                    <Card.Body className="d-flex flex-wrap gap-3">

                        {/* CONFIRM */}
                        {booking.status === "initiated" && (
                            <Button
                                variant="primary"
                                disabled={confirming}
                                onClick={async () => {
                                    try {
                                        setConfirming(true);
                                        await api.post(`/bookings/${bookingId}/confirm`);

                                        const res = await api.get(`/bookings/details/${bookingId}`);

                                        if (res.data?.voucher?.voucher_code) {
                                            router.push(`/vouchers/details/${res.data.voucher.voucher_code}`);
                                        }
                                    } catch {
                                        alert("Failed to confirm booking");
                                    } finally {
                                        setConfirming(false);
                                    }

                                }}
                            >
                                {confirming ? "Confirming..." : "Confirm Booking"}
                            </Button>
                        )}

                        {/* CANCEL */}
                        {booking.status === "initiated" && (
                            <Button
                                variant="outline-danger"
                                disabled={cancelling}
                                onClick={async () => {
                                    if (!confirm("Are you sure you want to cancel this booking?"))
                                        return;

                                    try {
                                        setCancelling(true);
                                        await api.post(`/bookings/${bookingId}/cancel`);
                                        await fetchDetails();
                                    } catch {
                                        alert("Failed to cancel booking");
                                    } finally {
                                        setCancelling(false);
                                    }
                                }}
                            >
                                Cancel Booking
                            </Button>
                        )}

                        {/* VIEW E-VOUCHER (ONLY ONCE) */}
                        {booking.status === "confirmed" && voucher && (
                            <Button
                                variant="success"
                                onClick={() =>
                                    router.push(`/vouchers/details/${voucher.voucher_code}`)
                                }
                            >
                                View E-Voucher
                            </Button>
                        )}

                        {/* FEEDBACK */}
                        {booking.status === "confirmed" && (
                            <Button
                                variant="outline-primary"
                                onClick={() => setShowFeedback(true)}
                            >
                                Give Feedback
                            </Button>
                        )}
                    </Card.Body>
                </Card>

            </Container>

            {showFeedback && (
                <FeedbackModal
                    show={showFeedback}
                    bookingId={booking.booking_id}          // ✅ DIRECT PASS
                    eventName={booking.event_name}  // ✅ OPTIONAL
                    ratingTypes={ratingTypes}
                    onClose={() => setShowFeedback(false)}
                    onSubmit={handleFeedbackSubmit}
                />

            )}
        </>
    );
}

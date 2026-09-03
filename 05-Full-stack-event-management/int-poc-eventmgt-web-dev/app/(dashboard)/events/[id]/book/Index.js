"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import api from "@/helper/api";
import Header from "@/components/Header";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Calendar, MapPin } from "lucide-react";
import { formatDate, formatTime } from "@/utils/dateTime";
import CustomerDetailsModal from "@/components/booking/CustomerDetailsModal";


const Index = () => {
    const { id } = useParams();

    const [event, setEvent] = useState(null);
    const [tickets, setTickets] = useState([]);
    const [selected, setSelected] = useState({});
    const [loading, setLoading] = useState(true);

    const [showCustomerModal, setShowCustomerModal] = useState(false);


    /* ================= FETCH EVENT ================= */
    useEffect(() => {
        if (!id) return;
        fetchEvent();
    }, [id]);

    const fetchEvent = async () => {
        try {
            const res = await api.get(`/events/events_detail/${id}`);
            const raw = res.data;

            /* -------- EVENT -------- */
            setEvent({
                name: raw.event?.name,
                description: raw.event?.description,
                event_date: raw.calendar?.agenda_date,
                start_time: raw.calendar?.start_time,
                end_time: raw.calendar?.end_time,
                location: raw.venue?.address,
            });

            /* -------- SEAT ZONE → CAPACITY -------- */
            const seatZoneMap = {};
            (raw.seat_zones || []).forEach((z) => {
                seatZoneMap[z.seat_zone_id] = z.capacity;
            });

            /* -------- TICKET BENEFITS MAP -------- */
            const benefitsMap = {};
            (raw.ticket_benefits || []).forEach((b) => {
                if (!benefitsMap[b.ticket_id]) {
                    benefitsMap[b.ticket_id] = [];
                }
                benefitsMap[b.ticket_id].push(b.benefit);
            });

            /* -------- TICKETS -------- */
            const mappedTickets = (raw.tickets || []).map((t) => ({
                ...t,
                max_qty: seatZoneMap[t.seat_zone_id] || 0,
                benefits: benefitsMap[t.ticket_id] || [],
            }));

            setTickets(mappedTickets);
        } catch (err) {
            console.error("EVENT FETCH ERROR", err);
            setEvent(null);
        } finally {
            setLoading(false);
        }
    };

    /* ================= TOTAL ================= */
    const totalAmount = useMemo(() => {
        return tickets.reduce((sum, t) => {
            const qty = selected[t.ticket_id] || 0;
            return sum + qty * t.price;
        }, 0);
    }, [tickets, selected]);

    const hasSelection = totalAmount > 0;

    if (loading) return <p className="p-5">Loading...</p>;
    if (!event) return <p className="p-5">Event not found</p>;

    return (
        <>
            {/* <Header title="Book Event" breadcrumb="Dashboard / Events / Book" /> */}

            <Container fluid className="pb-5">
                {/* ================= EVENT SUMMARY ================= */}
                <Card className="rounded-4 mb-4 border">
                    <Card.Body className="">
                        <h4 className="fw-bold mb-2">{event.name}</h4>

                        <div className="text-secondary-100 small mb-1">
                            <Calendar size={16} className="me-1 mb-1" />
                            {formatDate(event.event_date)} · {formatTime(event.start_time)}
                        </div>

                        <div className="text-secondary-100 small mb-2">
                            <MapPin size={16} className="me-1 mb-1 text-danger" />
                            {event.location || "Location not added"}
                        </div>

                        <p className="text-grey-100 small mb-0">
                            {event.description}
                        </p>
                    </Card.Body>
                </Card>

                {/* ================= TICKETS + SUMMARY ================= */}
                <Card className="p-4 bg-grey-20">
                    <Row className="g-4">
                        {/* -------- LEFT: TICKETS -------- */}
                        <h4 className="mb-0">Select Tickets</h4>

                        <Col xs={12} lg={8}>
                            <Row className="g-3">
                                {tickets.map((t) => (
                                    <Col key={t.ticket_id} xs={12} md={6}>
                                        <div className="bg-white rounded-4 p-4 h-100 border d-flex flex-column">
                                            <div className="d-flex justify-content-between mb-2">
                                                <div>
                                                    <h6 className="fw-bold mb-1">{t.ticket_name}</h6>
                                                    <small className="text-muted">
                                                        {t.seat_zone_name} • Seating
                                                    </small>
                                                </div>
                                                <div className="fw-bold text-primary-100 fs-5">
                                                    ${t.price}
                                                </div>
                                            </div>

                                            {/* BENEFITS FROM API */}
                                            {t.benefits.length > 0 && (
                                                <ul className="small text-muted ps-3 mb-3">
                                                    {t.benefits.map((b, i) => (
                                                        <li key={i}>{b}</li>
                                                    ))}
                                                </ul>
                                            )}

                                            {/* QTY SELECTOR */}
                                            <div className="mt-auto d-flex justify-content-between align-items-center">
                                                <small className="text-muted">
                                                    Max {t.max_qty}
                                                </small>

                                                <div className="d-flex align-items-center gap-2">
                                                    <button
                                                        className="btn btn-outline-secondary btn-sm rounded-circle"
                                                        onClick={() => {
                                                            const c = selected[t.ticket_id] || 0;
                                                            if (c === 0) return;
                                                            setSelected({ ...selected, [t.ticket_id]: c - 1 });
                                                        }}
                                                    >
                                                        –
                                                    </button>

                                                    <div className="fw-semibold">
                                                        {selected[t.ticket_id] || 0}
                                                    </div>

                                                    <button
                                                        className="btn btn-outline-secondary btn-sm rounded-circle"
                                                        onClick={() => {
                                                            const c = selected[t.ticket_id] || 0;
                                                            if (c >= t.max_qty) return;
                                                            setSelected({ ...selected, [t.ticket_id]: c + 1 });
                                                        }}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </Col>

                        {/* -------- RIGHT: SUMMARY -------- */}
                        <Col xs={12} lg={4}>
                            <div
                                className="bg-white rounded-4 p-4 border position-sticky"
                                style={{ top: 90 }}
                            >
                                <h6 className="fw-bold mb-3">Booking Summary</h6>

                                {!hasSelection && (
                                    <p className="text-muted small">
                                        No tickets selected
                                    </p>
                                )}

                                {tickets.map((t) => {
                                    const qty = selected[t.ticket_id] || 0;
                                    if (!qty) return null;

                                    return (
                                        <div
                                            key={t.ticket_id}
                                            className="d-flex justify-content-between small mb-2"
                                        >
                                            <span>{t.ticket_name} × {qty}</span>
                                            <span>${qty * t.price}</span>
                                        </div>
                                    );
                                })}

                                <hr />

                                <div className="d-flex justify-content-between fw-bold mb-1">
                                    <span>Subtotal</span>
                                    <span>${totalAmount}</span>
                                </div>

                                <div className="d-flex justify-content-between text-muted small mb-2">
                                    <span>Taxes & fees</span>
                                    <span>$0</span>
                                </div>

                                <div className="d-flex justify-content-between fw-bold fs-5">
                                    <span>Total</span>
                                    <span>${totalAmount}</span>
                                </div>

                                <Button
                                    className="w-100 mt-3 border-0 bg-primary-100 text-grey-10"
                                    disabled={!hasSelection}
                                    onClick={() => setShowCustomerModal(true)}
                                >
                                    Proceed
                                </Button>

                                <small className="text-muted d-block text-center mt-2">
                                    Final amount confirmed next
                                </small>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </Container>

            <CustomerDetailsModal
                show={showCustomerModal}
                onHide={() => setShowCustomerModal(false)}
                eventId={id}
                selected={selected}
            />
        </>
    );
};

export default Index;

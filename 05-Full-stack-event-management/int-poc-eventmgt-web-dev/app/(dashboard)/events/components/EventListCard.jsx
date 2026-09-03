"use client";

/**
 * EventListCard
 * ----------------
 * Responsive event listing card
 * - Desktop / Tablet (>= 576px): Full detailed layout
 * - Mobile (<= 575px): Compact summary layout
 */

import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import ProgressBar from "react-bootstrap/ProgressBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MapPin, CalendarDays, Ticket } from "lucide-react";
import Link from "next/link";
import { formatDate, formatTime } from "@/utils/dateTime";

export default function EventListCard({ event }) {

    /* -----------------------------
     * Derived values (safe defaults)
     * ----------------------------- */
    const sold = event.sold_tickets || 0;
    const total = event.total_tickets || 0;
    const percent = total ? Math.round((sold / total) * 100) : 0;
    const left = total - sold;

    const locationText =
        event.location ||
        (event.venue_name && event.city
            ? `${event.venue_name}, ${event.city}`
            : "Location not added");

    const minPrice =
        event.min_ticket_price !== null &&
            event.min_ticket_price !== undefined
            ? event.min_ticket_price
            : "--";

    return (
        <Card className="border-0 rounded-4 shadow-sm mb-3">
            <Card.Body className="px-4 py-3">

                {/* MAIN ROW */}
                <Row className="align-items-center g-3">

                    {/* ------------------------------------------------
                     * EVENT IMAGE
                     * - Fixed height thumbnail
                     * - Clickable (routes to event detail page)
                     * ------------------------------------------------ */}
                    <Col xs={3} sm={2} md={2} lg={2}>
                        <Link href={`/events/${event.event_id}`}>
                            <div
                                className="rounded-4"
                                style={{
                                    width: "100%",
                                    height: 96,
                                    backgroundImage: event.banner_image_url
                                        ? `url(${event.banner_image_url})`
                                        : undefined,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    backgroundColor: "#e5e7eb",
                                }}
                            />
                        </Link>
                    </Col>

                    {/* ------------------------------------------------
                     * EVENT INFO
                     * - Category badge
                     * - Event name
                     * - Description (XL only)
                     * - Location + date for mobile/tablet (< lg)
                     * ------------------------------------------------ */}
                    <Col xs={9} sm={4} md={4} lg={4}>
                        <Badge pill className="mb-2 px-3 py-1 bg-primary-40 text-secondary-100">
                            {event.category_name || "Event"}
                        </Badge>

                        <Link
                            href={`/events/${event.event_id}`}
                            className="text-dark text-decoration-none"
                        >
                            <h6 className="fw-semibold mb-2 text-truncate">
                                {event.name}
                            </h6>
                        </Link>

                        {/* Description only on XL screens */}
                        {event.description ? (
                            <p className="text-grey-70 fs-11 mb-0 line-clamp-2 me-5 d-none d-xl-block">
                                {event.description}
                            </p>
                        ) : (
                            <p className="text-grey-70 fs-11 mb-0 me-10 d-none d-lg-block">
                                Top outdoor brands showcase the latest gear. Discounts,
                                demos, and expert consultations.
                            </p>
                        )}

                        {/* Location + date for < lg screens */}
                        <div className="d-block d-lg-none">
                            <div className="d-flex gap-1 text-grey-80 align-items-center mb-1 fs-11">
                                <MapPin size={14} />
                                <span>{locationText}</span>
                            </div>

                            <div className="d-flex gap-1 text-grey-80 align-items-center fs-11">
                                <CalendarDays size={14} />
                                <span>
                                    {formatDate(event.agenda_date)}
                                    {event.start_time && ` – ${formatTime(event.start_time)}`}
                                </span>
                            </div>
                        </div>
                    </Col>

                    {/* ------------------------------------------------
                     * LOCATION + DATE (Desktop only)
                     * ------------------------------------------------ */}
                    <Col xs={12} md={3} lg={2} className="small d-none d-lg-block">
                        <div className="d-flex gap-1 align-items-center mb-1 fs-11">
                            <MapPin size={14} />
                            <span className="text-grey-80">{locationText}</span>
                        </div>

                        <div className="d-flex gap-1 text-grey-80 align-items-center fs-11">
                            <CalendarDays size={14} />
                            <span>
                                {formatDate(event.agenda_date)}
                                {event.start_time && ` – ${formatTime(event.start_time)}`}
                            </span>
                        </div>
                    </Col>

                    {/* ------------------------------------------------
                     * TICKET SOLD (Desktop only)
                     * ------------------------------------------------ */}
                    <Col xs={6} md={3} lg={2} className="d-none d-lg-block">
                        <ProgressBar
                            now={percent}
                            style={{ height: 6, maxWidth: 112 }}
                            className="rounded-pill bg-primary-50 mb-1"
                        />
                        <div className="small d-flex gap-2">
                            <span className="fw-semibold">{percent}%</span>
                            <span className="text-muted">Ticket Sold</span>
                        </div>
                    </Col>

                    {/* ------------------------------------------------
                     * TICKETS LEFT (Desktop only)
                     * ------------------------------------------------ */}
                    <Col xs={3} md={2} lg={1} className="d-none d-lg-block">
                        <div className="d-flex align-items-center gap-2">
                            <div className="bg-grey-20 px-2 py-2 rounded-2">
                                <Ticket size={18} className="text-primary-100" />
                            </div>
                            <div>
                                <div className="fw-semibold">{left}</div>
                                <div className="text-muted small">Left</div>
                            </div>
                        </div>
                    </Col>

                    {/* ------------------------------------------------
                     * MIN PRICE (Desktop only)
                     * ------------------------------------------------ */}
                    <Col xs={3} md={2} lg={1} className="p-1 text-end d-none d-lg-block">
                        <div className="fw-semibold fs-6 text-primary-100 bg-cool-grey-10 rounded-1 px-xl-3 px-1 py-1 d-inline-block">
                            ${minPrice}
                        </div>
                    </Col>

                    {/* ------------------------------------------------
                     * MOBILE / TABLET SUMMARY (<= 575px)
                     * - Ticket sold on top
                     * - Tickets left + price in one row
                     * ------------------------------------------------ */}
                    <Col xs={12} sm={6} lg={2} className="small text-muted text-end">
                        <div className="d-lg-none">

                            {/* Divider only on XS */}
                            <hr className="d-block d-sm-none" />

                            {/* Ticket sold (>= 576px, < 992px) */}
                            <div className="mb-2 d-none d-sm-block">
                                <div className="d-flex justify-content-start fs-11 mb-1">
                                    <span className="fw-semibold">{percent}%</span>
                                    <span className="text-muted">Ticket Sold</span>
                                </div>
                                <ProgressBar
                                    now={percent}
                                    style={{ height: 6 }}
                                    className="rounded-pill bg-primary-50"
                                />
                            </div>

                            {/* XS layout */}
                            <div className="d-flex justify-content-between align-items-center">

                                {/* Ticket sold (XS only) */}
                                <div className="mb-2 d-block d-sm-none">
                                    <div className="d-flex justify-content-start fs-11 mb-1">
                                        <span className="fw-semibold">{percent}%</span>
                                        <span className="text-muted">Ticket Sold</span>
                                    </div>
                                    <ProgressBar
                                        now={percent}
                                        style={{ height: 6 }}
                                        className="rounded-pill bg-primary-50"
                                    />
                                </div>

                                {/* Tickets left */}
                                <div className="d-flex align-items-center gap-2">
                                    <div className="bg-grey-20 px-2 py-2 rounded-2">
                                        <Ticket size={18} className="text-primary-100" />
                                    </div>
                                    <div>
                                        <div className="fw-semibold text-start">{left}</div>
                                        <div className="fs-10 text-muted">Tickets Left</div>
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="fw-semibold fs-6 text-primary-100 bg-cool-grey-10 rounded-1 px-3 py-1">
                                    ${minPrice}
                                </div>
                            </div>

                        </div>
                    </Col>

                </Row>
            </Card.Body>
        </Card>
    );
}

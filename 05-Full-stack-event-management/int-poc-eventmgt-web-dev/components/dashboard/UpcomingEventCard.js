"use client";

import { Card, Badge, Button } from "react-bootstrap";
import { CalendarDays } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatDate, formatTime } from "@/utils/dateTime";



export default function UpcomingEventCard({
    event,
    variant = "sidebar", // "sidebar" | "grid"
    variantStyle = "primary",
    showBorder = true,
}) {


    const STYLE_MAP = {
        primary: {
            cardBg: "bg-primary-10",
            imageBg: "#EEEFFF",
            borderColor: "#F26CF9",
            button: "#F26CF9",
        },
        secondary: {
            cardBg: "bg-cool-grey-10",
            imageBg: "#EEEFFF",
            borderColor: "#2F3A8F",
            button: "#2F3A8F",
        },
    };

    const styles = STYLE_MAP[variantStyle];


    const router = useRouter();
    if (!event) return null;

    const isGrid = variant === "grid";

    return (
        <Card className={`border-0 ${styles.cardBg} rounded-4 shadow-sm`}>

            {/* IMAGE */}
            <div
                style={{
                    height: 220,
                    backgroundColor: styles.imageBg,
                    backgroundImage: event.banner_image_url
                        ? `url(${event.banner_image_url})`
                        : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    border: showBorder ? `2px solid ${styles.borderColor}` : undefined,
                    borderRadius: 20,
                }}
                className="p-3"
            >
                <Badge pill bg="light" text="primary">
                    {event.event_category_name || event.category_name || "Event"}
                </Badge>
            </div>

            {/* BODY */}
            <Card.Body className="d-flex flex-column gap-1">
                <h5 className="fw-semibold text-grey-100 fs-body-md mb-1">{event.event_name || "Event name not added"}</h5>

                <div className="text-grey-80 fs-body-sm small mb-1 flex-shrink-0">
                    {event.location || "Location not added"}
                </div>

                {variant === "sidebar" && (
                    <p className="text-muted small mb-2 flex-shrink-0">
                        {event.description
                            ? event.description.slice(0, 120) + "…"
                            : "Event details will be updated soon"}
                    </p>
                )}

                {/* FOOTER */}
                <div className="d-flex align-items-center justify-content-between mt-auto">
                    {/* DATE / TIME */}
                    <div className="d-flex align-items-center gap-2 text-muted small">
                        <CalendarDays size={18} />
                        <div className="text-grey-100 fs-11 fw-medium">
                            {formatDate(event.agenda_date)}

                            {/* time ONLY for sidebar */}
                            {!isGrid && event.start_time && (
                                <div className="small text-grey-80 fs-10 fw-regular">
                                    {formatTime(event.start_time)}
                                    {event.end_time && ` – ${formatTime(event.end_time)}`}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT ACTION */}
                    {isGrid ? (
                        //  GRID: MIN PRICE
                        <div className="fw-bold text-primary-100 fs-14">
                            ${event.min_price ?? event.price ?? 0}
                        </div>
                    ) : (
                        // SIDEBAR: VIEW DETAILS
                        <Button
                            className="rounded-pill px-4"
                            style={{ backgroundColor: "#F26CF9", border: "none" }}
                            onClick={() => router.push(`/events/${event.event_id}`)}
                        >
                            View Details
                        </Button>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}

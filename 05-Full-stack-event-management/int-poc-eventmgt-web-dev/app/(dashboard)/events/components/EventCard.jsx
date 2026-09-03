"use client";

import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import ProgressBar from "react-bootstrap/ProgressBar";
import Link from "next/link";
import { MapPin, Trash2 } from "lucide-react";
import { Button } from "react-bootstrap";
import { useState } from "react";
import ActivateEventModal from "./ActivateEventModal";
import { useRouter } from "next/navigation";
import api from "@/helper/api";
import { formatDate, formatTime } from "@/utils/dateTime";

export default function EventCard({ event = {}, onRefresh, showEdit = true, showViewDetails = false, }) {
  const [showActivate, setShowActivate] = useState(false);
  const router = useRouter();
  if (!event) return null;
  /* ---------------- SAFE VALUES ---------------- */
  const bookingPercent = Math.min(
    Math.max(event?.booking_percentage ?? 0, 0),
    100
  );

  const minPrice =
    event.min_ticket_price !== null &&
      event.min_ticket_price !== undefined
      ? event.min_ticket_price
      : "--";

  const locationText = event.location || "Location not added";

  const statusLabel =
    event.status?.charAt(0).toUpperCase() + event.status?.slice(1);

  return (
    <>
      <Card className="border-0 rounded-4 h-100 shadow-sm">
        {/* IMAGE / BANNER */}
        <Link href={`/events/${event.event_id}`} className="text-decoration-none">
          <div
            className="rounded-4 m-3 d-flex justify-content-between align-items-start p-3"
            style={{
              height: 170,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "#e5e7eb",
              backgroundImage: event.banner_image_url
                ? `url(${event.banner_image_url})`
                : undefined,
              cursor: "pointer",
            }}
          >
            {/* CATEGORY */}
            <Badge pill className="fw-medium px-3 py-2 bg-grey-10 text-secondary-100">
              {event.category_name || "Event"}
            </Badge>

            {/* STATUS */}
            <Badge
              pill
              className="px-3 py-2 d-flex align-items-center gap-2 bg-primary-30 text-dark"
            >
              <span
                className="d-inline-block rounded-circle bg-primary-100"
                style={{ width: 8, height: 8 }}
              />
              {statusLabel}
            </Badge>
          </div>
        </Link>

        {/* BODY */}
        <Card.Body className="pt-0 px-4 pb-4 d-flex flex-column">
          {/* DATE */}
          <small className="text-muted d-block mb-1">
            {formatDate(event.agenda_date)}
            {event.start_time && ` – ${formatTime(event.start_time)}`}
          </small>


          {/* TITLE */}
          <Link
            href={`/events/${event.event_id}`}
            className="text-decoration-none text-dark"
          >
            <h6 className="fw-bold mb-2 text-grey-100 hover-underline">
              {event.name}
            </h6>
          </Link>

          {/* LOCATION */}
          <div className="d-flex align-items-center gap-2 text-muted mb-3 small">
            <MapPin size={14} />
            <span className="text-truncate">{locationText}</span>
          </div>

          {/* PROGRESS + PRICE */}
          <div className="mt-auto d-flex align-items-center justify-content-between gap-3">
            <div className="flex-grow-1">
              <ProgressBar
                now={bookingPercent}
                style={{ height: 6 }}
                className="rounded-pill"
              />
            </div>

            <div className="d-flex align-items-center gap-2">
              <span className="fw-semibold">{bookingPercent}%</span>
              <span className="fw-semibold text-primary-100">
                ${minPrice}
              </span>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="d-flex mt-3 gap-2">
            {showEdit && event.status !== "past" && (
              <Button
                variant=""
                size="sm"
                className="flex-fill rounded-pill bg-secondary-100 text-grey-10"
                onClick={() =>
                  router.push(`/events/${event.event_id}/edit`)
                }
              >
                Edit
              </Button>
            )}

            {event.status === "active" && (
              <Button
                size="sm"
                variant=""
                className="flex-fill rounded-pill bg-primary-100 text-grey-10"
                onClick={() =>
                  router.push(`/events/${event.event_id}/book`)
                }
              >
                Book Now
              </Button>
            )}

            {event.status === "draft" && (
              <Button
                variant=""
                size="sm"
                className="flex-fill rounded-pill bg-primary-100 text-grey-10"
                onClick={() => setShowActivate(true)}
              >
                Activate
              </Button>
            )}

            {event.status === "draft" && (
              <Button
                variant="outline-danger"
                size="sm"
                className="flex-fill rounded-pill d-flex justify-content-center align-items-center"
                onClick={async () => {
                  if (
                    !confirm(
                      "Are you sure you want to delete this draft event?"
                    )
                  )
                    return;

                  try {
                    await api.delete(`/events/${event.event_id}`);
                    alert("Event deleted successfully");
                    onRefresh?.();
                  } catch (err) {
                    alert("Failed to delete event");
                  }
                }}
              >
                <Trash2 size={18} />
              </Button>
            )}

            {showViewDetails && (
              <Button
                className="ms-auto rounded-pill px-4"
                style={{ backgroundColor: "#F26CF9", border: "none" }}
                onClick={() => router.push(`/events/${event.event_id}`)}
              >
                View Details
              </Button>
            )}

          </div>
        </Card.Body>
      </Card>

      {/* ACTIVATE MODAL */}
      <ActivateEventModal
        show={showActivate}
        onHide={() => setShowActivate(false)}
        eventId={event.event_id}
        onActivated={onRefresh}
      />
    </>
  );
}

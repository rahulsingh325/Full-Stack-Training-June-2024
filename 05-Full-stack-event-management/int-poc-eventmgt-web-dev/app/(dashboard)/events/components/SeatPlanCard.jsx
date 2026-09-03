"use client";

import { CheckCircle } from "lucide-react";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";

const zoneColors = {
  Diamond: "#F3C5FF",
  Platinum: "#EAD7FF",
  Gold: "#6C7BCF",
  Silver: "#B7C0E5",
  Bronze: "#D6DDF8",
  "General Admission": "#FFE7B3",
  "Backstage Access": "#FFC533",
  "VIP Lounge": "#F56CFF",
};

export default function SeatPlanCard({
  seatPlanImage,
  seatZones = [],
  tickets = [],
  notes = [],
  ticketBenefits = [],
}) {
  if (!seatPlanImage) return null;

  const getTicketByZone = (zoneId) =>
    tickets.find((t) => t.seat_zone_id === zoneId);

  const vipTickets = tickets.filter((t) => t.is_vip);

  return (
    <Card className="border-0 shadow-sm rounded-4 mb-4">
      {/* HEADER */}
      <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center px-4 pt-4">
        <h6 className="fw-semibold mb-0">Seat Plan</h6>
        <Dropdown align="end">
          <Dropdown.Toggle
            variant="light"
            size="sm"
            className="border-0 shadow-none"
          >
            ⋯
          </Dropdown.Toggle>
        </Dropdown>
      </Card.Header>

      <Card.Body className="px-4 pb-4">
        {/* IMAGE + ZONES */}
        <div className="seat-plan-layout mb-4">
          {/* IMAGE */}
          <div className="seat-plan-image">
            <img
              src={seatPlanImage}
              alt="Seat Plan"
              className="img-fluid rounded-3"
            />
          </div>

          {/* ZONES */}
          <div className="seat-plan-zones">
            {seatZones.map((zone) => {
              const ticket = getTicketByZone(zone.seat_zone_id);
              if (!ticket) return null;

              const color =
                zoneColors[zone.seat_zone_name] || "#E5E7EB";

              return (
                <div
                  key={zone.seat_zone_id}
                  className="d-flex justify-content-start align-items-start mb-3"
                >
                  <div className="d-flex gap-2 align-items-start">
                    <span
                      className="seat-zone-dot"
                      style={{ backgroundColor: color }}
                    />

                    <div>
                      <div className="fw-regular fs-btn-sm text-grey-100">
                        {zone.seat_zone_name}
                      </div>
                      <div className="small fw-regular text-grey-70 fs-11">
                        (
                        {ticket.access_type === "seating"
                          ? "Seating"
                          : "Standing"}
                        )
                      </div>
                    </div>
                  </div>

                  <div className="fw-semibold fs-11 text-primary-110 ms-1">
                    ${ticket.price}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* NOTES */}
        {notes.length > 0 && (
          <div className="mb-4">
            <div className="fw-medium mb-1">Notes</div>
            <ul className="small text-muted ps-3 mb-0">
              {notes.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          </div>
        )}

        {/* BENEFITS */}
        {vipTickets.length > 0 && (
          <>
            <div className="fw-medium mb-2">
              Ticket Category Benefits
            </div>

            <div className="d-flex gap-3 flex-wrap seat-benefits-wrapper">
              {[...vipTickets]
                .sort((a, b) => b.price - a.price)
                .slice(0, 2)
                .map((ticket) => {
                  const benefits = ticketBenefits.filter(
                    (b) => b.ticket_id === ticket.ticket_id
                  );

                  return (
                    <div
                      key={ticket.ticket_id}
                      className="flex-fill bg-light rounded-4 p-3 seat-benefit-card"
                    >
                      <div className="fw-medium mb-2">
                        {ticket.ticket_name}
                      </div>

                      <ul className="list-unstyled mb-2">
                        {benefits.map((b, i) => (
                          <li
                            key={i}
                            className="d-flex gap-1 align-items-start"
                          >
                            <CheckCircle
                              size={12}
                              className="text-grey-50 benefit-icon"
                            />
                            <span className="text-grey-80 fs-11 fw-regular">
                              {b.benefit}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div className="fw-bold text-primary-100">
                        ${ticket.price}
                      </div>
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

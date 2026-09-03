"use client";

import { CheckCircle } from "lucide-react";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";

export default function PackagesCard({
  tickets = [],
  ticketBenefits = [],
}) {
  if (!tickets.length) return null;

  // Optional: sort by price (low → high)
  const sortedTickets = [...tickets].sort(
    (a, b) => a.price - b.price
  );

  return (
    <Card className="border-0 shadow-sm rounded-4 mb-4">
      {/* HEADER */}
      <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center px-4 pt-4">
        <h6 className="fw-semibold text-grey-100 mb-0">Packages</h6>

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

      {/* BODY */}
      <Card.Body className="px-4 pb-4">
        <div className="d-flex flex-column gap-3">
          {sortedTickets.map((ticket) => {
            const benefits = ticketBenefits.filter(
              (b) => b.ticket_id === ticket.ticket_id
            );

            return (
              <div
                key={ticket.ticket_id}
                className="d-flex justify-content-between align-items-center bg-light rounded-4 px-3 py-3"
              >
                {/* LEFT */}
                <div>
                  <div className="fw-semibold fs-6 text-grey-100">
                    {ticket.ticket_name} Package
                  </div>

                  <div className="text-grey-80 fw-regular small d-flex gap-3 mt-1">
                    <span className="fs-body-sm fw-regular text-grey-80"><CheckCircle size={12} className="text-grey-50 me-1" style={{ marginBottom: 2 }} />
                      {ticket.access_type === "seating"
                        ? "Seating"
                        : "Standing"}
                    </span>

                    {benefits.length > 0 && (
                      <span className="fs-body-sm fw-regular text-grey-80"><CheckCircle size={12} className="text-grey-50" style={{ marginBottom: 2 }} /> {benefits[0].benefit}</span>
                    )}
                  </div>
                </div>

                {/* RIGHT */}
                <div className="fw-medium fs-6 text-primary-100">
                  ${ticket.price}
                </div>
              </div>
            );
          })}
        </div>
      </Card.Body>
    </Card>
  );
}

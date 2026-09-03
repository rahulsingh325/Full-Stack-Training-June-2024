"use client";

import { Card } from "react-bootstrap";
import { MoreVertical } from "lucide-react";

export default function StatsCard({ icon: Icon, label, value }) {
  return (
    <Card className="border-0 shadow-sm rounded-4">
      <Card.Body className="d-flex flex-row flex-md-column align-items-center align-items-md-start gap-3 p-3 p-md-4 position-relative">

        {/* ICON */}
        <div
          className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
          style={{
            width: 48,
            height: 48,
            backgroundColor: "#F26CF9",
            color: "#fff",
          }}
        >
          <Icon size={22} strokeWidth={2} />
        </div>

        {/* TEXT */}
        <div className="flex-grow-1">
          <p className="text-grey-30 fs-body-sm fw-regular mb-1 small">{label}</p>
          <h5 className="fw-semibold text-secondary-100 mb-0">{value}</h5>
        </div>

        {/* MENU */}
        <button
          className="btn btn-light p-1 position-absolute position-md-static top-0 end-0 mt-2 me-2 mt-md-0 me-md-0"
        >
          <MoreVertical size={18} />
        </button>

      </Card.Body>
    </Card>
  );
}

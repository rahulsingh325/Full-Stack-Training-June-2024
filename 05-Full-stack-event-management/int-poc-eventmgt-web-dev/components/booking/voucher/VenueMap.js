"use client";

import { Card, Row, Col } from "react-bootstrap";

/* ---------- STATIC LEGEND (UI BASED) ---------- */
const FRONTEND_LEGEND = [
  { label: "Parking Area", color: "#2D3A8C" },
  { label: "Security Checkpoints", color: "#1E88E5" },
  { label: "Kid’s Zone", color: "#FBC02D" },
  { label: "General Admission Area", color: "#5E35B1" },
  { label: "Information Booth", color: "#90CAF9" },
  { label: "Restrooms", color: "#AB47BC" },
  { label: "Merchandise Booths", color: "#EC407A" },
  { label: "Food & Beverage Area", color: "#F8BBD0" },
  { label: "Art Installations Zone", color: "#CE93D8" },
  { label: "VIP Lounge", color: "#FFE082" },
  { label: "First Aid Station", color: "#FDD835" },
  { label: "Main Stage", color: "#E0E0E0" },
];

export default function VenueMap({ venueMap }) {
  /* ================= SAFE GUARD ================= */
  if (
    !venueMap ||
    typeof venueMap !== "object" ||
    Object.keys(venueMap).length === 0
  ) {
    return null;
  }

  const mapImageUrl =
    venueMap.map_image_url ||
    venueMap.venue_map_url ||
    venueMap.map_image ||
    null;

  return (
    <Card className="border-0 shadow-sm rounded-4 p-4">
      {/* ---------- HEADER ---------- */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-semibold mb-0">
          Venue Map
        </h6>
        <button className="btn btn-light btn-sm rounded-circle">
          •••
        </button>
      </div>

      <Row className="g-3">
        {/* ---------- MAP IMAGE ---------- */}
        <Col xs={12}>
          <div
            className="rounded-4 overflow-hidden bg-light"
            style={{
              width: "100%",
              aspectRatio: "16 / 9",
              maxHeight: 320,
            }}
          >
            {mapImageUrl ? (
              <img
                src={mapImageUrl}
                alt="Venue Map"
                className="w-100 h-100"
                style={{
                  objectFit: "contain",
                }}
                onError={e => {
                  e.currentTarget.style.display =
                    "none";
                }}
              />
            ) : (
              <div className="d-flex align-items-center justify-content-center h-100 text-muted">
                Venue map not available
              </div>
            )}
          </div>
        </Col>

        {/* ---------- LEGEND ---------- */}
        <Col xs={12}>
          <div className="fw-medium mb-3">
            Legend
          </div>

          <Row className="g-2">
            {FRONTEND_LEGEND.map(
              (item, index) => (
                <Col
                  lg={4}
                  md={6}
                  sm={6}
                  key={index}
                >
                  <div className="d-flex align-items-center gap-2 small">
                    <span
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor:
                          item.color,
                        flexShrink: 0,
                      }}
                    />
                    <span>{item.label}</span>
                  </div>
                </Col>
              )
            )}
          </Row>
        </Col>
      </Row>
    </Card>
  );
}

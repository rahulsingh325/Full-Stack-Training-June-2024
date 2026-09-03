"use client";

import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";

export default function OfficialMerchandiseCard({ items = [] }) {
  if (!items.length) return null;

  return (
    <Card className="border-0 shadow-sm rounded-4 mb-4">

      {/* HEADER */}
      <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center px-4 pt-4">
        <h6 className="fw-semibold mb-0">Official Merchandise</h6>

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

        {/* MOBILE : HORIZONTAL SCROLL (RIGHT SIDE CARDS) */}
        <div className="d-flex gap-3 overflow-auto d-lg-none hide-scrollbar">
          {items.map((item, index) => (
            <div
              key={item.merchandise_id || index}
              style={{ minWidth: 220 }}
            >
              <MerchCard item={item} />
            </div>
          ))}
        </div>

        {/*  DESKTOP : GRID */}
        <div className="row g-3 d-none d-lg-flex">
          {items.map((item, index) => (
            <div key={item.id || index} className="col-md-4">
              <MerchCard item={item} />
            </div>
          ))}
        </div>

      </Card.Body>
    </Card>
  );
}

/* =========================
   MERCH CARD UI
========================= */
function MerchCard({ item }) {
  return (
    <div className="rounded-4 overflow-hidden bg-light h-100">

      {/* IMAGE */}
      <div
        style={{
          height: 160,
          backgroundColor: "#e5e7eb",
          backgroundImage: item.image_url
            ? `url(${item.image_url})`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* INFO */}
      <div className="p-3 bg-cool-grey-10 text-center">
        <div className="fw-medium">
          {item.name}
        </div>

        <div className="fw-semibold text-primary-100 mt-1">
          USD ${item.price}
        </div>
      </div>

    </div>
  );
}

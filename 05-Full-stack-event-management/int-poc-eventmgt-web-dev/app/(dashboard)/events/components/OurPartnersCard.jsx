"use client";

import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";

export default function OurPartnersCard({ partners = [] }) {
  if (!partners.length) return null;

  return (
    <Card className="border-0 shadow-sm rounded-4 mb-4">
      <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center px-4 pt-4">
        <h6 className="fw-semibold mb-0">Our Partners</h6>

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
        <div className="row g-4 align-items-center">
          {partners.map((partner, index) => (
            <div
               key={partner.partner_id || index}
              className="col-6 col-md-3 d-flex justify-content-center"
            >
              <img
                src={partner.logo_url}
                alt={partner.name}
                style={{
                  maxHeight: 40,
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
}

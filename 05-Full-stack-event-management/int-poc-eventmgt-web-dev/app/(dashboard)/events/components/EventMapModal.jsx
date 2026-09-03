"use client";

import { Modal, Button } from "react-bootstrap";
import { MapPin, Car, Train, Bus, ExternalLink } from "lucide-react";

export default function EventMapModal({ show, onHide, location }) {
  if (!location) return null;

  const hasMapLink = Boolean(location.map?.map_link);

  //  FIX: object existence check
  const hasGettingThere = Boolean(location.getting_there);

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="d-flex align-items-center gap-2">
          <MapPin size={18} />
          Location Details
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* LOCATION INFO */}
        <div className="mb-3">
          <div className="mb-2">
            <div className="text-dark fw-medium">Location</div>
            <span className="text-muted small">
              {location.venue_name}, {location.city}, {location.state}
            </span>
          </div>

          <div>
            <div className="text-dark fw-medium">Address</div>
            <span className="text-muted small">
              {location.full_address || "Address not available"}
            </span>
          </div>
        </div>

        {/* MAP */}
        {hasMapLink ? (
          <div className="rounded overflow-hidden mb-3">
            <iframe
              src={location.map.map_link}
              width="100%"
              height="280"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>
        ) : (
          <div
            className="bg-light rounded d-flex align-items-center justify-content-center text-muted mb-3"
            style={{ height: 280 }}
          >
            Map preview not available
          </div>
        )}

        {/* GETTING THERE (FINAL FIX) */}
        {hasGettingThere && (
          <div className="small">
            <div className="fw-medium mb-2">Getting There</div>

            {location.getting_there.by_car && (
              <div className="d-flex align-items-start gap-2 mb-2">
                <Car size={16} className="text-muted mt-1" />
                <span>
                  <strong>By Car:</strong>{" "}
                  {location.getting_there.by_car}
                </span>
              </div>
            )}

            {location.getting_there.by_metro && (
              <div className="d-flex align-items-start gap-2 mb-2">
                <Train size={16} className="text-muted mt-1" />
                <span>
                  <strong>By Metro:</strong>{" "}
                  {location.getting_there.by_metro}
                </span>
              </div>
            )}

            {location.getting_there.by_bus && (
              <div className="d-flex align-items-start gap-2">
                <Bus size={16} className="text-muted mt-1" />
                <span>
                  <strong>By Bus:</strong>{" "}
                  {location.getting_there.by_bus}
                </span>
              </div>
            )}
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        {hasMapLink && (
          <Button
            variant="outline-primary"
            href={location.map.map_link}
            target="_blank"
            className="d-flex align-items-center gap-1"
          >
            Open in Google Maps
            <ExternalLink size={14} />
          </Button>
        )}

        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

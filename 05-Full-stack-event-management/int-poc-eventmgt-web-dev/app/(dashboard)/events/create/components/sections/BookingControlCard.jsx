"use client";

import { Card, Form, Row, Col, Badge } from "react-bootstrap";
import { useFormContext, useWatch } from "react-hook-form";

export default function BookingControlCard() {
  const { register, control } = useFormContext();

  const eventStatus = useWatch({ control, name: "event_status" });
  const bookingStatus = useWatch({ control, name: "booking.status" });

  const bookingDisabled = eventStatus !== "published";

  return (
    <Card className="p-3 mt-4">
      <h6 className="fw-semibold mb-2">Booking Control</h6>

      {/* EVENT STATUS INFO */}
      <div className="mb-3">
        <span className="me-2">Event Status:</span>
        <Badge bg={eventStatus === "published" ? "success" : "secondary"}>
          {eventStatus || "draft"}
        </Badge>
      </div>

      {/* BOOKING STATUS */}
      <Form.Group className="mb-3">
        <Form.Label>Booking Status</Form.Label>
        <Form.Select
          {...register("booking.status")}
          disabled={bookingDisabled}
        >
          <option value="inactive">Inactive</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="closed">Closed</option>
        </Form.Select>

        {bookingDisabled && (
          <div className="text-muted small mt-1">
            Publish event to enable booking
          </div>
        )}
      </Form.Group>

      {/* BOOKING DATES */}
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Booking Open At</Form.Label>
            <Form.Control
              type="datetime-local"
              {...register("booking.open_at")}
              disabled={bookingDisabled}
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Booking Close At</Form.Label>
            <Form.Control
              type="datetime-local"
              {...register("booking.close_at")}
              disabled={bookingDisabled}
            />
          </Form.Group>
        </Col>
      </Row>

      <div className="small text-muted">
        • Leave dates empty for manual booking control  
        <br />
        • Booking works only when event is published
      </div>
    </Card>
  );
}

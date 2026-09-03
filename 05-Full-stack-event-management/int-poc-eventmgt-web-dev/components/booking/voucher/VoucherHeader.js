"use client";

import { Card, Row, Col } from "react-bootstrap";
import { formatDate, formatTime } from "@/utils/dateTime";
import TicketBarcode from "./Barcode";

export default function VoucherHeader({ data = {} }) {
  const { voucher = {}, tickets = [], artists = [] } = data;
  
  /* ================= EVENT DATE & TIME ================= */
  const eventDate = voucher?.agenda_date
    ? formatDate(voucher.agenda_date)
    : "—";

  const eventTime =
    voucher?.start_time && voucher?.end_time
      ? `${formatTime(voucher.start_time)} - ${formatTime(
        voucher.end_time
      )}`
      : "—";

  /* ================= TICKET ================= */
  const firstTicket =
    Array.isArray(tickets) && tickets.length > 0
      ? tickets[0]
      : null;


  const artistNames =
    Array.isArray(artists) && artists.length > 0
      ? artists
        .map(a => a.artist_name)
        .filter(Boolean)
        .join(", ")
      : null;


  /* ================= LOCATION ================= */
  const locationText = voucher?.location || "—";

  /* ================= CUSTOMER NAME ================= */
  const customerName =
    voucher?.customer_name || "—";

  /* ================= EVENT IMAGE ================= */
  const bannerImage =
    voucher?.banner_image_url || null;

  /* ================= EVENT NAME ================= */
  const eventName =
    voucher?.event_name || "—";

  return (
    <Card className="border-0 shadow-sm rounded-4 p-3 mb-4">
      <Row
        className="g-3 align-items-stretch"
        style={{
          background: "#F4F5FB",
          borderRadius: 16,
        }}
      >
        {/* ================= LEFT : EVENT IMAGE ================= */}
        <Col lg={4}>
          <div
            className="h-100 rounded-4 text-white d-flex flex-column justify-content-end p-3"
            style={{
              minHeight: 190,
              backgroundImage: bannerImage
                ? `linear-gradient(
            to top,
            rgba(24,29,56,0.85),
            rgba(24,29,56,0.25)
          ), url(${bannerImage})`
                : "linear-gradient(135deg, #E6E8F2, #F4F5FB)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h5 className="fw-semibold mb-1">
              {eventName}
            </h5>

            {artistNames && (
              <div
                className="small fs-body-sm fw-regular"
                style={{ opacity: 0.9 }}
              >
                {artistNames}
              </div>
            )}
          </div>
        </Col>

        {/* ================= MIDDLE : DETAILS ================= */}
        <Col lg={5}>
          <div className="h-100 rounded-4 bg-white p-3">
            <Row className="g-3 small">
              <InfoItem
                label="Name"
                value={customerName}
              />

              <InfoItem
                label="Voucher Code"
                value={voucher?.voucher_code}
              />

              <InfoItem
                label="Ticket Category"
                value="General Admission"
                col={4}
              />

              <InfoItem
                label="Seat Number"
                value="Open Seating"
                col={4}
              />

              <InfoItem
                label="Gate Opens"
                value={
                  firstTicket?.gate_open_time
                    ? formatTime(
                      firstTicket.gate_open_time
                    )
                    : "—"
                }
                col={4}
              />

              <Col xs={12}>
                <hr className="my-2" />
              </Col>

              <InfoItem
                label="Location"
                value={locationText}
                col={12}
              />

              <InfoItem
                label="Date"
                value={eventDate}
              />
              <InfoItem
                label="Time"
                value={eventTime}
              />
            </Row>
          </div>
        </Col>

        {/* ================= RIGHT : BARCODE ================= */}
        <Col lg={3}>
          <div className="h-100 rounded-4 bg-white d-flex flex-column justify-content-center align-items-center p-3 text-center">
            <div className="fw-semibold mb-2">
              Scan to Enter
            </div>

            <TicketBarcode
              value={String(
                voucher?.voucher_code || ""
              )}
            />

            <p className="small text-muted mt-3 mb-0">
              Thank you for your purchase! <br />
              Enjoy the festival and experience
              the rhythm like never before.
            </p>
          </div>
        </Col>
      </Row>
    </Card>
  );
}

/* ================= INFO ITEM ================= */
function InfoItem({ label, value, col = 6 }) {
  return (
    <Col xs={12} sm={col}>
      <div className="text-muted mb-1">
        {label}
      </div>
      <div className="fw-medium">
        {value || "—"}
      </div>
    </Col>
  );
}

"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  Table,
  Badge,
  Button,
  Spinner,
} from "react-bootstrap";
import PaginationFooter from "../pagination/PaginationFooter";

/* ---------------- STATUS MAP ---------------- */
const statusMap = {
  confirmed: { label: "Confirmed", variant: "success" },
  initiated: { label: "Pending", variant: "warning" },
  cancelled: { label: "Cancelled", variant: "danger" },
  expired: { label: "Expired", variant: "secondary" },
};

/* -------- SAFE VALUE HELPER -------- */
const safe = (val) =>
  val === null || val === undefined || val === "" ? "—" : val;

export default function BookingsTable({
  data = [],
  loading = false,

  /* PAGINATION (SERVER SIDE) */
  page,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
}) {
  const router = useRouter();

  return (
    <Card className="rounded-4 border-0">
      <Card.Body>

        {/* ===== LOADING ===== */}
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" />
          </div>
        ) : (
          <>
            <div
              className="custom-scroll"
              style={{
                maxHeight: "490px",
                overflowY: "auto",
              }}
            >


              {/* ===== TABLE ===== */}
              <Table responsive hover className="align-middle mb-0 table-nowrap">
                <thead className="table-light">
                  <tr>
                    <th className="fw-regular fs-11 text-grey-70">Invoice ID</th>
                    <th className="fw-regular fs-11 text-grey-70">Date</th>
                    <th className="fw-regular fs-11 text-grey-70">Name</th>
                    <th className="fw-regular fs-11 text-grey-70">Event</th>
                    <th className="fw-regular fs-11 text-grey-70">
                      Ticket Category
                    </th>
                    <th className="fw-regular fs-11 text-grey-70">Price</th>
                    <th className="fw-regular fs-11 text-grey-70">Qty</th>
                    <th className="fw-regular fs-11 text-grey-70">Amount</th>
                    <th className="fw-regular fs-11 text-grey-70">Status</th>
                    <th className="fw-regular fs-11 text-grey-70">E-Voucher</th>
                    <th className="fw-regular fs-11 text-grey-70 text-end">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {data.length === 0 ? (
                    <tr>
                      <td colSpan={11} className="text-center text-muted py-4">
                        No bookings found
                      </td>
                    </tr>
                  ) : (
                    data.map((b, index) => {
                      const rowKey =
                        b.booking_item_id ??
                        `${b.booking_id}-${b.ticket_category}-${index}`;

                      const statusUI =
                        statusMap[b.status] || {
                          label: b.status,
                          variant: "secondary",
                        };

                      return (
                        <tr key={rowKey}>
                          {/* Invoice ID */}
                          <td
                            className="fw-regular fs-body-sm text-primary"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              if (!b.invoice_id) return;
                              router.push(
                                `/invoices?invoice_id=${b.invoice_id}`
                              );
                            }}
                          >
                            {safe(b.invoice_no)}
                          </td>

                          {/* Date */}
                          <td className="fw-regular fs-body-sm text-grey-100">
                            {b.booking_date
                              ? new Date(b.booking_date).toLocaleDateString()
                              : "—"}
                          </td>

                          {/* Name */}
                          <td className="fw-regular fs-body-sm text-grey-100">
                            {safe(b.customer_name)}
                          </td>

                          {/* Event */}
                          <td className="fw-regular fs-body-sm text-grey-100">
                            {safe(b.event_name)}
                            <br />
                            <small>{safe(b.category)}</small>
                          </td>

                          {/* Ticket Category */}
                          <td className="fw-regular fs-body-sm text-grey-100">
                            {safe(b.ticket_category)}
                          </td>

                          {/* Price */}
                          <td className="fw-regular fs-body-sm text-grey-100">
                            ${safe(b.price)}
                          </td>

                          {/* Qty */}
                          <td className="fw-regular fs-body-sm text-grey-100">
                            {safe(b.qty)}
                          </td>

                          {/* Amount */}
                          <td className="fw-regular fs-body-sm text-grey-100">
                            ${safe(b.amount)}
                          </td>

                          {/* Status */}
                          <td>
                            <Badge bg={statusUI.variant}>
                              {statusUI.label}
                            </Badge>
                          </td>


                          <td className="fw-regular fs-body-sm text-grey-700">
                            {b.status === "confirmed" && b.voucher_code ? (
                              <span
                                role="button"
                                className="cursor-pointer text-primary"
                                onClick={() =>
                                  router.push(
                                    `/vouchers/details/${b.voucher_code}`
                                  )
                                }
                              >
                                {b.voucher_code}
                              </span>
                            ) : (
                              "—"
                            )}
                          </td>


                          {/* Action */}
                          <td className="text-end">
                            <Button
                              size="sm"
                              variant="outline-primary"
                              onClick={() =>
                                router.push(`/bookings/${b.booking_id}`)
                              }
                            >
                              View
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </Table>

              {/* ===== PAGINATION (TABLE KE NICHE) ===== */}
              {data.length > 0 && totalPages > 1 && (
                <PaginationFooter
                  page={page}
                  totalPages={totalPages}
                  pageSize={pageSize}
                  totalItems={totalItems}
                  pageSizeOptions={[5, 8, 10, 20]}
                  onPageChange={onPageChange}
                  onPageSizeChange={onPageSizeChange}
                />
              )}
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

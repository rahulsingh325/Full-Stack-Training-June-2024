"use client";

import { useState } from "react";
import { Card } from "react-bootstrap";
import {
  MoreHorizontal,
  Calendar,
  CheckCircle,
  AlertOctagon,
} from "lucide-react";

import SearchInput from "../common/SearchInput";
import FilterTrigger from "../common/FilterTrigger";

export default function InvoiceList({
  invoices = [],
  selectedId = null,
  onSelect = () => {},
}) {
  const [search, setSearch] = useState("");

  /* -------- SEARCH FILTER -------- */
  const filteredInvoices = invoices.filter((invoice) =>
    invoice.invoice_no
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <Card className="border-0 shadow-sm rounded-4">
      <Card.Body className="p-4">
        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-semibold mb-0">Invoice List</h6>
          <button className="btn btn-light btn-sm rounded-circle">
            <MoreHorizontal size={16} />
          </button>
        </div>

        {/* SEARCH + FILTER + ADD */}
        <div className="d-flex align-items-center gap-2 mb-4">
          <div className="flex-grow-1">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search invoice"
              showIcon
            />
          </div>

          {/* <FilterTrigger onOpen={() => console.log("open filters")} /> */}

          {/* <button className="btn bg-primary-100 text-grey-10 fs-body-sm rounded-pill px-3">
            Add
          </button> */}
        </div>

        {/* LIST */}
        <div className="d-flex flex-column gap-2">
          {filteredInvoices.length === 0 ? (
            <div className="text-center text-muted py-3">
              No invoices found
            </div>
          ) : (
            filteredInvoices.map((invoice) => {
              const isActive =
                invoice.invoice_id === selectedId;
              const isPaid =
                invoice.status === "paid";

              return (
                <div
                  key={invoice.invoice_id}
                  onClick={() => onSelect(invoice)}
                  className={`rounded-4 p-3 ${
                    isActive ? "border border-primary" : ""
                  }`}
                  style={{
                    background: isActive
                      ? "#FFF5FF"
                      : "#F9FAFB",
                    cursor: "pointer",
                  }}
                >
                  <div className="d-flex justify-content-between align-items-start">
                    {/* LEFT */}
                    <div>
                      <div className="fw-semibold">
                        {invoice.invoice_no || "—"}
                      </div>

                      <div className="text-muted small d-flex align-items-center gap-1 mt-1">
                        <Calendar size={14} />
                        {invoice.invoice_date
                          ? new Date(
                              invoice.invoice_date
                            ).toLocaleDateString()
                          : "—"}
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div className="text-end">
                      <div className="fw-semibold text-primary">
                        ${invoice.total_amount ?? "—"}
                      </div>

                      <span
                        className={`badge rounded-pill mt-1 d-inline-flex align-items-center gap-1 ${
                          isPaid
                            ? "bg-success-subtle text-success"
                            : "bg-secondary-subtle text-secondary"
                        }`}
                      >
                        {isPaid ? (
                          <CheckCircle size={14} />
                        ) : (
                          <AlertOctagon size={14} />
                        )}
                        {isPaid ? "Paid" : "Unpaid"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Card.Body>
    </Card>
  );
}


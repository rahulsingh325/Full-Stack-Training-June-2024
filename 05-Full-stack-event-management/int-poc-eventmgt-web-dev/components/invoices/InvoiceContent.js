"use client";

import { useEffect, useState } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import { useSearchParams } from "next/navigation";
import api from "@/helper/api";

import InvoiceList from "./InvoiceList";
import InvoiceDetails from "./InvoiceDetails";
import InvoiceStats from "./InvoiceStats";
import { mapInvoiceDetails } from "@/adapters/invoice.adapter";
import usePagination from "@/hooks/usePagination";

export default function InvoiceContent() {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [stats, setStats] = useState(null);

  const searchParams = useSearchParams();
  const invoiceIdFromQuery = searchParams.get("invoice_id");

  /* ================= FETCH LIST ================= */
  useEffect(() => {
    fetchInvoiceList();
  }, []);

  const fetchInvoiceList = async () => {
    try {
      const res = await api.get("/invoices/list");
      const items = res.data?.items || [];

      setInvoices(items);
      setStats(calculateStats(items));

      // auto select first invoice
      if (items.length > 0) {
        fetchInvoiceDetails(items[0].invoice_id);
      }
    } catch (e) {
      console.error("Invoice list error", e);
    }
  };

  /* ================= PAGINATION ================= */
  const {
    page,
    totalPages,
    range,
    goToPage,
  } = usePagination({
    totalItems: invoices.length,
    initialPageSize: 6,
  });

  const paginatedInvoices = invoices.slice(
    range.start,
    range.end
  );

  /* ================= FETCH DETAILS ================= */
  const fetchInvoiceDetails = async (invoiceId) => {
    if (!invoiceId) return;

    try {
      setLoadingDetails(true);

      const res = await api.get(
        `/invoices/details/${invoiceId}`
      );

      const mappedInvoice = mapInvoiceDetails(res.data);
      setSelectedInvoice(mappedInvoice);
    } catch (e) {
      console.error("Invoice details error", e);
      setSelectedInvoice(null);
    } finally {
      setLoadingDetails(false);
    }
  };

  /* ================= QUERY PARAM SELECT ================= */
  useEffect(() => {
    if (invoiceIdFromQuery && invoices.length > 0) {
      fetchInvoiceDetails(invoiceIdFromQuery);
    }
  }, [invoiceIdFromQuery, invoices]);

  /* ================= STATS ================= */
  const calculateStats = (items) => ({
    paid: {
      count: items.filter(
        (i) => i.status === "paid"
      ).length,
      lastMonth: 0,
    },

    unpaid: {
      count: items.filter(
        (i) => i.status === "draft"
      ).length,
      lastMonth: 0,
    },

    overdue: {
      count: items.filter(
        (i) => i.status === "overdue"
      ).length,
      lastMonth: 0,
    },
  });

  return (
    <Row>
      {/* LEFT */}
      <Col xl={5}>
        <InvoiceStats stats={stats} />

        <InvoiceList
          invoices={paginatedInvoices}
          selectedId={selectedInvoice?.invoice_id}
          onSelect={(inv) =>
            fetchInvoiceDetails(inv.invoice_id)
          }
        />

        {/* PAGINATION CONTROLS */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-between align-items-center mt-3 px-2">
            <button
              className="btn btn-sm btn-light"
              disabled={page === 1}
              onClick={() => goToPage(page - 1)}
            >
              Prev
            </button>

            <span className="small text-muted">
              Page {page} of {totalPages}
            </span>

            <button
              className="btn btn-sm btn-light"
              disabled={page === totalPages}
              onClick={() => goToPage(page + 1)}
            >
              Next
            </button>
          </div>
        )}
      </Col>

      {/* RIGHT */}
      <Col xl={7}>
        {loadingDetails ? (
          <div className="text-center py-5">
            <Spinner />
          </div>
        ) : (
          <InvoiceDetails
            invoice={selectedInvoice}
            onRefresh={() =>
              fetchInvoiceDetails(
                selectedInvoice?.invoice_id
              )
            }
          />
        )}
      </Col>
    </Row>
  );
}

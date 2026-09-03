"use client";

import {
  ChevronLeft,
  ChevronRight,
  Download,
  Edit,
} from "lucide-react";
import { Card, Row, Col, Badge, Button } from "react-bootstrap";
import { useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { formatDate } from "@/utils/dateTime";
import EditInvoiceModal from "./EditInvoiceModal";
import { formatCurrency } from "@/utils/formatCurrency";


/* ---------- SAFE RENDER ---------- */
const safe = (v) =>
  v === null || v === undefined || v === "" ? "—" : v;

/* ---------- STATUS BADGE ---------- */
const StatusBadge = ({ status }) => {
  const label =
    status === "draft"
      ? "Unpaid"
      : status === "paid"
        ? "Paid"
        : status === "overdue"
          ? "Overdue"
          : safe(status);

  const map = {
    paid: "success",
    draft: "secondary",
    sent: "primary",
    hold: "warning",
    overdue: "danger",
  };



  return (
    <Badge
      bg={map[status] || "secondary"}
      className="rounded-pill px-3 py-2 text-capitalize"
    >
      {label}
    </Badge>
  );
};


function isExpiredInvoice(status, due_date) {
  if (status === "paid") return false;
  if (!due_date) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(due_date);
  if (isNaN(due)) return false;

  due.setHours(0, 0, 0, 0);

  return due < today;
}




export default function InvoiceDetails({ invoice, onRefresh }) {
  const [showEdit, setShowEdit] = useState(false);
  const [downloading, setDownloading] = useState(false);

  if (!invoice) {
    return (
      <Card className="rounded-4 border h-100 d-flex align-items-center justify-content-center">
        <span className="text-muted">
          Select an invoice to view details
        </span>
      </Card>
    );
  }



  const {
    invoice_id,
    invoice_no,
    status,
    invoice_date,
    due_date,
    is_locked,

    bill_from = {},
    bill_to = {},
    items = [],

    sub_total,
    tax_amount,
    fee_amount,
    total_amount,
    note,
  } = invoice;

  const expired = isExpiredInvoice(status, due_date);


  /* ================= PDF DOWNLOAD ================= */
  const downloadPdf = async () => {
    try {
      setDownloading(true);

      const element = document.getElementById("invoice-print");

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${invoice_no || invoice_id}.pdf`);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <Card className="rounded-4 p-4 border-0 h-100">
        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center px-4">
          <h5 className="fw-bold mb-0">Invoice Details</h5>

          <div className="d-flex gap-2 py-2">
            <Button
              variant="outline-grey-50"
              size="sm"
              className="rounded-pill px-3 invoice-btn"
              disabled={is_locked || expired}
              onClick={() => {
                if (expired) return;
                setShowEdit(true);
              }}
            >
              <Edit size={14} />
              <span className="btn-text ms-1">Edit Invoice</span>
            </Button>

            <Button
              size="sm"
              variant="outline-secondary"
              className="rounded-pill invoice-btn"
              onClick={downloadPdf}
              disabled={downloading}
            >
              <Download size={14} />
              <span className="btn-text ms-1">
                {downloading ? "Downloading..." : "Download"}
              </span>
            </Button>

          </div>
        </div>

        {/* ================= PDF AREA ================= */}
        <Card.Body
          id="invoice-print"
          className="pt-6 bg-grey-20 rounded-4"
        >
          <Card className="p-lg-8 p-4 bg-grey-10 rounded-4">
            <div className="invoice-top-accent rounded-4" />

            {/* INVOICE HEADER */}
            <div className="d-flex justify-content-between flex-wrap mb-4">
              <div>
                <h3 className="fw-bold mb-2 invoice-title">
                  <span className="text-cool-grey-50 me-1">#</span>
                  <span className="text-secondary-100">
                    {safe(invoice_no || invoice_id)}
                  </span>
                </h3>


                <div className="d-flex gap-2 flex-wrap mb-2">
                  <StatusBadge status={status} />

                  {expired && (
                    <Badge bg="danger" className="rounded-pill px-3 py-2">
                      Expired
                    </Badge>
                  )}
                </div>

              </div>

              <div className="text-start text-sm-end small text-muted">
                <div>
                  Issued Date{" "}
                  <strong className="text-dark">
                    {formatDate(invoice_date)}
                  </strong>
                </div>
                {due_date && (
                  <div>
                    Due Date{" "}
                    <strong className="text-dark">
                      {formatDate(due_date)}
                    </strong>
                  </div>
                )}
              </div>
            </div>

            {/* BILL FROM / TO */}
            <Row className="mb-4">
              <Col md={6}>
                <small className="text-grey-60 fs-body-sm">Bill From</small>
                <p className="fw-semibold mt-1 mb-1">
                  {safe(bill_from.name)}
                </p>
                <small className="d-block">{safe(bill_from.address)}</small>
                <small className="d-block">{safe(bill_from.email)}</small>
                <small className="d-block">{safe(bill_from.phone)}</small>
              </Col>

              <Col md={6} className="text-md-end mt-4 mt-md-0">
                <small className="text-muted">Bill To</small>
                <p className="fw-semibold mt-1 mb-1">
                  {safe(bill_to.name)}
                </p>
                <small className="d-block">{safe(bill_to.address)}</small>
                <small className="d-block">{safe(bill_to.email)}</small>
                <small className="d-block">{safe(bill_to.phone)}</small>
              </Col>
            </Row>

            {/* ITEMS TABLE */}
            <div className="border rounded-4 p-4 bg-white mb-4">
              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Ticket</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th className="text-end">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((t, i) => (
                      <tr key={i}>
                        <td>{safe(t.ticket_name)}</td>
                        <td>{formatCurrency(t.price)}</td>
                        <td>{safe(t.quantity)}</td>
                        <td className="text-end">
                          {formatCurrency(t.line_total)}
                        </td>
                      </tr>
                    ))}

                    <tr>
                      <td colSpan={3}>Sub Total</td>
                      <td className="text-end">
                        {formatCurrency(sub_total)}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}>Tax</td>
                      <td className="text-end">
                        {formatCurrency(tax_amount)}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}>Fee</td>
                      <td className="text-end">
                        {formatCurrency(fee_amount)}
                      </td>
                    </tr>
                    <tr className="fw-bold">
                      <td colSpan={3}>Total</td>
                      <td className="text-end">
                        {formatCurrency(total_amount)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* NOTE */}
            <small className="text-muted">Note</small>
            <p className="small mb-0">
              {note || "Please make payment before the due date."}
            </p>
          </Card>
        </Card.Body>
      </Card>

      <EditInvoiceModal
        show={showEdit}
        onClose={() => setShowEdit(false)}
        invoice={invoice}
        onSuccess={onRefresh}
      />
    </>
  );
}

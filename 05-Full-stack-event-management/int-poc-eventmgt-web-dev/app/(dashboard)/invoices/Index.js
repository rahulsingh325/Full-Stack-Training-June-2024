"use client";

import { Container } from "react-bootstrap";
import InvoiceContent from "@/components/invoices/InvoiceContent";

export default function Index() {
  return (
    <Container fluid className="py-4">
      <InvoiceContent />
    </Container>
  );
}


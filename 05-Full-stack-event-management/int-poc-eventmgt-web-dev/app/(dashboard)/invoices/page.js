import { Suspense } from "react";
import Index from "./Index";
import { Container } from "react-bootstrap";

export default function InvoicesPage() {
  return (
    <>
      <Container fluid className="p-lg-6 p-3 bg-grey-20 rounded-4">
        <Suspense fallback={<div>Loading invoices...</div>}>
          <Index />
        </Suspense>
      </Container>
    </>
  );
}

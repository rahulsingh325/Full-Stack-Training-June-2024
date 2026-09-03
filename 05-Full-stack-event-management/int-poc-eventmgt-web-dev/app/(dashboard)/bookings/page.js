import Header from "@/components/Header";
import Index from "./Index";
import { Container } from "react-bootstrap";

export default function BookingsPage() {
  return (
    <>
      {/* <Header
        title="Bookings"
        breadcrumb="Dashboard / Bookings"
        showSearch={true}
      /> */}

      <Container fluid className="p-lg-6 p-3 bg-grey-20 rounded-4">
        <Index />
      </Container>
    </>
  );
}

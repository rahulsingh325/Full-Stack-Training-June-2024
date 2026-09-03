import { Container } from "react-bootstrap";
import Index from "./Index";
import Header from "@/components/Header";

export default function EventsPage() {
  return (
    <>
      {/* <Header
        title="Events"
        breadcrumb="Dashboard / Events"
      /> */}

      <Container fluid className="p-lg-6 p-3 bg-grey-20 rounded-4">
        <Index />
      </Container>
    </>

  );
}

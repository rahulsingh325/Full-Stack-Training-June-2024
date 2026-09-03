import { Container } from "react-bootstrap";
import Index from "./Index";


export default function DashboardPage() {
  return (
    <>
      <Container fluid className="p-lg-6 p-3 bg-grey-20 rounded-4">
        <Index />
      </Container>
    </>

  );
}

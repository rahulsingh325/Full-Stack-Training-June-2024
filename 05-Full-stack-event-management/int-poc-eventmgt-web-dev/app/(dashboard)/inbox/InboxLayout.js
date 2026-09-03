"use client";

import { Container, Row, Col } from "react-bootstrap";
import { useInbox } from "@/context/InboxContext";
import InboxSidebar from "@/components/inbox/InboxSidebar";
import MailList from "@/components/inbox/MailList";
import MailDetailsContainer from "@/components/inbox/MailDetailsContainer";
import { useEffect, useState } from "react";

export default function InboxLayout() {
  const { selectedMailId, showSidebar, setShowSidebar } = useInbox();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1200);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <Container fluid className="bg-grey-20 rounded-4 p-6">
      <Row className="g-4" style={{ minHeight: "70vh" }}>

        {/* ================= SIDEBAR (DESKTOP) ================= */}
        {isDesktop && (
          <Col xl={2}>
            <InboxSidebar />
          </Col>
        )}

        {/* ================= MAIL LIST ================= */}
        {(!selectedMailId || isDesktop) && (
          <Col xl={4} xs={12}>
            <div className="bg-grey-10 rounded-4 h-100 p-3">
              <MailList />
            </div>
          </Col>
        )}

        {/* ================= MAIL DETAILS ================= */}
        {selectedMailId && (
          <Col xl={6} xs={12}>
            <div className="bg-grey-10 rounded-4 h-100 p-4">
              <MailDetailsContainer />
            </div>
          </Col>
        )}
      </Row>

      {/* ================= MOBILE SIDEBAR OVERLAY ================= */}
      {!isDesktop && showSidebar && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-25"
          style={{ zIndex: 1050 }}
          onClick={() => setShowSidebar(false)}
        >
          <div
            className="bg-white h-100 p-3"
            style={{ width: 260 }}
            onClick={(e) => e.stopPropagation()}
          >
            <InboxSidebar />
          </div>
        </div>
      )}
    </Container>
  );
}

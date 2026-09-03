"use client";

import { Container, Row, Col, Card } from "react-bootstrap";
import { useNotification } from "@/context/NotificationContext";
import RecentActivity from "@/components/dashboard/RecentActivity";

export default function ActivityPage() {
  const { recentActivity } = useNotification();

  return (
    <Container fluid className="dashboard-wrapper py-4">
      <Row className="justify-content-center">
        {/* Left space + Center content + Right space */}
        <Col xl={12} lg={7} md={9} sm={12}>

          <Card className="border-0 shadow-sm rounded-4 p-4">
            {/* ================= HEADER ================= */}
            <div className="mb-4">
              <h4 className="fw-semibold mb-1">All Activity</h4>
              <div className="text-muted small">
                Complete history of recent actions
              </div>
            </div>

            <hr className="my-3" />

            {/* ================= ACTIVITY LIST ================= */}
            {recentActivity && recentActivity.length > 0 ? (
              <RecentActivity data={recentActivity} limit={null} />
            ) : (
              <div className="text-center text-muted py-5">
                No activity found
              </div>
            )}
          </Card>

        </Col>
      </Row>
    </Container>
  );
}

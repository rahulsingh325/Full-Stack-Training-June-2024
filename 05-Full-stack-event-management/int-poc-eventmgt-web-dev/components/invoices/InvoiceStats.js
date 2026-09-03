"use client";

import { Card, Row, Col } from "react-bootstrap";
import {
  BadgeCheck,
  XSquare,
  AlertOctagon,
} from "lucide-react";

const STATS = [
  { key: "paid", label: "Paid", icon: BadgeCheck },
  { key: "unpaid", label: "Unpaid", icon: XSquare },
  { key: "overdue", label: "Overdue", icon: AlertOctagon },
];

export default function InvoiceStats({ stats }) {
  if (!stats) return null;

  // NORMALIZE BACKEND STATS
  const normalizedStats = {
    paid: stats.paid ?? { count: 0, lastMonth: 0 },

    unpaid:
      stats.unpaid ??
      stats.draft ?? { count: 0, lastMonth: 0 },

    overdue: stats.overdue ?? { count: 0, lastMonth: 0 },
  };

  return (
    <Row className="g-2 mb-4">
      {STATS.map(({ key, label, icon: Icon }) => {
        const data = normalizedStats[key];

        return (
          <Col key={key} xs={4} md={4} lg={4}>
            <Card className="border-0 shadow-sm rounded-4 h-100">
              <Card.Body
                className="
                  p-3 p-md-4
                  d-flex d-md-block
                  flex-column
                  align-items-center align-items-md-start
                  text-center text-md-start
                  position-relative
                "
              >
                {/* ICON */}
                <div
                  className="
                    d-flex align-items-center justify-content-center rounded-circle
                    mb-2 mb-md-0
                    position-static position-md-absolute
                  "
                  style={{
                    top: 16,
                    right: 16,
                    width: 36,
                    height: 36,
                    backgroundColor: "#FCE7FF",
                  }}
                >
                  <Icon size={18} color="#F26CF9" />
                </div>

                {/* LABEL */}
                <div className="text-grey-30 fs-body-sm fw-regular mb-1">
                  {label}
                </div>

                {/* VALUE */}
                <div className="fw-semibold fs-h5 text-secondary-100">
                  {data.count.toLocaleString()}
                </div>

                {/* SUB TEXT */}
                <div className="text-grey-30 fw-regular fs-body-sm mt-1">
                  Last Month: {data.lastMonth.toLocaleString()}
                </div>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}

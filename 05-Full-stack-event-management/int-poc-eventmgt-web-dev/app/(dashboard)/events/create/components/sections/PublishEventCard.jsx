"use client";

import { Card, Button, Badge } from "react-bootstrap";
import { useFormContext, useWatch } from "react-hook-form";

export default function PublishEventCard() {
  const { setValue, control } = useFormContext();
  const eventStatus = useWatch({ control, name: "event_status" });

  if (eventStatus === "published") {
    return (
      <Card className="p-3 mt-4 border-success">
        <h6 className="fw-semibold mb-2">
          Event Status: <Badge bg="success">Published</Badge>
        </h6>
        <div className="small text-muted">
          This event is live and visible to users.
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-3 mt-4 border-warning">
      <h6 className="fw-semibold mb-2">
        Event Status: <Badge bg="secondary">Draft</Badge>
      </h6>

      <div className="small text-muted mb-3">
        Publish the event to make it visible and enable booking.
      </div>

      <Button
        variant="success"
        onClick={() => setValue("event_status", "published")}
      >
        🚀 Publish Event
      </Button>
    </Card>
  );
}

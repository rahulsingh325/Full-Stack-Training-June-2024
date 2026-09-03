"use client";

import { useState } from "react";
import Button from "react-bootstrap/Button";
import EventsGrid from "./EventsGrid";
import EmptyState from "./EmptyState";

export default function EventTabs({ events }) {
  const [activeTab, setActiveTab] = useState("active");

  const filteredEvents = events.filter((event) => {
    if (activeTab === "active") return event.status === "active";
    if (activeTab === "draft") return event.status === "draft";
    if (activeTab === "past") return event.status === "past";
    return false;
  });

  return (
    <>
      {/* TABS */}
      <div className="d-flex gap-2 mb-4">
        <Button
          variant={activeTab === "active" ? "primary" : "outline-secondary"}
          onClick={() => setActiveTab("active")}
        >
          Active
        </Button>

        <Button
          variant={activeTab === "draft" ? "primary" : "outline-secondary"}
          onClick={() => setActiveTab("draft")}
        >
          Draft
        </Button>

        <Button
          variant={activeTab === "past" ? "primary" : "outline-secondary"}
          onClick={() => setActiveTab("past")}
        >
          Past
        </Button>
      </div>

      {/* CONTENT */}
      {filteredEvents.length === 0 ? (
        <EmptyState tab={activeTab} />
      ) : (
        <EventsGrid events={filteredEvents} />
      )}
    </>
  );
}

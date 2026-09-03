"use client";

import { Card, ListGroup, Badge, ProgressBar } from "react-bootstrap";
import { CheckCircle, Circle, Lock } from "lucide-react";

const STEPS = [
  { key: "basic", label: "Basic Details" },
  { key: "venue", label: "Venue" },
  { key: "seat-zones", label: "Seat Zones" },
  { key: "tickets", label: "Tickets" },
  { key: "merchandise", label: "Merchandise" },
  { key: "partners", label: "Partners" },
  { key: "notes", label: "Notes" },
];

export default function EventSidebar({
  event,
  activeStep,
  setActiveStep,
  hasVenue = false,
  hasSeatZones = false,
  savedSteps = {},
}) {
  const activeIndex = STEPS.findIndex((s) => s.key === activeStep);
  const totalSteps = STEPS.length;

  const isActiveEvent =
    String(event?.status || "").toLowerCase() === "active";

  /* =========================
     STEP ACCESS RULES
  ========================= */
  const canAccessStep = (stepKey) => {
    // Always allow basic
    if (stepKey === "basic") return true;

    // 🔒 ACTIVE EVENT → everything else locked
    if (isActiveEvent) return false;

    // Event must exist
    if (!event?.event_id) return false;

    // Venue required before seat zones
    if (stepKey === "seat-zones" && !hasVenue) return false;

    // Seat zones required before tickets
    if (stepKey === "tickets" && !hasSeatZones) return false;

    return true;
  };

  return (
    <Card className="border-1 shadow-sm">
      <Card.Body className="rounded-4">
        {/* STEP INFO */}
        <div className="mb-3">
          <small className="text-muted">
            Step {activeIndex + 1} of {totalSteps}
          </small>
          <ProgressBar
            now={((activeIndex + 1) / totalSteps) * 100}
            className="mt-2"
            style={{ height: 6 }}
          />
        </div>

        {/* ACTIVE EVENT INFO */}
        {isActiveEvent && (
          <small className="text-warning d-block mb-3">
            🔒 Event is live. Navigation is restricted.
          </small>
        )}

        {/* STEPS */}
        <ListGroup variant="flush">
          {STEPS.map((step, index) => {
            const isActive = activeStep === step.key;
            // const isCompleted = index < activeIndex;
            const isCompleted = Boolean(savedSteps[step.key]);
            const isDisabled = !canAccessStep(step.key);

            return (
              <ListGroup.Item
                key={step.key}
                action
                disabled={isDisabled}
                onClick={() => !isDisabled && setActiveStep(step.key)}
                className={`border-0 px-1 py-3 ${
                  isActive ? "bg-primary-20 fw-semibold" : ""
                }`}
              >
                <div className="d-flex align-items-center gap-3">
                  {/* ICON */}
                  {isDisabled && step.key !== "basic" ? (
                    <Lock size={18} className="text-muted" />
                  ) : isCompleted ? (
                    <CheckCircle size={18} className="text-success" />
                  ) : (
                    <Circle
                      size={18}
                      className={isActive ? "text-primary" : "text-muted"}
                    />
                  )}

                  {/* LABEL */}
                  <div className="flex-grow-1">
                    <div className="fw-medium">{step.label}</div>
                  </div>

                  {/* STATUS BADGE */}
                  {!isActiveEvent &&
                    event?.status === "draft" &&
                    !isCompleted &&
                    step.key !== "basic" && (
                      <Badge bg="secondary" pill>
                        Draft
                      </Badge>
                    )}

                  {isActiveEvent && step.key !== "basic" && (
                    <Badge bg="light" text="dark" pill>
                      {/* Locked */}
                    </Badge>
                  )}
                </div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

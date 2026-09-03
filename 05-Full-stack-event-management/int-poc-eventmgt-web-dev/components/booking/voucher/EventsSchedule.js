"use client";

import { Card } from "react-bootstrap";
import { formatTime, formatDate } from "@/utils/dateTime";

export default function EventsSchedule({ schedule = [] }) {
  /* ---------- GUARD ---------- */
  if (!Array.isArray(schedule) || schedule.length === 0) {
    return (
      <Card className="border-0 shadow-sm rounded-4 p-4 mb-4">
        <div className="fw-semibold mb-3">
          Event Schedule
        </div>
        <div className="text-muted small">
          Schedule not added
        </div>
      </Card>
    );
  }

  /* ================= NORMALIZE & SORT ================= */
  const normalizedSchedule = schedule
    .map(item => {
      if (!item || typeof item !== "object") {
        return {
          time: "Not added",
          label: "Schedule not added",
          date: null,
          rawStart: "",
        };
      }

      const hasStart = Boolean(item.start_time);
      const hasEnd = Boolean(item.end_time);

      const start = hasStart
        ? formatTime(item.start_time)
        : "Not added";

      const end = hasEnd
        ? formatTime(item.end_time)
        : "Not added";

      return {
        time:
          hasStart || hasEnd
            ? hasStart && hasEnd
              ? `${start} - ${end}`
              : start !== "Not added"
              ? start
              : end
            : "Not added",

        label:
          item.agenda_title ||
          item.label ||
          "Not added",

        date: item.agenda_date
          ? formatDate(item.agenda_date)
          : null,

        rawStart: item.start_time || "",
      };
    })
    // sort only if time exists
    .sort((a, b) =>
      a.rawStart.localeCompare(b.rawStart)
    );

  return (
    <Card className="border-0 shadow-sm rounded-4 p-4 mb-4">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="fw-semibold">
          Event Schedule
        </div>
        <span className="text-muted">•••</span>
      </div>

      {/* DATE (IF AVAILABLE) */}
      {normalizedSchedule[0]?.date && (
        <div className="small text-muted mb-3">
          {normalizedSchedule[0].date}
        </div>
      )}

      {/* LIST */}
      <div className="d-flex flex-column gap-2">
        {normalizedSchedule.map((item, index) => (
          <div
            key={index}
            className="d-flex align-items-center gap-3 px-3 py-2 rounded-3"
            style={{ background: "#F7F8FA" }}
          >
            {/* TIME */}
            <div
              className="fw-semibold"
              style={{
                minWidth: 160,
                color:
                  item.time === "Not added"
                    ? "#9CA3AF"
                    : "#2F3A8F",
                whiteSpace: "nowrap",
              }}
            >
              {item.time}
            </div>

            {/* DASH */}
            <div
              style={{
                width: 14,
                height: 1,
                backgroundColor: "#D0D3E2",
              }}
            />

            {/* LABEL */}
            <div
              className={`fw-medium ${
                item.label === "Not added"
                  ? "text-muted"
                  : "text-dark"
              }`}
            >
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

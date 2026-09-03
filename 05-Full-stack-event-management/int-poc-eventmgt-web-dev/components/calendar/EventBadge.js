"use client";

import { formatTime } from "@/utils/dateTime";

const typeStyles = {
  meeting: "bg-cool-grey-10 text-grey-100",
  event: "bg-primary-50 text-grey-100",
  setup: "bg-cool-grey-40 text-grey-100",
  // task: "bg-primary-50 text-grey-100",
};

export default function EventBadge({ event, onClick }) {
  const members = Array.isArray(event.team) && event.team.length > 0
    ? event.team
    : event.pic_name
      ? [{ name: event.pic_name }]
      : [];
  const visibleMembers = members.slice(0, 3);
  const remaining = members.length - visibleMembers.length;

  const cardClass = typeStyles[event.agenda_type] || typeStyles.meeting;

  return (
    <div
      onClick={onClick}
      className={`rounded-1 p-1 cursor-pointer w-100 ${cardClass}`}
    >
      <div className="fw-medium fs-10 text-truncate mb-1">
        {event.title}
      </div>

      <div className="small text-muted">
        {formatTime(event.start_time)}
      </div>

      {members.length > 0 && (
        <div className="d-flex align-items-end justify-content-end mt-3">
          {visibleMembers.map((m, i) => (
            <div
              key={i}
              className="rounded-circle bg-white border avatar-circle d-flex align-items-center justify-content-center"
              style={{ marginLeft: i === 0 ? 0 : -10 }}
              title={m.name}
            >
              {m.name?.[0]}
            </div>
          ))}

          {remaining > 0 && (
            <div
              className="rounded-circle bg-grey-30 border avatar-circle d-flex align-items-center justify-content-center fw-medium"
              style={{ marginLeft: -10 }}
            >
              +{remaining}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

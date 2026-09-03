'use client';
import { Calendar } from "lucide-react";

export default function CalendarStats({ stats = [] }) {
  return (
    <div className="row g-3">
      {stats.map((item) => (
        <div className="col-6 col-md-3" key={item.key}>
          <div
            className={`p-4 rounded-4 shadow-sm h-100 ${
              item.key === "all"
                ? "bg-cool-grey-10"
                : "bg-grey-20"
            }`}
          >
            {/* TITLE */}
            <div className="fs-11 text-grey-90 mb-3">
              {item.title}
            </div>

            {/* CONTENT */}
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <h3 className="fw-semibold text-secondary-100 mb-0">
                  {item.count}
                </h3>
                <span className="text-grey-90 fs-body-sm ms-2 mt-2">
                  Agenda
                </span>
              </div>

              <div
                className={`icon-circle d-flex align-items-center justify-content-center ${
                  item.key === "all"
                    ? "bg-primary-100"
                    : "bg-primary-100"
                }`}
              >
                <Calendar size={14} color="#fff" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { ChevronDown, ChevronLeft, ChevronRight, Clock, LayoutGrid } from "lucide-react";
import dayjs from "dayjs";
import "react-day-picker/dist/style.css";
import { Col, Row } from "react-bootstrap";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);


export default function CalendarWidget({
  calendarEvents = [],
}) {
  const [selected, setSelected] = useState(new Date());

  const month = selected.getMonth();
  const year = selected.getFullYear();

  const [isDatePicked, setIsDatePicked] = useState(false);


  /* ================= MONTH & YEAR LIST ================= */

  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December",
  ];

  const years = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - 2 + i
  );

  /* ================= CALENDAR DOTS ================= */

  const bookedDates = useMemo(() => {
    return calendarEvents.map(e => new Date(e.agenda_date));
  }, [calendarEvents]);

  const eventsOfSelectedDay = useMemo(() => {
    const source = calendarEvents;

    // default mode
    if (!isDatePicked) {
      return source
        .filter(e =>
          dayjs(e.agenda_date, "YYYY-MM-DD", true).isValid()
        )
        .sort((a, b) =>
          dayjs(a.agenda_date).diff(dayjs(b.agenda_date))
        )
        .slice(0, 3);
    }


    return source
      .filter(e =>
        dayjs(e.agenda_date, "YYYY-MM-DD", true)
          .isSame(dayjs(selected), "day")
      )
      .slice(0, 3);

  }, [calendarEvents, selected, isDatePicked]);


  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  return (
    <div className="bg-white rounded-4 shadow-sm p-3 calendar-widget">
      <Row>
        <Col>

          {/* ===== HEADER (MONTH + YEAR + CHEVRONS) ===== */}
          <div className="d-flex justify-content-between align-items-center mb-2">

            {/* ===== LEFT : MONTH YEAR DROPDOWN ===== */}
            <div className="position-relative" ref={dropdownRef}>
              <button
                className="btn btn-link fw-semibold text-dark p-0 text-decoration-none d-flex align-items-center gap-1"
                onClick={() => setOpen(!open)}
              >
                {months[month]} {year}
                <ChevronDown size={14} />
              </button>

              {open && (
                <div
                  className="position-absolute bg-white shadow rounded-4 p-3 mt-2 z-3"
                  style={{ minWidth: 260 }}
                >
                  <div className="row g-3">

                    {/* MONTHS */}
                    <div className="col-7">
                      <div className="small fw-semibold text-muted mb-2">Month</div>
                      <div className="d-grid gap-1">
                        {months.map((m, i) => (
                          <button
                            key={m}
                            className={`btn btn-sm text-start ${i === month ? "btn-primary" : "btn-light"
                              }`}
                            onClick={() => {
                              setSelected(new Date(year, i, 1));
                              setOpen(false);
                            }}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* YEARS */}
                    <div className="col-5">
                      <div className="small fw-semibold text-muted mb-2">Year</div>
                      <div className="d-grid gap-1">
                        {years.map((y) => (
                          <button
                            key={y}
                            className={`btn btn-sm ${y === year ? "btn-primary" : "btn-light"
                              }`}
                            onClick={() => {
                              setSelected(new Date(y, month, 1));
                              setOpen(false);
                            }}
                          >
                            {y}
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* ===== RIGHT : CHEVRONS ===== */}

            <div className="d-flex gap-1">

              {/* PREV MONTH */}
              <button
                className="btn btn-light btn-sm"
                onClick={() => {
                  setSelected(new Date(year, month - 1, 1));
                  setIsDatePicked(false);
                }}
              >
                <ChevronLeft size={16} />
              </button>

              {/* NEXT MONTH */}
              <button
                className="btn btn-light btn-sm"
                onClick={() => {
                  setSelected(new Date(year, month + 1, 1));
                  setIsDatePicked(false);
                }}
              >
                <ChevronRight size={16} />
              </button>

            </div>


          </div>
          {/* ===== CALENDAR ===== */}
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={(date) => {
              if (!date) return;
              setSelected(date);
              setIsDatePicked(true);   //  date explicitly select hui
              setOpen(false);
            }}
            month={selected}
            showOutsideDays
            fixedWeeks
            captionLayout="none"
            hideNavigation

            className="calendar-widget-picker"
            modifiers={{ booked: bookedDates }}
            modifiersClassNames={{
              selected: "dp-selected-day",
              booked: "dp-booked-day",
            }}
          />

        </Col>
        <Col>
          {eventsOfSelectedDay.map((event, index) => {
            const dateObj = dayjs(event.agenda_date, "YYYY-MM-DD", true);
            const isHighlighted = index === 1;

            return (
              <div
                key={event.event_id}
                className="d-flex gap-2 p-3 rounded-4 mb-2"
                style={{ background: isHighlighted ? "#EEF0FF" : "#F8F9FF" }}
              >
                <div
                  className="text-center text-white rounded-3 px-2 py-1"
                  style={{
                    minWidth: 52,
                    background: isHighlighted ? "#F26CF9" : "#2F3A8F"
                  }}
                >
                  <div className="fw-bold fs-5">
                    {dateObj.format("DD")}
                  </div>
                  <small>{dateObj.format("ddd")}</small>
                </div>

                <div className="flex-grow-1">
                  <div className="fw-semibold">{event.event_name}</div>
                  <div className="text-muted small">{event.location}</div>

                  <div className="d-flex gap-1 mt-2 small text-grey-90">
                    <span className="d-flex align-items-center fw-regular fs-10 gap-1">
                      <LayoutGrid size={14} />
                      {event.event_category}
                    </span>

                    <span className="d-flex align-items-center fw-regular fs-10 text-grey-90 gap-1">
                      <Clock size={14} />
                      {dayjs(event.start_time, "HH:mm:ss", true).format("hh:mm A")} –{" "}
                      {dayjs(event.end_time, "HH:mm:ss", true).format("hh:mm A")}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

        </Col>

      </Row>








    </div>
  );
}

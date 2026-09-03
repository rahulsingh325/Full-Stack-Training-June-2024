"use client";

import { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";

import { CalendarIcon, Plus } from "lucide-react";

import AgendaCreateForm from "@/components/calendar/agenda/AgendaCreateForm";
import EventBadge from "./EventBadge";

/* ================= HELPERS ================= */
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const viewOptions = [
  { key: "day", label: "Day", view: "timeGridDay" },
  { key: "week", label: "Week", view: "timeGridWeek" },
  { key: "month", label: "Month", view: "dayGridMonth" },
];

const yearsRange = (y) =>
  Array.from({ length: 11 }, (_, i) => y - 5 + i);

/* ================= COMPONENT ================= */
export default function AgendaCalendar({
  agendas = [],
  eventStatus = "active",
  selectedSchedule,
  onSelectAgenda,
  onRangeChange,
  onAgendaCreated,
}) {
  const calendarRef = useRef(null);
  const today = new Date();

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [showAgendaModal, setShowAgendaModal] = useState(false);
  const [calendarView, setCalendarView] = useState("dayGridMonth");

  /* ===== Resize calendar when layout changes ===== */
  useEffect(() => {
    if (!calendarRef.current) return;
    const api = calendarRef.current.getApi();
    setTimeout(() => api.updateSize(), 300);
  }, [selectedSchedule]);

  /* ===== Resize on screen resize (mobile fix) ===== */
  useEffect(() => {
    const handleResize = () => {
      if (!calendarRef.current) return;
      calendarRef.current.getApi().updateSize();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ================= DATE CHANGE ================= */
  const handleDatesSet = (arg) => {
    setMonth(arg.view.currentStart.getMonth());
    setYear(arg.view.currentStart.getFullYear());

    onRangeChange?.({
      from: arg.view.activeStart,
      to: arg.view.activeEnd,
    });
  };

  return (
    <div className="agenda-calendar-scroll">
      <div className="calendar-wrapper mt-3">
        <div className="card rounded-4 shadow-sm overflow-hidden">

          {/* ================= HEADER ================= */}
          <div className="card-body p-3 p-md-4">
            <div className="d-flex justify-content-between align-items-center gap-2 mb-3">

              {/* LEFT : MONTH / YEAR */}
              <Dropdown>
                <Dropdown.Toggle className="btn text-grey-100 bg-grey-10 border-0 fw-semibold w-100 w-md-auto text-start">
                  {months[month]} {year}
                </Dropdown.Toggle>

                <Dropdown.Menu className="p-3">
                  <div className="d-flex gap-4">
                    {/* MONTHS */}
                    <div>
                      <div className="fs-10 text-muted mb-2">Month</div>
                      {months.map((m, i) => (
                        <Dropdown.Item
                          key={m}
                          active={i === month}
                          onClick={() =>
                            calendarRef.current
                              ?.getApi()
                              ?.gotoDate(
                                `${year}-${String(i + 1).padStart(2, "0")}-01`
                              )
                          }
                        >
                          {m}
                        </Dropdown.Item>
                      ))}
                    </div>

                    {/* YEARS */}
                    <div>
                      <div className="fs-10 text-muted mb-2">Year</div>
                      {yearsRange(year).map((y) => (
                        <Dropdown.Item
                          key={y}
                          active={y === year}
                          onClick={() =>
                            calendarRef.current
                              ?.getApi()
                              ?.gotoDate(
                                `${y}-${String(month + 1).padStart(2, "0")}-01`
                              )
                          }
                        >
                          {y}
                        </Dropdown.Item>
                      ))}
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>

              {/* RIGHT : ACTIONS */}
              <div className="d-flex align-items-center gap-2 flex-wrap justify-content-end w-100 w-md-auto">
                <Dropdown className="d-none d-sm-block" container="body">
                  <Dropdown.Toggle className="text-secondary-100 bg-cool-grey-10 rounded-pill px-3 fw-medium fs-10 border-0">
                    <CalendarIcon size={14} className="me-1 mb-1" />
                    {calendarView === "timeGridDay"
                      ? "Day"
                      : calendarView === "timeGridWeek"
                        ? "Week"
                        : "Month"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu align="end">
                    {viewOptions.map((opt) => (
                      <Dropdown.Item
                        key={opt.key}
                        active={calendarView === opt.view}
                        onClick={() => {
                          if (!calendarRef.current) return;
                          const api = calendarRef.current.getApi();
                          setCalendarView(opt.view);
                          api.changeView(opt.view);
                        }}
                      >
                        {opt.label}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>

                <button
                  className="btn bg-primary-100 text-grey-10 fw-medium rounded-pill px-3 fs-10"
                  disabled={eventStatus !== "active"}
                  onClick={() => setShowAgendaModal(true)}
                >
                  <Plus size={12} />
                  <span className="d-none d-sm-inline ms-1">New Agenda</span>
                </button>
              </div>
            </div>
          </div>

          {/* ================= LEGEND ================= */}
          <div className="d-flex flex-wrap gap-3 fs-10 text-muted mb-2 px-3">
            <div><span className="legend-dot bg-cool-grey-40 me-1" /> Setup & Rehearsal</div>
            <div><span className="legend-dot bg-cool-grey-10 me-1" /> Meeting</div>
            <div><span className="legend-dot bg-primary-30 me-1" /> Event</div>
            <div><span className="legend-dot bg-primary-50 me-1" /> Task Deadlines</div>
          </div>

          {/* ================= CALENDAR (SCROLL FIX) ================= */}
          <div className="agenda-calendar-scroll-x">
            <div className="agenda-calendar-inner">
              <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView={calendarView}
                headerToolbar={false}
                firstDay={1}
                height="auto"
                datesSet={handleDatesSet}
                events={agendas.map((a) => ({
                  id: a.agenda_id || a.id,
                  title: a.title,
                  start: `${a.agenda_date}T${a.start_time}`,
                  end: `${a.agenda_date}T${a.end_time}`,
                  extendedProps: a,
                  className: `event-${a.agenda_type}`,
                }))}
                eventContent={(arg) => (
                  <EventBadge event={arg.event.extendedProps} />
                )}
                eventClick={(info) =>
                  onSelectAgenda?.(info.event.extendedProps)
                }
              />
            </div>
          </div>

          {/* ================= CREATE MODAL ================= */}
          <Modal
            show={showAgendaModal}
            onHide={() => setShowAgendaModal(false)}
            centered
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>Create Agenda</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <AgendaCreateForm
                agenda={null}
                onSuccess={(createdAgenda) => {
                  onAgendaCreated?.(createdAgenda);
                  setShowAgendaModal(false);
                }}
                onClose={() => setShowAgendaModal(false)}
              />
            </Modal.Body>
          </Modal>

        </div>
      </div>
    </div>
  );
}

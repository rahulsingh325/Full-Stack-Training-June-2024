"use client";

import React, { useState } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

import CalendarStats from "@/components/calendar/CalendarStats";
import AgendaCalendar from "@/components/calendar/AgendaCalendar";
import ScheduleDetailsPanel from "@/components/calendar/ScheduleDetailsPanel";
import AgendaCreateForm from "@/components/calendar/agenda/AgendaCreateForm";

import api from "@/helper/api";
import { buildAgendaTypeStats } from "@/utils/calendarStats";

const Index = () => {
  /* ================= STATE ================= */
  const [agendas, setAgendas] = useState([]);
  const [visibleRange, setVisibleRange] = useState({ from: null, to: null });

  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [editAgenda, setEditAgenda] = useState(null);

  /* ================= FETCH AGENDAS ================= */
  const fetchAgendas = async (from, to) => {
    if (!from || !to) return;

    try {
      const res = await api.get("/calendar/agendas", {
        params: {
          from_date: from.toISOString().split("T")[0],
          to_date: to.toISOString().split("T")[0],
        },
      });

      setAgendas(
        Array.isArray(res.data?.items)
          ? res.data.items
          : Array.isArray(res.data)
            ? res.data
            : []
      );
    } catch (err) {
      console.error("AGENDA FETCH ERROR", err);
    }
  };

  /* ================= AGENDA CLICK ================= */
  const handleSelectAgenda = async (agenda) => {
    if (!agenda?.agenda_id && !agenda?.id) return;

    const agendaId = agenda.agenda_id || agenda.id;

    try {
      setLoadingDetails(true);

      const res = await api.get(`/calendar/agenda/${agendaId}`);
      const fullAgenda = res.data;

      setSelectedSchedule({
        ...fullAgenda,

        // normalize ids
        agenda_id: fullAgenda.agenda_id || agendaId,
        event_id:
          fullAgenda.event_id ||
          fullAgenda.event?.event_id ||
          agenda.event_id ||
          null,

        // ui helpers
        banner_image_url:
          fullAgenda.banner_image_url ||
          fullAgenda.event?.banner_image_url ||
          null,

        event_name:
          fullAgenda.event_name ||
          fullAgenda.event?.name ||
          "",
      });
    } catch (err) {
      console.error("AGENDA DETAIL ERROR", err);
    } finally {
      setLoadingDetails(false);
    }
  };

  /* ================= DELETE AGENDA ================= */
  const handleDeleteAgenda = async (agenda) => {
    const agendaId = agenda.agenda_id || agenda.id;
    const eventId = agenda.event_id;

    if (!agendaId || !eventId) {
      toast.warning("Invalid agenda data");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this agenda?")) {
      return;
    }

    try {
      await api.delete(`/events/${eventId}/agendas/${agendaId}`);

      toast.success("Agenda deleted successfully");

      // single source update
      setAgendas((prev) =>
        prev.filter(
          (a) =>
            a.agenda_id !== agendaId &&
            a.id !== agendaId
        )
      );

      setSelectedSchedule(null);
    } catch (err) {
      console.error("DELETE AGENDA ERROR", err);
      toast.warning(
        err?.response?.data?.detail ||
        "This agenda cannot be deleted right now."
      );
    }
  };

  return (
    <Container fluid className="rounded-4 bg-grey-20 p-4">
      <Row className="gx-3 bg-grey-10 rounded-4 p-3">

        {/* ================= LEFT : CALENDAR ================= */}
        <Col lg={selectedSchedule ? 9 : 12}>
          {/* STATS */}
          <CalendarStats stats={buildAgendaTypeStats(agendas)} />

          {/* CALENDAR */}
          <AgendaCalendar
            agendas={agendas}
            selectedSchedule={selectedSchedule}
            onSelectAgenda={handleSelectAgenda}
            onRangeChange={({ from, to }) => {
              setVisibleRange({ from, to });
              fetchAgendas(from, to);
            }}
            onAgendaCreated={(createdAgenda) => {
              setAgendas((prev) => [...prev, createdAgenda]);
            }}
          />
        </Col>

        {/* ================= RIGHT : DETAILS ================= */}
        {selectedSchedule && (
          <Col lg={3}>
            <ScheduleDetailsPanel
              agenda={selectedSchedule}
              loading={loadingDetails}
              onClose={() => setSelectedSchedule(null)}
              onEdit={() => setEditAgenda(selectedSchedule)}
              onDelete={handleDeleteAgenda}
            />
          </Col>
        )}

        {/* ================= EDIT MODAL ================= */}
        <Modal
          show={!!editAgenda}
          onHide={() => setEditAgenda(null)}
          centered
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Agenda</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <AgendaCreateForm
              agenda={editAgenda}
              onClose={() => setEditAgenda(null)}
              onSuccess={(updatedAgenda) => {
                // update list
                setAgendas((prev) =>
                  prev.map((a) =>
                    a.agenda_id === updatedAgenda.agenda_id
                      ? updatedAgenda
                      : a
                  )
                );

                setSelectedSchedule(updatedAgenda);
                setEditAgenda(null);
              }}
            />
          </Modal.Body>
        </Modal>

      </Row>
    </Container>
  );
};

export default Index;

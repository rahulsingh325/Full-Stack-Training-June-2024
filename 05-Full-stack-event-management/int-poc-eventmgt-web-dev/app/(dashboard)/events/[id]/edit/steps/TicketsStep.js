"use client";

import { Card, Form, Row, Col, Button, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import api from "@/helper/api";
import { ticketsSchema } from "./schemas/tickets.schema";

export default function TicketsStep({ eventId, setActiveStep, onSaved, }) {
  const [tickets, setTickets] = useState([]);
  const [seatZones, setSeatZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ticketsSchema(tickets)),
    defaultValues: {
      ticket: {
        name: "",
        price: "",
        seat_zone_id: "",
        access_type: "",
        is_vip: false,
        benefits: "",
      },
    },
  });

  /* ================= FETCH SEAT ZONES ================= */
  const fetchSeatZones = async () => {
    try {
      const res = await api.get(`/seat_zones/list/${eventId}`);
      setSeatZones(res.data || []);
    } catch (err) {
      console.error("SEAT ZONE LIST ERROR", err);
    }
  };

  /* ================= FETCH TICKETS ================= */
  const fetchTickets = async () => {
    try {
      const res = await api.get(`/tickets/list/${eventId}`);
      setTickets(res.data || []);
    } catch (err) {
      console.error("TICKET LIST ERROR", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!eventId) return;
    fetchSeatZones();
    fetchTickets();
  }, [eventId]);

  /* ================= ADD TICKET ================= */
  const onSubmit = async (data) => {
    try {
      setSaving(true);
      const t = data.ticket;

      await api.post("/tickets/save", {
        event_id: eventId,
        name: t.name,
        price: t.price,
        seat_zone_id: t.seat_zone_id,
        access_type: t.access_type,
        is_vip: t.is_vip,
        benefits:
          t.benefits
            ?.split(",")
            .map((b) => b.trim())
            .filter(Boolean) || [],
      });

      toast.success("Ticket added successfully");
      onSaved?.();
      reset();
      fetchTickets();
    } catch (err) {
      console.error("TICKET SAVE FAILED", err);
      toast.error("Failed to save ticket");
    } finally {
      setSaving(false);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (ticketId) => {
    try {
      await api.delete(`/tickets/delete/${ticketId}`);
      setTickets((prev) =>
        prev.filter((t) => t.ticket_id !== ticketId)
      );
      toast.success("Ticket removed");
    } catch {
      toast.error("Failed to delete ticket");
    }
  };

  if (loading) {
    return (
      <div className="p-5 text-center">
        <Spinner />
      </div>
    );
  }

  return (
    <Card className="p-4 shadow-sm">
      <h5 className="mb-4">Tickets</h5>

      {/* ================= ADD TICKET FORM ================= */}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          {/* TICKET NAME */}
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                Ticket Name <span className="text-danger">*</span>
              </Form.Label>

              <Form.Control
                type="text"
                placeholder="e.g. Gold Pass, VIP Entry"
                {...register("ticket.name")}
                isInvalid={!!errors?.ticket?.name}
              />

              <Form.Control.Feedback type="invalid">
                {errors?.ticket?.name?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          {/* PRICE */}
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                Price <span className="text-danger">*</span>
              </Form.Label>

              <Form.Control
                type="number"
                {...register("ticket.price", { valueAsNumber: true })}
                isInvalid={!!errors?.ticket?.price}
              />

              <Form.Control.Feedback type="invalid">
                {errors?.ticket?.price?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          {/* SEAT ZONE */}
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                Seat Zone <span className="text-danger">*</span>
              </Form.Label>

              <Form.Select
                {...register("ticket.seat_zone_id")}
                isInvalid={!!errors?.ticket?.seat_zone_id}
              >
                <option value="">Select Seat Zone</option>
                {seatZones.map((z) => (
                  <option key={z.seat_zone_id} value={z.seat_zone_id}>
                    {z.name} (Gate {z.gate_no})
                  </option>
                ))}
              </Form.Select>

              <Form.Control.Feedback type="invalid">
                {errors?.ticket?.seat_zone_id?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        

        
          {/* ACCESS TYPE */}
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                Access Type <span className="text-danger">*</span>
              </Form.Label>

              <Form.Select
                {...register("ticket.access_type")}
                isInvalid={!!errors?.ticket?.access_type}
              >
                <option value="">Select</option>
                <option value="seating">Seating</option>
                <option value="standing">Standing</option>
              </Form.Select>

              <Form.Control.Feedback type="invalid">
                {errors?.ticket?.access_type?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          {/* VIP */}
          <Col md={6} className="d-flex align-items-center">
            <Form.Check
              type="checkbox"
              label="VIP Ticket"
              {...register("ticket.is_vip")}
            />
          </Col>
        </Row>

        {/* BENEFITS */}
        <Row>
          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Benefits (comma separated)</Form.Label>
              <Form.Control
                placeholder="Front row, Free drinks, Backstage access"
                {...register("ticket.benefits")}
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-end">
          <Button type="submit" disabled={saving} className="bg-secondary-100 text-grey-10">
            {saving ? "Saving..." : "Add Ticket"}
          </Button>
        </div>
      </Form>

      {/* ================= TICKET LIST ================= */}
      <Card className="p-3 mt-4 bg-light border">
        <h6 className="mb-3">Added Tickets</h6>

        {tickets.length === 0 && (
          <div className="text-muted text-center py-3">
            No tickets added yet
          </div>
        )}

        {tickets.map((t) => (
          <div
            key={t.ticket_id}
            className="border rounded p-2 mb-2 d-flex justify-content-between align-items-center bg-white"
          >
            <div>
              <strong>{t.name}</strong>
              <div className="small text-muted">
                ${t.price} • {t.seat_zone?.name} •{" "}
                {t.is_vip ? "VIP" : "Normal"}
              </div>
            </div>

            <Button
              size="sm"
              variant="outline-danger"
              onClick={() => handleDelete(t.ticket_id)}
            >
              Remove
            </Button>
          </div>
        ))}
      </Card>

      {/* ================= CONTINUE ================= */}
      <div className="d-flex justify-content-end mt-4">
        <Button
          className="bg-secondary-100 text-grey-10"
          disabled={tickets.length === 0}
          onClick={() => {
            onSaved?.();
            setActiveStep?.("merchandise");
          }}
        >
          Save & Continue
        </Button>
      </div>
    </Card>
  );
}

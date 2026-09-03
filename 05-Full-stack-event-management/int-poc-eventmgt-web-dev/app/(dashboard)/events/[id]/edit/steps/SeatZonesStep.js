"use client";

import { Card, Form, Row, Col, Button, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import api from "@/helper/api";
import { seatZonesSchema } from "./schemas/seatZones.schema";

export default function SeatZonesStep({
  eventId,
  setActiveStep,
  setHasSeatZones,
  onSaved,
}) {
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(seatZonesSchema(zones)),
    defaultValues: {
      zone: {
        name: "",
        gate_no: "",
        capacity: "",
      },
    },
  });



  /* ================= FETCH ZONES ================= */
  const fetchSeatZones = async () => {
    try {
      const res = await api.get(`/seat_zones/list/${eventId}`);
      setZones(res.data || []);
    } catch (err) {
      console.error("SEAT ZONE LIST ERROR", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (eventId) fetchSeatZones();
  }, [eventId]);

  useEffect(() => {
    setHasSeatZones?.(zones.length > 0);
  }, [zones, setHasSeatZones]);

  /* ================= ADD ZONE ================= */
  const onSubmit = async (data) => {
    try {
      setSaving(true);
      const z = data.zone;

      await api.post("/seat_zones/add", {
        event_id: eventId,
        name: z.name,
        gate_no: z.gate_no,
        capacity: z.capacity,
      });

      toast.success("Seat zone added");
      onSaved?.();
      reset();
      fetchSeatZones();
    } catch (err) {
      console.error("SEAT ZONE ADD FAILED", err);
      toast.error("Failed to add seat zone");
    } finally {
      setSaving(false);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (zoneId) => {
    try {
      await api.delete(`/seat_zones/delete/${zoneId}`);
      setZones((prev) => prev.filter((z) => z.seat_zone_id !== zoneId));
      toast.success("Seat zone removed");
    } catch (err) {
      console.error("DELETE SEAT ZONE FAILED", err);
      toast.error("Failed to delete seat zone");
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
      <h5 className="mb-4">Seat Zones</h5>

      {/* ================= ADD ZONE FORM ================= */}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          {/* ZONE NAME (TEXT INPUT) */}
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                Zone Name <span className="text-danger">*</span>
              </Form.Label>

              <Form.Control
                type="text"
                placeholder="e.g. Gold, VIP Lounge"
                {...register("zone.name")}
                isInvalid={!!errors?.zone?.name}
              />

              <Form.Control.Feedback type="invalid">
                {errors?.zone?.name?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          {/* GATE NO */}
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                Gate No <span className="text-danger">*</span>
              </Form.Label>

              <Form.Control
                type="number"
                {...register("zone.gate_no", { valueAsNumber: true })}
                isInvalid={!!errors?.zone?.gate_no}
              />

              <Form.Control.Feedback type="invalid">
                {errors?.zone?.gate_no?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          {/* CAPACITY */}
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                Capacity <span className="text-danger">*</span>
              </Form.Label>

              <Form.Control
                type="number"
                {...register("zone.capacity", { valueAsNumber: true })}
                isInvalid={!!errors?.zone?.capacity}
              />

              <Form.Control.Feedback type="invalid">
                {errors?.zone?.capacity?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-end">
          <Button type="submit" disabled={saving} className="bg-secondary-100">
            {saving ? "Saving..." : "Add Seat Zone"}
          </Button>
        </div>
      </Form>

      {/* ================= ZONE LIST ================= */}
      <Card className="p-3 mt-4 bg-light border">
        <h6 className="mb-3">Added Seat Zones</h6>

        {zones.length === 0 && (
          <div className="text-muted text-center py-3">
            No seat zones added yet
          </div>
        )}

        {zones.map((z) => (
          <div
            key={z.seat_zone_id}
            className="border rounded p-2 mb-2 d-flex justify-content-between align-items-center bg-white"
          >
            <div>
              <strong>{z.name}</strong>
              <div className="small text-muted">
                Gate {z.gate_no} • Capacity {z.capacity}
              </div>
            </div>

            <Button
              size="sm"
              variant="outline-danger"
              onClick={() => handleDelete(z.seat_zone_id)}
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
          disabled={zones.length === 0}
          onClick={() => {
            onSaved?.();
            setActiveStep?.("tickets");
          }}
        >
          Save & Continue
        </Button>

      </div>
    </Card>
  );
}

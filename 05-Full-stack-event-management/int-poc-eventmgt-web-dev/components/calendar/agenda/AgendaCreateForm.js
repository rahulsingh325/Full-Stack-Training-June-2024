"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Row, Col, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import api from "@/helper/api";

export default function AgendaCreateForm({
  agenda,
  onSuccess, 
  onClose,
}) {
  const isEdit = !!agenda;

  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const startTime = watch("start_time");

  /* =========================
     PREFILL FORM (EDIT MODE)
  ========================= */
  useEffect(() => {
    if (agenda) {
      Object.entries(agenda).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          setValue(key, value);
        }
      });
    }
  }, [agenda, setValue]);

  /* =========================
     FETCH ACTIVE EVENTS
     (ONLY FOR CREATE)
  ========================= */
  useEffect(() => {
    if (isEdit) return;

    const fetchEvents = async () => {
      setLoadingEvents(true);
      try {
        const res = await api.get("/events/all_events_list", {
          params: {
            status: "active",
            limit: 100,
            offset: 0,
          },
        });

        setEvents(Array.isArray(res.data?.items) ? res.data.items : []);
      } catch (err) {
        console.error("EVENT LIST FETCH ERROR", err);
        toast.error("Failed to load events");
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchEvents();
  }, [isEdit]);

  const onSubmit = async (formData) => {
    try {
      /* ================= EDIT ================= */
      if (isEdit) {
        if (!agenda?.agenda_id || !agenda?.event_id) {
          toast.error("Invalid agenda data");
          return;
        }

        const payload = {
          agenda_date: formData.agenda_date,
          start_time: formData.start_time,
          end_time: formData.end_time,
          location: formData.location,
          pic_name: formData.pic_name,
          pic_role: formData.pic_role,
          pic_phone: formData.pic_phone,
          pic_email: formData.pic_email,
          notes: formData.notes,
        };

        // ONLY ONE API CALL
        await api.patch(
          `/events/${agenda.event_id}/agendas/${agenda.agenda_id}`,
          payload
        );

        toast.success("Agenda updated successfully");

        // parent ko updated agenda bhejo
        onSuccess?.({
          ...agenda,
          ...payload,
        });

        onClose?.(); // modal band
        return;      // create flow yahin ruk jaayega
      }

      /* ================= CREATE ================= */
      const { event_id, ...payload } = formData;

      const res = await api.post(
        `/events/${event_id}/agendas`,
        payload
      );

      toast.success("Agenda created successfully");


      onSuccess?.({
        agenda_id: res.data?.agenda_id,
        event_id,
        ...payload,
      });
      reset();
      // onSuccess?.();
      onClose?.();

    } catch (err) {
      console.error("AGENDA SAVE ERROR", err);
      toast.error("Failed to save agenda");
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>

      {/* ================= EVENT + TYPE ================= */}
      <Row className="g-3">
        {!isEdit && (
          <Col md={6}>
            <Form.Label>
              Event <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              {...register("event_id", { required: "Event is required" })}
              disabled={loadingEvents}
            >
              <option value="">
                {loadingEvents ? "Loading events..." : "Select Event"}
              </option>
              {events.map((e) => (
                <option key={e.event_id} value={e.event_id}>
                  {e.name}
                </option>
              ))}
            </Form.Select>
            <small className="text-danger">{errors.event_id?.message}</small>
          </Col>
        )}

        <Col md={isEdit ? 12 : 6}>
          <Form.Label>
            Agenda Type <span className="text-danger">*</span>
          </Form.Label>

          <Form.Select
            {...(!isEdit ? register("agenda_type", { required: "Agenda type is required" }) : {})}
            disabled={isEdit}
            defaultValue={agenda?.agenda_type || ""}
          >
            <option value="">Select type</option>
            <option value="event">Event</option>
            <option value="meeting">Meeting</option>
            <option value="setup">Setup & Rehearsal</option>
            {/* <option value="rehearsal">Rehearsal</option> */}
          </Form.Select>

          {!isEdit && (
            <small className="text-danger">
              {errors.agenda_type?.message}
            </small>
          )}
        </Col>


        {/* ================= TITLE ================= */}
        <Col md={12}>
          <Form.Label>
            Title <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            {...register("title", { required: true })}
            disabled={isEdit}
          />
        </Col>

        {/* ================= DATE & TIME ================= */}
        <Col md={4}>
          <Form.Label>Date *</Form.Label>
          <Form.Control type="date" {...register("agenda_date", { required: true })} />
        </Col>

        <Col md={4}>
          <Form.Label>Start Time *</Form.Label>
          <Form.Control type="time" {...register("start_time", { required: true })} />
        </Col>

        <Col md={4}>
          <Form.Label>End Time *</Form.Label>
          <Form.Control
            type="time"
            {...register("end_time", {
              required: true,
              validate: (value) =>
                !startTime || value > startTime || "End time must be after start time",
            })}
          />
          <small className="text-danger">{errors.end_time?.message}</small>
        </Col>

        {/* ================= LOCATION ================= */}
        <Col md={12}>
          <Form.Label>Location</Form.Label>
          <Form.Control {...register("location")} />
        </Col>
      </Row>

      <hr className="my-4" />

      {/* ================= PIC ================= */}
      <h6>Person In Charge</h6>
      <Row className="g-3">
        <Col md={6}><Form.Control placeholder="Name" {...register("pic_name")} /></Col>
        <Col md={6}><Form.Control placeholder="Role" {...register("pic_role")} /></Col>
        <Col md={6}><Form.Control placeholder="Phone" {...register("pic_phone")} /></Col>
        <Col md={6}><Form.Control
          placeholder="Email"
          {...register("pic_email", {
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          })}
        />
          <small className="text-danger">{errors.pic_email?.message}</small>
        </Col>
      </Row>

      <hr className="my-4" />

      {/* ================= NOTES ================= */}
      <Form.Label>Notes</Form.Label>
      <Form.Control as="textarea" rows={3} {...register("notes")} />

      {/* ================= ACTION ================= */}
      <div className="d-flex justify-content-end gap-2 mt-4">
        <Button
          variant=""
          className="bg-secondary-100 text-grey-10"
          onClick={() => {
            if (!isEdit) reset();
            onClose?.();
          }}

        >
          Cancel
        </Button>

        <Button variant="" type="submit" className="bg-primary-100 text-grey-10" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Spinner size="sm" className="me-2" />
              Saving...
            </>
          ) : (
            isEdit ? "Update Agenda" : "Create Agenda"
          )}
        </Button>

      </div>
    </Form>
  );
}

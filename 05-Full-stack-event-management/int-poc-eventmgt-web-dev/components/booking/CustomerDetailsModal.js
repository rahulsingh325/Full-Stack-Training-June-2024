"use client";

import { useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { useRouter } from "next/navigation";
import api from "@/helper/api";
import * as Yup from "yup";

/* =========================
   VALIDATION SCHEMA
========================= */
const customerSchema = Yup.object({
  customer_name: Yup.string().required("Full name is required"),
  customer_email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  customer_phone: Yup.string().required("Phone number is required"),
  customer_address: Yup.string(),
});

export default function CustomerDetailsModal({
  show,
  onHide,
  eventId,
  selected,
}) {
  const router = useRouter();

  /* =========================
     STATE
  ========================= */
  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    customer_address: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  /* =========================
     HANDLERS
  ========================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // clear field error on change
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const buildItems = () =>
    Object.entries(selected)
      .filter(([_, qty]) => qty > 0)
      .map(([ticket_id, quantity]) => ({
        ticket_id,
        quantity,
      }));

  /* =========================
     SCHEMA VALIDATION
  ========================= */
  const validateForm = async () => {
    try {
      await customerSchema.validate(form, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((e) => {
        validationErrors[e.path] = e.message;
      });
      setErrors(validationErrors);
      return false;
    }
  };

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = async () => {
    const isValid = await validateForm();
    if (!isValid) return;

    const items = buildItems();
    if (!items.length) {
      setErrors({ form: "No tickets selected" });
      return;
    }

    setLoading(true);

    try {
      const payload = {
        event_id: eventId,
        ...form,
        items,
      };

      const res = await api.post("/bookings/create", payload);
      router.push(`/bookings/${res.data?.booking_id}`);
    } catch (err) {
      setErrors({
        form:
          err?.response?.data?.message ||
          "Failed to create booking",
      });
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     UI
  ========================= */
  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Customer Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form noValidate>
          {/* NAME */}
          <Form.Group className="mb-3">
            <Form.Label>Full Name *</Form.Label>
            <Form.Control
              type="text"
              name="customer_name"
              value={form.customer_name}
              onChange={handleChange}
              isInvalid={!!errors.customer_name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.customer_name}
            </Form.Control.Feedback>
          </Form.Group>

          {/* EMAIL */}
          <Form.Group className="mb-3">
            <Form.Label>Email *</Form.Label>
            <Form.Control
              type="email"
              name="customer_email"
              value={form.customer_email}
              onChange={handleChange}
              isInvalid={!!errors.customer_email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.customer_email}
            </Form.Control.Feedback>
          </Form.Group>

          {/* PHONE */}
          <Form.Group className="mb-3">
            <Form.Label>Phone *</Form.Label>
            <Form.Control
              type="tel"
              name="customer_phone"
              value={form.customer_phone}
              onChange={handleChange}
              isInvalid={!!errors.customer_phone}
            />
            <Form.Control.Feedback type="invalid">
              {errors.customer_phone}
            </Form.Control.Feedback>
          </Form.Group>

          {/* ADDRESS */}
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="customer_address"
              value={form.customer_address}
              onChange={handleChange}
            />
          </Form.Group>

          {/* FORM ERROR */}
          {errors.form && (
            <div className="text-danger small mt-2">
              {errors.form}
            </div>
          )}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={loading}>
          Cancel
        </Button>

        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? (
            <>
              <Spinner size="sm" animation="border" className="me-2" />
              Booking...
            </>
          ) : (
            "Confirm Booking"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

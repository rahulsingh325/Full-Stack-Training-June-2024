"use client";

import { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import api from "@/helper/api";

export default function EditInvoiceModal({
  show,
  onClose,
  invoice,
  onSuccess,
}) {
  const [form, setForm] = useState({
    bill_to_name: "",
    bill_to_email: "",
    bill_to_address: "",
    notes: "",
    due_date: "",
  });

  const [saving, setSaving] = useState(false);

  /* ---------- PREFILL FORM ---------- */
  useEffect(() => {
    if (!invoice) return;

    setForm({
      bill_to_name: invoice.bill_to?.name || "",
      bill_to_email: invoice.bill_to?.email || "",
      bill_to_address: invoice.bill_to?.address || "",
      notes: invoice.note || "",
      due_date: invoice.due_date
        ? invoice.due_date.split("T")[0]
        : "",
    });
  }, [invoice]);

  /* ---------- HANDLERS ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (invoice.is_locked) return; 

    try {
      setSaving(true);

      await api.put(
        `/invoices/edit/${invoice.invoice_id}`,         {
          bill_to_name: form.bill_to_name,
          bill_to_email: form.bill_to_email,
          bill_to_address: form.bill_to_address,
          notes: form.notes,
          due_date: form.due_date
            ? `${form.due_date}T00:00:00Z`
            : null,
        }
      );

      onSuccess?.();
      onClose();
    } catch (err) {
      alert("Failed to update invoice");
    } finally {
      setSaving(false);
    }
  };

  if (!invoice) return null;

  return (
    <Modal show={show} onHide={!saving ? onClose : undefined} centered>
      <Modal.Header closeButton={!saving}>
        <Modal.Title>Edit Invoice</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* BILL TO */}
        <Form.Group className="mb-3">
          <Form.Label>Bill To Name</Form.Label>
          <Form.Control
            name="bill_to_name"
            value={form.bill_to_name}
            onChange={handleChange}
            disabled={invoice.is_locked}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Bill To Email</Form.Label>
          <Form.Control
            type="email"
            name="bill_to_email"
            value={form.bill_to_email}
            onChange={handleChange}
            disabled={invoice.is_locked}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Bill To Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            name="bill_to_address"
            value={form.bill_to_address}
            onChange={handleChange}
            disabled={invoice.is_locked}
          />
        </Form.Group>

        {/* DUE DATE */}
        <Form.Group className="mb-3">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="date"
            name="due_date"
            value={form.due_date}
            onChange={handleChange}
            disabled={invoice.is_locked}
          />
        </Form.Group>

        {/* NOTES */}
        <Form.Group>
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="notes"
            value={form.notes}
            onChange={handleChange}
            disabled={invoice.is_locked}
          />
        </Form.Group>

        {invoice.is_locked && (
          <div className="text-danger small mt-3">
            This invoice is locked and cannot be edited.
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="" className="bg-secondary-100 text-grey-10"
          disabled={saving}
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          variant="" className="bg-primary-100 text-grey-10"
          disabled={saving || invoice.is_locked}
          onClick={handleSubmit}
        >
          {saving ? (
            <>
              <Spinner size="sm" className="me-2" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

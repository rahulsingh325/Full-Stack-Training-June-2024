"use client";

import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useState } from "react";
import api from "@/helper/api";

export default function ExpenseAddModal({
  show,
  onHide,
  categories = [],
  onExpenseAdded,
}) {
  const [form, setForm] = useState({
    expense_date: "",
    category_id: "",
    description: "",
    amount: "",
    currency: "USD",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitExpense = async () => {
    setError("");

    if (
      !form.expense_date ||
      !form.category_id ||
      !form.amount
    ) {
      setError("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      await api.post("/financials/expenses", {
        expense_date: form.expense_date,
        category_id: form.category_id,
        description: form.description,
        amount: Number(form.amount),
        currency: form.currency,
      });

      onExpenseAdded?.();
      onHide();

      setForm({
        expense_date: "",
        category_id: "",
        description: "",
        amount: "",
        currency: "$",
      });
    } catch (e) {
      setError("Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Expense</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && (
          <div className="alert alert-danger py-2">
            {error}
          </div>
        )}

        <Row>
          {/* DATE */}
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                Expense Date <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="date"
                name="expense_date"
                value={form.expense_date}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          {/* CATEGORY */}
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                Category <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                name="category_id"
                value={form.category_id}
                onChange={handleChange}
              >
                <option value="">Select</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          {/* AMOUNT */}
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                Amount <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          {/* CURRENCY */}
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Currency</Form.Label>
              <Form.Control
                name="currency"
                value={form.currency}
                disabled
              />
            </Form.Group>
          </Col>

          {/* DESCRIPTION */}
          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="description"
                value={form.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="" className="bg-secondary-100 text-grey-10" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="" className="bg-primary-100 text-grey-10" onClick={submitExpense} disabled={loading}>
          {loading ? "Saving..." : "Add Expense"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

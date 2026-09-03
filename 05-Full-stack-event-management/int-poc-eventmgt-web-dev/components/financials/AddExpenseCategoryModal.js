"use client";

import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useState } from "react";
import api from "@/helper/api";

export default function AddExpenseCategoryModal({
  show,
  onHide,
  onCategoryAdded,
}) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addCategory = async () => {
    setError("");

    if (!name.trim()) {
      setError("Category name is required");
      return;
    }

    try {
      setLoading(true);

      await api.post("/financials/expense-categories", {
        name: name.trim(),
      });

      setName("");
      onCategoryAdded?.();
      onHide();
    } catch (e) {
      setError("Failed to add category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Expense Category</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && (
          <Alert variant="danger" className="py-2">
            {error}
          </Alert>
        )}

        <Form.Group>
          <Form.Label>
            Category Name <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            placeholder="e.g. Lighting, Marketing"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="" className="bg-secondary-100 text-grey-10" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="" className="bg-primary-100 text-grey-10" onClick={addCategory} disabled={loading}>
          {loading ? "Saving..." : "Add Category"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

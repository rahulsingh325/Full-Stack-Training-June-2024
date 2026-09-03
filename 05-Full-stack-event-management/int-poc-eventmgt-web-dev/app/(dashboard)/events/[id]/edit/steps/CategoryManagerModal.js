"use client";

import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import api from "@/helper/api";

export default function CategoryManagerModal({
  show,
  onHide,
  categories = [],
  onCategoryChanged,
}) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const createCategory = async () => {
    if (!name.trim()) return;

    try {
      setLoading(true);
      await api.post("/categories/create", { name });
      setName("");
      onCategoryChanged();
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (cat) => {
    if (cat.event_count > 0) return;

    if (!confirm("Delete this category?")) return;

    try {
      setDeletingId(cat.id);
      await api.delete(`/categories/delete/${cat.id}`);
      onCategoryChanged();
    } catch (e) {
      alert("Category is in use");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Manage Categories</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* ADD */}
        <div className="d-flex gap-2 mb-3">
          <Form.Control
            placeholder="New category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button onClick={createCategory} disabled={loading}>
            {loading ? "Saving..." : "Add"}
          </Button>
        </div>

        {/* LIST */}
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="d-flex justify-content-between align-items-center py-2"
          >
            <span>{cat.name}</span>

            <Button
              variant="outline-danger"
              size="sm"
              disabled={cat.event_count > 0 || deletingId === cat.id}
              title={
                cat.event_count > 0
                  ? "Category is used in events"
                  : ""
              }
              onClick={() => deleteCategory(cat)}
            >
              🗑️
            </Button>
          </div>
        ))}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

"use client";

import { Card, Form, Row, Col, Button, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import api from "@/helper/api";
import { merchandiseSchema } from "./schemas/merchandise.schema";

export default function MerchandiseStep({ eventId, setActiveStep, onSaved, }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* form */
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(merchandiseSchema),
    defaultValues: {
      merch: {
        name: "",
        price: "",
        stock: "",
        description: "",
        image: null,
      },
    },
  });

  /* fetch merchandise */
  const fetchMerchandise = async () => {
    try {
      const res = await api.get(`/merchandise/list/${eventId}`);
      setItems(res.data || []);
    } catch (err) {
      console.error("MERCH LIST ERROR", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMerchandise();
  }, [eventId]);

  /* add item */
  const onSubmit = async (data) => {
    try {
      setSaving(true);

      const m = data.merch;

      const payload = {
        event_id: eventId,
        name: m.name,
        price: m.price,
        stock: m.stock,
        description: m.description || null,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));

      if (m.image instanceof File) {
        formData.append("image", m.image);
      }

      await api.post("/merchandise/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("✔ Merchandise added");
      onSaved?.();
      reset();
      fetchMerchandise();
    } catch (err) {
      console.error("MERCH SAVE FAILED", err);
      toast.error("❌ Failed to add merchandise");
    } finally {
      setSaving(false);
    }
  };

  /* delete item */
  const handleDelete = async (merchandiseId) => {
    try {
      await api.delete(`/merchandise/delete/${merchandiseId}`);

      setItems((prev) =>
        prev.filter(
          (m) => String(m.merchandise_id) !== String(merchandiseId)
        )
      );

      toast.success("✔ Item removed");
    } catch {
      toast.error("❌ Failed to delete item");
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
      <h5 className="mb-4">Merchandise</h5>

      {/* ADD FORM */}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Item Name <span className="text-danger">*</span></Form.Label>
              <Form.Control
                {...register("merch.name")}
                isInvalid={!!errors?.merch?.name}
              />
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Price <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="number"
                {...register("merch.price", { valueAsNumber: true })}
                isInvalid={!!errors?.merch?.price}
              />
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Stock <span className="text-danger">*</span> </Form.Label>
              <Form.Control
                type="number"
                {...register("merch.stock", { valueAsNumber: true })}
                isInvalid={!!errors?.merch?.stock}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                {...register("merch.description")}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                Product Image <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                isInvalid={!!errors?.merch?.image}
                onChange={(e) =>
                  reset((prev) => ({
                    ...prev,
                    merch: {
                      ...prev.merch,
                      image: e.target.files?.[0] || null,
                    },
                  }))
                }
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-end">
          <Button type="submit" disabled={saving} className="bg-secondary-100 text-grey-10">
            {saving ? "Saving..." : "Add Merchandise"}
          </Button>
        </div>
      </Form>

      {/* LIST */}
      <Card className="p-3 mt-4 bg-light border">
        <h6 className="mb-3">Added Merchandise</h6>

        {items.length === 0 && (
          <div className="text-muted text-center py-3">
            No merchandise available
          </div>
        )}

        {items.map((m) => (
          <div
            key={m.merchandise_id}
            className="border rounded p-2 mb-2 d-flex justify-content-between align-items-center bg-white"
          >
            <div>
              <strong>{m.name}</strong>
              <div className="small text-muted">
                ${m.price} • Stock: {m.stock}
              </div>
            </div>

            <Button
              size="sm"
              variant="outline-danger"
              onClick={() => handleDelete(m.merchandise_id)}
            >
              Remove
            </Button>
          </div>
        ))}
      </Card>

      {/* CONTINUE */}
      <div className="d-flex justify-content-end mt-4">
        <Button
          onClick={() => {
            onSaved?.();
            setActiveStep?.("partners");
          }}
          className="bg-secondary-100 text-grey-10"
        >
          Save & Continue
        </Button>

      </div>
    </Card>
  );
}

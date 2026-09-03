"use client";

import { Card, Form, Row, Col, Button, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import api from "@/helper/api";
import { partnersSchema } from "./schemas/partners.schema";

export default function PartnersStep({ eventId, setActiveStep, onSaved }) {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* form setup */
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(partnersSchema),
    defaultValues: {
      partner: {
        name: "",
        role: "",
        website: "",
        logo: null,
      },
    },
  });

  /* load partners */
  const fetchPartners = async () => {
    try {
      const res = await api.get(`/partners/list/${eventId}`);
      setPartners(res.data || []);
    } catch (err) {
      console.error("PARTNER LIST ERROR", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, [eventId]);

  /* add partner */
  const onSubmit = async (data) => {
    try {
      setSaving(true);

      const p = data.partner;
      const formData = new FormData();

      formData.append("event_id", eventId);
      formData.append("name", p.name);
      if (p.role) formData.append("role", p.role);
      if (p.website) formData.append("website", p.website);
      if (p.logo instanceof File) formData.append("logo", p.logo);

      await api.post("/partners/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Partner added");
      onSaved?.();
      reset();
      fetchPartners();
    } catch {
      toast.error("Failed to add partner");
    } finally {
      setSaving(false);
    }
  };

  /* delete partner */
  const handleDelete = async (partnerId) => {
    try {
      await api.delete(`/partners/delete/${partnerId}`);

      setPartners((prev) =>
        prev.filter((p) => p.partner_id !== partnerId)
      );

      toast.success("Partner removed");
    } catch {
      toast.error("Failed to delete partner");
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
      <h5 className="mb-4">Partners</h5>

      {/* add partner form */}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Partner Name <span className="text-danger">*</span></Form.Label>
              <Form.Control
                {...register("partner.name")}
                isInvalid={!!errors?.partner?.name}
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Control {...register("partner.role")} />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Website</Form.Label>
              <Form.Control {...register("partner.website")} />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Partner Logo</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setValue("partner.logo", e.target.files?.[0] || null)
                }
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-end">
          <Button type="submit" disabled={saving} className="bg-secondary-100 text-grey-10">
            {saving ? (
              <>
                <Spinner size="sm" className="me-2" />
                Adding...
              </>
            ) : (
              "Add Partner"
            )}
          </Button>
        </div>
      </Form>

      {/* partner list */}
      <Card className="p-3 mt-4 bg-light border">
        <h6 className="mb-3">Added Partners</h6>

        {partners.length === 0 && (
          <div className="text-muted text-center py-3">
            No partners added yet
          </div>
        )}

        {partners.map((p) => (
          <div
            key={p.partner_id}
            className="border rounded p-2 mb-2 d-flex justify-content-between align-items-center bg-white"
          >
            <div className="d-flex align-items-center gap-2">
              {p.logo_url && (
                <img
                  src={p.logo_url}
                  alt={p.name}
                  className="rounded border"
                  style={{ width: 40, height: 40, objectFit: "contain" }}
                />
              )}
              <div>
                <strong>{p.name}</strong>
                {p.role && (
                  <div className="small text-muted">{p.role}</div>
                )}
              </div>
            </div>

            <Button
              size="sm"
              variant="outline-danger"
              onClick={() => handleDelete(p.partner_id)}
            >
              Remove
            </Button>
          </div>
        ))}
      </Card>

      {/* continue */}
      <div className="d-flex justify-content-end mt-4">
        <Button
          onClick={() => {
            onSaved?.();
            setActiveStep?.("notes");
          }}
          className="bg-secondary-100 text-grey-10"
        >
          Save & Continue
        </Button>

      </div>
    </Card>
  );
}

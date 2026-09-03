"use client";

import { Card, Form, Row, Col, Button, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import api from "@/helper/api";
import { venueSchema } from "./schemas/venue.schema";
import { useRouter } from "next/navigation";

export default function VenueStep({ eventId, setActiveStep, setHasVenue, onVenueSaved, }) {
  const [loading, setLoading] = useState(true);
  const [existingVenue, setExistingVenue] = useState(null);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(venueSchema),
    defaultValues: {
      venue: {
        name: "",
        address: "",
        city: "",
        state: "",
        country: "",
        map_link: "",
        landmark: "",
        has_parking: false,
        gates_count: "",
        seat_plan_image: null,
        map_image: null,
        by_car: "",
        by_metro: "",
        by_bus: "",
      },
    },
  });


  useEffect(() => {
    if (!eventId) return;

    const fetchVenue = async () => {
      try {
        const res = await api.get(`/venue/get/${eventId}`);

        if (res.data) {
          setExistingVenue(res.data);
          reset({
            venue: {
              name: res.data.name || "",
              address: res.data.address || "",
              city: res.data.city || "",
              state: res.data.state || "",
              country: res.data.country || "",
              map_link: res.data.map_link || "",
              landmark: res.data.landmark || "",
              has_parking: res.data.has_parking ?? false,
              gates_count: res.data.gates_count || "",
              seat_plan_image: null,
              map_image: null,
              by_car: res.data.by_car || "",
              by_metro: res.data.by_metro || "",
              by_bus: res.data.by_bus || "",
            },
          });
        } else {
          //  first time venue
          setExistingVenue(null);
        }
      } catch {
        setExistingVenue(null);
      } finally {
        setLoading(false); // 🔥 spinner stop
      }
    };

    fetchVenue();
  }, [eventId, reset]);


  /* submit */
  const onSubmit = async (data) => {
    if (!eventId) {
      toast.error("Event ID missing. Please reload the page.");
      return;
    }
    try {
      setSaving(true);

      const v = data.venue;
      const payload = {
        event_id: eventId,
        name: v.name,
        address: v.address,
        city: v.city,
        state: v.state || null,
        country: v.country,
        map_link: v.map_link || null,
        landmark: v.landmark || null,
        has_parking: v.has_parking,
        gates_count: v.gates_count,
        by_car: v.by_car || null,
        by_metro: v.by_metro || null,
        by_bus: v.by_bus || null,
      };

      const formData = new FormData();
      formData.append("event_id", eventId);
      formData.append("data", JSON.stringify(payload));

      if (v.seat_plan_image instanceof File) {
        formData.append("seat_plan_image", v.seat_plan_image);
      }
      if (v.map_image instanceof File) {
        formData.append("map_image", v.map_image);
      }

      if (existingVenue) {
        try {
          await api.delete(`/venue/delete/${eventId}`);
        } catch { }
      }

      await api.post("/venue/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setHasVenue(true);
      onVenueSaved?.();
      toast.success("Venue saved successfully");
      setActiveStep("seat-zones");
      router.push(`/events/${eventId}/edit?step=seat-zones`);
    } catch (err) {
      console.error("VENUE SAVE FAILED", err);
      toast.error("Failed to save venue");
    } finally {
      setSaving(false);
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
      <h5 className="mb-4">Venue Details</h5>

      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* BASIC INFO */}
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                Venue Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control {...register("venue.name")} />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                Address <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control {...register("venue.address")} />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>
                City <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control {...register("venue.city")} />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>State</Form.Label>
              <Form.Control {...register("venue.state")} />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>
                Country <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control {...register("venue.country")} />
            </Form.Group>
          </Col>
        </Row>

        {/* MAP INFO */}
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Google Map Link</Form.Label>
              <Form.Control {...register("venue.map_link")} />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Landmark</Form.Label>
              <Form.Control {...register("venue.landmark")} />
            </Form.Group>
          </Col>
        </Row>

        {/* IMAGES */}
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                Seat Plan Image <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setValue("venue.seat_plan_image", e.target.files?.[0] || null, {
                    shouldValidate: true,
                  })
                }
              />
              {existingVenue?.seat_plan_image_url && (
                <small className="text-muted">
                  Seat plan already uploaded
                </small>
              )}
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                Venue Map Image <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setValue("venue.map_image", e.target.files?.[0] || null, {
                    shouldValidate: true,
                  })
                }
              />
              {existingVenue?.map_image_url && (
                <small className="text-muted">
                  Venue map already uploaded
                </small>
              )}
            </Form.Group>
          </Col>
        </Row>

        {/* ACCESS */}
        <Row className="align-items-center">
          <Col md={6}>
            <Form.Check
              type="checkbox"
              label="Parking Available"
              {...register("venue.has_parking")}
            />
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>
                Entry Gates <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                min={1}
                {...register("venue.gates_count", {
                  valueAsNumber: true,
                })}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* GETTING THERE */}
        <Card className="p-3 mt-4 bg-light border">
          <h6 className="mb-3">Getting There</h6>
          <Form.Control
            className="mb-2"
            placeholder="By Car"
            {...register("venue.by_car")}
          />
          <Form.Control
            className="mb-2"
            placeholder="By Metro"
            {...register("venue.by_metro")}
          />
          <Form.Control
            placeholder="By Bus"
            {...register("venue.by_bus")}
          />
        </Card>

        <div className="d-flex justify-content-end mt-4">
          <Button type="submit" disabled={saving} className="bg-secondary-100">
            {saving ? "Saving..." : "Save & Continue"}
          </Button>
        </div>
      </Form>
      {existingVenue && (
        <div className="mt-4 p-3 border rounded bg-success-subtle">
          <div className="fw-semibold text-success mb-1">
            ✅ Venue has already been added
          </div>

          <div className="small text-muted">
            To add a different venue, please remove the existing venue first and then add a new one.
          </div>

          <div className="d-flex gap-2 mt-3">
            <Button
              size="sm"
              variant="outline-danger"
              onClick={async () => {
                await api.delete(`/venue/delete/${eventId}`);
                setExistingVenue(null);
                setHasVenue(false);
                toast.success("Venue removed. You can now add a new venue.");
              }}
            >
              Remove Venue
            </Button>
          </div>
        </div>
      )}

    </Card>
  );
}

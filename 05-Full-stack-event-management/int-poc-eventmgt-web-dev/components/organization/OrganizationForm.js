"use client";

import { Button, Form, Row, Col, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "@/helper/api";

/* ================= VALIDATION ================= */
const schema = yup.object({
  name: yup.string().required("Organization name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  address: yup.string().required("Address is required"),
  tax_id: yup.string().nullable(),
});

const Star = () => <span className="text-danger">*</span>;

export default function OrganizationForm({ data, onSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: data?.name || "",
      email: data?.email || "",
      phone: data?.phone || "",
      address: data?.address || "",
      tax_id: data?.tax_id || "",
    },
  });

  const onSubmit = async (values) => {
    try {
      if (data?.id) {
        await api.put(`/organization/update/${data.id}`, values);
      } else {
        await api.post("/organization/create", values);
        
      }
      onSuccess?.();
    } catch (err) {
      console.error("Organization save failed", err);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <fieldset disabled={isSubmitting}>

        <Row className="g-3">

          <Col md={6}>
            <Form.Group>
              <Form.Label>
                Organization Name <Star />
              </Form.Label>
              <Form.Control
                {...register("name")}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>
                Email <Star />
              </Form.Label>
              <Form.Control
                type="email"
                {...register("email")}
                disabled={!!data || isSubmitting}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>
                Phone <Star />
              </Form.Label>
              <Form.Control
                {...register("phone")}
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>GST / Tax ID</Form.Label>
              <Form.Control {...register("tax_id")} />
            </Form.Group>
          </Col>

          <Col md={12}>
            <Form.Group>
              <Form.Label>
                Address <Star />
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                {...register("address")}
                isInvalid={!!errors.address}
              />
              <Form.Control.Feedback type="invalid">
                {errors.address?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

        </Row>

      </fieldset>

      {/* SUBMIT BUTTON */}
      <div className="mt-4 d-flex justify-content-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Spinner size="sm" className="me-2" />
              Saving...
            </>
          ) : data ? (
            "Update Organization"
          ) : (
            "Create Organization"
          )}
        </Button>
      </div>
    </Form>
  );
}

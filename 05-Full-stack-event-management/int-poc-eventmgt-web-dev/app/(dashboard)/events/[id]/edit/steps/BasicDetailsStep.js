// app/(dashboard)/events/[id]/edit/steps/BasicDetailsStep.js

import { useEffect, useState } from "react";
import api from "@/helper/api";
import { Button, InputGroup } from "react-bootstrap";
import { Card, Form, Row, Col, Alert } from "react-bootstrap";
import { useFormContext, Controller, useWatch } from "react-hook-form";
import CategoryManagerModal from "./CategoryManagerModal";

export default function BasicDetailsStep({
  categories = [],
  mode = "edit",
  initialData,
  onCategoryChanged,
}) {
  const {
    register,
    setValue,
    control,
    formState: { errors },
  } = useFormContext();

  const hasPreShow = useWatch({
    control,
    name: "basic_details.has_pre_show",
  });

  const hasOpening = useWatch({
    control,
    name: "basic_details.has_opening",
  });
  const isEdit = mode === "edit";

  // safe status check
  const isActive =
    isEdit &&
    String(initialData?.status || "").toLowerCase() === "active";

  const isCalendarLocked = isEdit;

  const isFullyLocked = isActive;

  const [showCategoryModal, setShowCategoryModal] = useState(false);

  useEffect(() => {
    if (!hasPreShow) {
      setValue("basic_details.pre_show_start", null);
      setValue("basic_details.pre_show_end", null);
    }
  }, [hasPreShow]);



  useEffect(() => {
    if (!hasOpening) {
      setValue("basic_details.opening_start", null);
      setValue("basic_details.opening_end", null);
    }
  }, [hasOpening]);

  return (
    <Card className="p-3 mb-4">
      <h5>Basic Details</h5>

      {isActive && (
        <Alert variant="warning" className="mb-3">
          🔒 This event is live.
          Only <strong>Description</strong> and <strong>Terms</strong> can be updated.
        </Alert>
      )}

      <Row>
        {/* EVENT NAME */}
        <Col xs={12} lg={6}>
          <Form.Group className="mb-3">
            <Form.Label>
              Event Name <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              {...register("basic_details.name")}
              disabled={isFullyLocked}
              isInvalid={!!errors?.basic_details?.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors?.basic_details?.name?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col xs={12} lg={6}>
          <Form.Group className="mb-3">

            <div className="d-flex justify-content-between align-items-center mb-1">
              <Form.Label className="mb-0">
                Category <span className="text-danger">*</span>
              </Form.Label>

              {!isFullyLocked && (
                <Button
                variant="none"
                  size="sm"
                  onClick={() => setShowCategoryModal(true)}
                  className="bg-primary-100 text-grey-10"
                >
                  Add / Manage
                </Button>
              )}
            </div>

            <Controller
              name="basic_details.category_id"
              control={control}
              render={({ field }) => (
                <Form.Select
                  {...field}
                  value={field.value || ""}
                  isInvalid={!!errors?.basic_details?.category_id}
                >
                  <option value="">Select</option>
                  {categories.map((cat) => (
                    <option key={String(cat.id)} value={String(cat.id)}>
                      {cat.name}
                    </option>
                  ))}
                </Form.Select>
              )}
            />

            <Form.Control.Feedback type="invalid">
              {errors?.basic_details?.category_id?.message}
            </Form.Control.Feedback>

            {/*  ONLY MODAL CALL */}
            <CategoryManagerModal
              show={showCategoryModal}
              onHide={() => setShowCategoryModal(false)}
              categories={categories}
              onCategoryChanged={onCategoryChanged}
            />

          </Form.Group>
        </Col>



        {/* DESCRIPTION (ALWAYS EDITABLE) */}
        <Col xs={12} lg={6}>
          <Form.Group className="mb-3">
            <Form.Label>
              Description <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              {...register("basic_details.description")}
              isInvalid={!!errors?.basic_details?.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors?.basic_details?.description?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        {/* BANNER */}
        <Col xs={12} lg={6}>
          <Form.Group className="mb-3">
            <Form.Label>
              Banner Image {!isEdit && <span className="text-danger">*</span>}
            </Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              disabled={isFullyLocked}
              onChange={(e) =>
                setValue(
                  "basic_details.banner_image",
                  e.target.files?.[0] || null,
                  { shouldValidate: true }
                )
              }
              isInvalid={!!errors?.basic_details?.banner_image}
            />
            {isEdit && initialData?.banner_image_url && (
              <small className="text-muted">
                Current banner already uploaded
              </small>
            )}
          </Form.Group>
        </Col>

        {/* EVENT DATE (CALENDAR CONTROLLED) */}
        <Col xs={12} md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Event Date</Form.Label>
            <Form.Control
              type="date"
              {...register("basic_details.event_date")}
              disabled={isCalendarLocked}
            />
          </Form.Group>
        </Col>

        {/* START TIME */}
        <Col xs={12} md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Start Time</Form.Label>
            <Form.Control
              type="time"
              {...register("basic_details.start_time")}
              disabled={isCalendarLocked}
            />
          </Form.Group>
        </Col>

        {/* END TIME */}
        <Col xs={12} md={4}>
          <Form.Group className="mb-3">
            <Form.Label>End Time</Form.Label>
            <Form.Control
              type="time"
              {...register("basic_details.end_time")}
              disabled={isCalendarLocked}
            />
          </Form.Group>
        </Col>

        {/* GATE OPEN */}
        <Col xs={12} md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Gate Open Time</Form.Label>
            <Form.Control
              type="time"
              {...register("basic_details.gate_open_time")}
              disabled={isFullyLocked}
            />
          </Form.Group>
        </Col>

        {/* LAST ENTRY */}
        <Col xs={12} md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Last Entry Time</Form.Label>
            <Form.Control
              type="time"
              {...register("basic_details.last_entry_time")}
              disabled={isFullyLocked}
            />
          </Form.Group>
        </Col>

        {/* LOCATION (CALENDAR CONTROLLED) */}
        <Col xs={12} md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              {...register("basic_details.location")}
              disabled={isCalendarLocked}
            />
          </Form.Group>
        </Col>

        {/*has_pre_show ui */}

        <Col xs={12} lg={6}>
          <Controller
            name="basic_details.has_pre_show"
            control={control}
            render={({ field }) => (
              <Form.Check
                type="checkbox"
                label="Has Pre-show"
                checked={!!field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
        </Col>



        {hasPreShow && (
          <>
            <Col xs={12} lg={6}>
              <Form.Group>
                <Form.Label>Pre-show Start</Form.Label>
                <Form.Control
                  type="time"
                  {...register("basic_details.pre_show_start")}
                  isInvalid={!!errors?.basic_details?.pre_show_start}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.basic_details?.pre_show_start?.message}
                </Form.Control.Feedback>

              </Form.Group>
            </Col>

            <Col xs={12} lg={6}>
              <Form.Group>
                <Form.Label>Pre-show End</Form.Label>
                <Form.Control
                  type="time"
                  {...register("basic_details.pre_show_end")}
                />
              </Form.Group>
            </Col>
          </>
        )}

        <Col xs={12} md={6}>
          <Controller
            name="basic_details.has_opening"
            control={control}
            render={({ field }) => (
              <Form.Check
                type="checkbox"
                label="Has Opening Act"
                checked={!!field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
        </Col>



        {hasOpening && (
          <>
            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>Opening Start</Form.Label>
                <Form.Control
                  type="time"
                  {...register("basic_details.opening_start")}
                />
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>Opening End</Form.Label>
                <Form.Control
                  type="time"
                  {...register("basic_details.opening_end")}
                />
              </Form.Group>
            </Col>
          </>
        )}



        {/* TERMS (ALWAYS EDITABLE) */}
        <Col md={12}>
          <Form.Group className="mb-3">
            <Form.Label>Terms & Conditions</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              {...register("basic_details.terms")}
            />
          </Form.Group>
        </Col>
      </Row>
    </Card>

  );

}

"use client";

import { useEffect, useState } from "react";
import { Button, Form, Card, Alert } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "@/helper/api";

import { basicDetailsSchema } from "@/app/(dashboard)/events/[id]/edit/steps/schemas/basicDetails.schema";
import BasicDetailsStep from "@/app/(dashboard)/events/[id]/edit/steps/BasicDetailsStep";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function EventForm() {
  const [categories, setCategories] = useState([]);
  const [draftSaved, setDraftSaved] = useState(false);
  const [createdEventId, setCreatedEventId] = useState(null);

  const router = useRouter();

  const fetchCategories = async () => {
    const res = await api.get("/categories/list");
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /* =========================
     FORM
  ========================= */
  const methods = useForm({
    resolver: yupResolver(basicDetailsSchema),
    context: { isEdit: false }, // 🔒 CREATE MODE
    shouldUnregister: false,
    defaultValues: {
      basic_details: {
        name: "",
        category_id: "",
        description: "",
        location: "",
        event_date: "",
        start_time: "",
        end_time: "",
        gate_open_time: "",
        last_entry_time: "",
        terms: "",
        banner_image: null,

        has_pre_show: false,
        has_opening: false,
        pre_show_start: null,
        pre_show_end: null,
        opening_start: null,
        opening_end: null,
      },
    },
  });

  /* =========================
     SUBMIT (CREATE ONLY)
  ========================= */
  const onSubmit = async (data) => {
    const bd = data.basic_details;

    const payload = {
      name: bd.name,
      description: bd.description,
      category_id: bd.category_id,

      location: bd.location,
      event_date: bd.event_date,
      start_time: bd.start_time,
      end_time: bd.end_time,

      gate_open_time: bd.gate_open_time || null,
      last_entry_time: bd.last_entry_time || null,

      has_pre_show: bd.has_pre_show,
      pre_show_start: bd.has_pre_show ? bd.pre_show_start : null,
      pre_show_end: bd.has_pre_show ? bd.pre_show_end : null,

      has_opening: bd.has_opening,
      opening_start: bd.has_opening ? bd.opening_start : null,
      opening_end: bd.has_opening ? bd.opening_end : null,
      terms: bd.terms || null,
    };

    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));

      if (bd.banner_image instanceof File) {
        formData.append("banner_image", bd.banner_image);
      } else {
        formData.append("keep_existing_banner", "true");
      }

      const res = await api.post("/events/draft", formData);

      setCreatedEventId(res.data.event_id);
      setDraftSaved(true);

      router.push(`/events/${res.data.event_id}/edit?step=venue`);

      toast.success("✔ Event draft created successfully");

    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to create event");

    }
  };

  /* =========================
     UI
  ========================= */
  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className="p-3 mb-4">
          <h5>Step 1: Basic Details</h5>

          <BasicDetailsStep
            categories={categories}
            mode="create"
            onCategoryChanged={fetchCategories}
          />
        </Card>

        <Button type="submit" className="bg-secondary-100">
          Save & Continue
        </Button>

        {draftSaved && (
          <Alert variant="success" className="mt-3">
            ✔ Event draft created
          </Alert>
        )}
      </Form>
    </FormProvider>
  );
}

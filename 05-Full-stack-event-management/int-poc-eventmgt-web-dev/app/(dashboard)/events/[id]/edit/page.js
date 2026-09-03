"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/helper/api";

import { Container, Row, Col, Spinner, Form, Button } from "react-bootstrap";
import EventSidebar from "./EventSidebar";

import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import { basicDetailsSchema } from "./steps/schemas/basicDetails.schema";

import BasicDetailsStep from "./steps/BasicDetailsStep";
import VenueStep from "./steps/VenueStep";
import TicketsStep from "./steps/TicketsStep";
import MerchandiseStep from "./steps/MerchandiseStep";
import PartnersStep from "./steps/PartnersStep";
import NotesStep from "./steps/NotesStep";
import SeatZonesStep from "./steps/SeatZonesStep";

export default function EventEditorPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const stepFromUrl = searchParams.get("step");

  const [event, setEvent] = useState(null);
  const [categories, setCategories] = useState([]);
  const [activeStep, setActiveStep] = useState("basic");
  const [hasVenue, setHasVenue] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasSeatZones, setHasSeatZones] = useState(false);
  const [savedSteps, setSavedSteps] = useState({});

  const [isBasicReady, setIsBasicReady] = useState(false);

  /* =========================
     FETCH EVENT
  ========================= */
  const fetchEvent = async () => {
    try {
      const res = await api.get(`/events/events_detail/${id}`);
      const raw = res.data;

      setEvent({
        event_id: raw.event?.event_id || raw[0]?.[0]?.event_id,
        name: raw.event?.name || raw[0]?.[0]?.name,
        description: raw.event?.description || raw[0]?.[0]?.description,
        status: raw.event?.status || raw[0]?.[0]?.status,
        category_id: raw.event?.category_id || raw[0]?.[0]?.category_id,

        event_date: raw.calendar?.agenda_date || raw[1]?.[0]?.agenda_date,
        start_time: raw.calendar?.start_time || raw[1]?.[0]?.start_time,
        end_time: raw.calendar?.end_time || raw[1]?.[0]?.end_time,
        location: raw.venue?.address || raw[1]?.[0]?.location,

        gate_open_time: raw.timings?.gate_open_time || raw[2]?.[0]?.gate_open_time,
        last_entry_time: raw.timings?.last_entry_time || raw[2]?.[0]?.last_entry_time,

        terms: raw.terms?.terms || raw[7]?.[0]?.terms,
      });
    } catch (err) {
      console.error("EVENT FETCH ERROR", err);
      setEvent(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchEvent();
  }, [id]);

  useEffect(() => {
    api.get("/categories/list")
      .then((res) => setCategories(res.data))
      .catch(() => console.error("CATEGORY FETCH ERROR"));
  }, []);

  // Fetch Seat-Zones
  useEffect(() => {
    if (!event?.event_id) return;

    api
      .get(`/seat_zones/list/${event.event_id}`)
      .then((res) => setHasSeatZones(res.data?.length > 0))
      .catch(() => setHasSeatZones(false));
  }, [event?.event_id]);


  useEffect(() => {
    if (!event?.event_id) return;

    api.get(`/venue/get/${event.event_id}`)
      .then((res) => setHasVenue(!!res.data))
      .catch(() => setHasVenue(false));
  }, [event?.event_id]);

  const markStepSaved = (stepKey) => {
    setSavedSteps((prev) => ({
      ...prev,
      [stepKey]: true,
    }));
  };


  const basicForm = useForm({
    resolver: yupResolver(basicDetailsSchema),
    context: { isEdit: true },
    defaultValues: { basic_details: {} },
    shouldUnregister: false,
  });


  useEffect(() => {
    if (!event || categories.length === 0) return;

    const map = {
      name: event.name,
      category_id: event.category_id,
      description: event.description,
      event_date: event.event_date,
      start_time: event.start_time,
      end_time: event.end_time,
      location: event.location,
      gate_open_time: event.gate_open_time,
      last_entry_time: event.last_entry_time,
      terms: event.terms,

      has_pre_show: event.has_pre_show ?? false,
      pre_show_start: event.pre_show_start ?? null,
      pre_show_end: event.pre_show_end ?? null,

      has_opening: event.has_opening ?? false,
      opening_start: event.opening_start ?? null,
      opening_end: event.opening_end ?? null,
    };

    Object.entries(map).forEach(([key, value]) => {
      basicForm.setValue(`basic_details.${key}`, value ?? "", {
        shouldDirty: false,
        shouldTouch: false,
        shouldValidate: false,
      });
    });

    setIsBasicReady(true);
  }, [event, categories]);

  useEffect(() => {
    if (!stepFromUrl) return;

    const allowedSteps = [
      "basic",
      "venue",
      "seat-zones",
      "tickets",
      "merchandise",
      "partners",
      "notes",
    ];

    if (allowedSteps.includes(stepFromUrl)) {
      setActiveStep(stepFromUrl);
    }
  }, [stepFromUrl]);


  const handleBasicSubmit = async (data) => {
    try {
      const bd = data.basic_details;
      const status = String(event?.status || "").toLowerCase();

      /* ACTIVE EVENT → LIMITED UPDATE ONLY */
      if (status === "active") {
        const payload = {
          description: bd.description,
          terms: bd.terms || null,
        };

        await api.put(
          `/events/${event.event_id}/active`,
          payload
        );

        toast.success("✔ Active event updated");
        fetchEvent();
        return;
      }

      /* DRAFT EVENT → FULL UPDATE  */
      const draftPayload = {
        name: bd.name,
        description: bd.description,
        category_id: bd.category_id,

        gate_open_time: bd.gate_open_time || null,
        last_entry_time: bd.last_entry_time || null,
        terms: bd.terms || null,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(draftPayload));

      // Banner handling
      if (bd.banner_image instanceof File) {
        formData.append("banner_image", bd.banner_image);
      } else {
        formData.append("keep_existing_banner", "true");
      }

      await api.put(
        `/events/draft/${event.event_id}`,
        formData
      );

      toast.success("✔ Draft event updated successfully");
      markStepSaved("basic");
      fetchEvent();

    } catch (err) {
      console.error("UPDATE FAILED", err);
      toast.error("❌ Failed to update event");
    }
  };



  /* LOADING GUARDS */
  if (loading) {
    return (
      <div className="p-5 text-center">
        <Spinner />
      </div>
    );
  }

  if (!event) {
    return <p className="p-4">Event Editorpage not found</p>;
  }

  /* STEP RENDER */
  const renderStep = () => {
    switch (activeStep) {
      case "basic":
        if (!isBasicReady) {
          return (
            <div className="p-5 text-center">
              <Spinner />
            </div>
          );
        }

        return (
          <FormProvider {...basicForm}>
            <Form onSubmit={basicForm.handleSubmit(handleBasicSubmit)}>
              <BasicDetailsStep
                mode="edit"
                isActive={event.status === "active"}
                initialData={event}
                categories={categories}
              />
              <div className="d-flex justify-content-end">
                <Button type="submit">Save Changes</Button>
              </div>
            </Form>
          </FormProvider>
        );


      case "venue":
        return (
          <VenueStep
            eventId={event.event_id}
            setActiveStep={setActiveStep}
            setHasVenue={setHasVenue}
            onVenueSaved={() => {
              markStepSaved("venue");
              fetchEvent();
            }}
          />
        );


      case "seat-zones":
        return (
          <SeatZonesStep
            eventId={event.event_id}
            setActiveStep={setActiveStep}
            setHasSeatZones={setHasSeatZones}
            onSaved={() => markStepSaved("seat-zones")}
          />
        );

      case "tickets":
        return (
          <TicketsStep
            eventId={event.event_id}
            setActiveStep={setActiveStep}
            onSaved={() => markStepSaved("tickets")}
          />
        );

      case "merchandise":
        return (
          <MerchandiseStep
            eventId={event.event_id}
            setActiveStep={setActiveStep}
            onSaved={() => markStepSaved("merchandise")}
          />
        );

      case "partners":
        return (
          <PartnersStep
            eventId={event.event_id}
            setActiveStep={setActiveStep}
            onSaved={() => markStepSaved("partners")}
          />
        );

      case "notes":
        return <NotesStep
          eventId={event.event_id}
          onSaved={() => markStepSaved("notes")}
        />;

      default:
        return null;
    }
  };

  return (
    <Container fluid>

      <Row>
        <Col xl={3} lg={4} md={5}>
          <EventSidebar
            event={event}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            hasVenue={hasVenue}
            hasSeatZones={hasSeatZones}
            savedSteps={savedSteps}
          />

        </Col>

        <Col xl={9} lg={8} md={7}>{renderStep()}</Col>
      </Row>
    </Container>
  );
}

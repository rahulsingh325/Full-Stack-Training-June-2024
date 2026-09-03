"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/helper/api";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import EventDetailsCard from "../components/EventDetailsCard";
import TermsConditionsCard from "../components/TermsConditionsCard";
import OfficialMerchandiseCard from "../components/OfficialMerchandiseCard";
import OurPartnersCard from "../components/OurPartnersCard";
import SeatPlanCard from "../components/SeatPlanCard";
import PackagesCard from "../components/PackagesCard";


export default function EventDetailsPage() {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  /* =========================
     FETCH EVENT DETAILS
     ========================= */
  useEffect(() => {
    if (!id) return;

    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(false);

        const res = await api.get(`/events/events_detail/${id}`);
        setData(res.data);
      } catch (err) {
        console.error("EVENT DETAILS ERROR", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  /* =========================
     UI STATES
     ========================= */
  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4">Failed to load event</p>;
  if (!data) return <p className="p-4">Event not found</p>;

  /* =========================
     NORMALIZE API DATA
     ========================= */
  const {
    event,
    calendar,
    timings,
    venue,
    seat_zones,
    tickets,
    terms,
    notes,
    partners,
    merchandise,
  } = data;

  const eventForUI = {
    event_id: event?.event_id,
    name: event?.name,
    description: event?.description,
    status: event?.status,
    banner_image_url: event?.banner_image_url,

    category: {
      id: event?.category_id,
      name: event?.category_name,
    },

    event_date: calendar?.agenda_date,
    start_time: calendar?.start_time,
    end_time: calendar?.end_time,
    location:
      calendar?.location ||
      [venue?.name, venue?.city, venue?.state].filter(Boolean).join(", "),

    gate_open_time: timings?.gate_open_time,
    last_entry_time: timings?.last_entry_time,

    venue,
    tickets,
    seat_zones,

    getting_there: data.getting_there
  };

  const termsList = terms?.terms ? [terms.terms] : [];
  const notesList = (notes || []).map((n) => n.note);

  /* =========================
     UI
     ========================= */
  return (
    <>
      <Container fluid className="bg-grey-20 p-6 rounded-4">
        <Row className="gx-4 gy-4">
          {/* LEFT COLUMN */}
          <Col xl={7} lg={12}>
            <EventDetailsCard event={eventForUI} />

            <TermsConditionsCard terms={termsList} />

            <OfficialMerchandiseCard items={merchandise || []} />

            <OurPartnersCard partners={partners || []} />
          </Col>

          {/* RIGHT COLUMN */}
          <Col xl={5} lg={12}>
            <SeatPlanCard
              seatPlanImage={venue?.seat_plan_image_url}
              seatZones={seat_zones}
              tickets={tickets}
              notes={notesList}
              ticketBenefits={data.ticket_benefits}
            />

            <PackagesCard
              tickets={tickets}
              ticketBenefits={data.ticket_benefits}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

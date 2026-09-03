
// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { Container, Row, Col, Spinner } from "react-bootstrap";
// import api from "@/helper/api";

// import VoucherHeader from "@/components/booking/voucher/VoucherHeader";
// import VenueMap from "@/components/booking/voucher/VenueMap";
// import ProhibitedItems from "@/components/booking/voucher/ProhibitedItems";
// import EventsSchedule from "@/components/booking/voucher/EventsSchedule";
// import TermsConditionsCard from "@/app/(dashboard)/events/components/TermsConditionsCard";

// export default function Page() {
//   const params = useParams();
//   const voucher_code = params?.voucher_code;

//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!voucher_code) {
//       console.warn(" voucher_code missing from URL");
//       setLoading(false);
//       return;
//     }

//     const fetchDetails = async () => {
//       try {
//         console.log(" Fetching voucher:", voucher_code);

//         const res = await api.get(
//           `/vouchers/details/${voucher_code}`
//         );

//         setData(res?.data || null);
//       } catch (err) {
//         console.error("❌ VOUCHER DETAILS ERROR", err);
//         setData(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDetails();
//   }, [voucher_code]);

//   /* ---------- LOADING ---------- */
//   if (loading) {
//     return (
//       <div className="p-5 text-center">
//         <Spinner animation="border" />
//       </div>
//     );
//   }

//   /* ---------- GUARD ---------- */
//   if (!voucher_code) {
//     return (
//       <div className="p-5 text-center text-danger">
//         Invalid voucher URL
//       </div>
//     );
//   }

//   if (!data || !data.voucher) {
//     return (
//       <div className="p-5 text-center text-muted">
//         Voucher not available
//       </div>
//     );
//   }

//   const {
//     event_schedule = [],
//     terms_and_conditions,
//     prohibited_items = [],
//     venue,
//   } = data;

//   return (
//     <Container fluid className="pb-5">
//       <Row className="mb-4">
//         <Col>
//           <VoucherHeader data={data} />
//         </Col>
//       </Row>

//       <Row className="g-4">
//         <Col lg={6}>
//           {event_schedule.length > 0 && (
//             <EventsSchedule schedule={event_schedule} />
//           )}

//           {terms_and_conditions && (
//             <TermsConditionsCard
//               terms={[terms_and_conditions]}
//               maxHeight={805}
//             />
//           )}
//         </Col>

//         <Col lg={6}>
//           {venue && <VenueMap venueMap={venue} />}
//           {prohibited_items.length > 0 && (
//             <ProhibitedItems items={prohibited_items} />
//           )}
//         </Col>
//       </Row>
//     </Container>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import api from "@/helper/api";

import VoucherHeader from "@/components/booking/voucher/VoucherHeader";
import VenueMap from "@/components/booking/voucher/VenueMap";
import ProhibitedItems from "@/components/booking/voucher/ProhibitedItems";
import EventsSchedule from "@/components/booking/voucher/EventsSchedule";
import TermsConditionsCard from "@/app/(dashboard)/events/components/TermsConditionsCard";

export default function Page() {
  const params = useParams();
  const voucher_code = params?.voucher_code;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH VOUCHER DETAILS ================= */
  useEffect(() => {
    if (!voucher_code) {
      setLoading(false);
      return;
    }

    const fetchDetails = async () => {
      try {
        const res = await api.get(
          `/vouchers/details/${voucher_code}`
        );
        setData(res?.data || null);
      } catch (err) {
        console.error("VOUCHER DETAILS ERROR", err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [voucher_code]);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="p-5 text-center">
        <Spinner animation="border" />
      </div>
    );
  }

  /* ================= GUARDS ================= */
  if (!voucher_code) {
    return (
      <div className="p-5 text-center text-danger">
        Invalid voucher URL
      </div>
    );
  }

  if (!data || !data.voucher) {
    return (
      <div className="p-5 text-center text-muted">
        Voucher not available
      </div>
    );
  }

  /* =========================================================
     🔥 NORMALIZATION LAYER (BACKEND → FRONTEND SHAPE)
     Backend response:
     {
       voucher: {...},
       tickets: [...],
       schedule: { terms },
       prohibited_items: []
     }
  ========================================================= */

  /* ---------- EVENT SCHEDULE ---------- */
  const event_schedule = [];

  // Main event time
  if (
    data.voucher?.start_time &&
    data.voucher?.end_time
  ) {
    event_schedule.push({
      agenda_title: "Event Time",
      agenda_date: data.voucher.agenda_date,
      start_time: data.voucher.start_time,
      end_time: data.voucher.end_time,
    });
  }

  // Ticket based sub-events
  if (
    Array.isArray(data.tickets) &&
    data.tickets.length > 0
  ) {
    const ticket = data.tickets[0];

    if (
      ticket.has_pre_show &&
      ticket.pre_show_start &&
      ticket.pre_show_end
    ) {
      event_schedule.push({
        agenda_title: "Pre Show",
        start_time: ticket.pre_show_start,
        end_time: ticket.pre_show_end,
      });
    }

    if (
      ticket.has_opening &&
      ticket.opening_start &&
      ticket.opening_end
    ) {
      event_schedule.push({
        agenda_title: "Opening Ceremony",
        start_time: ticket.opening_start,
        end_time: ticket.opening_end,
      });
    }
  }

  /* ---------- TERMS & CONDITIONS ---------- */
  const terms_and_conditions =
    data?.terms || null;

  /* ---------- VENUE ---------- */
  const venue =
    data?.voucher?.location ||
    data?.voucher?.venue_map_image
      ? {
          address: data.voucher.location,
          map_image_url:
            data.voucher.venue_map_image,
        }
      : null;

  /* ---------- PROHIBITED ITEMS ---------- */
  const prohibited_items = Array.isArray(
    data.prohibited_items
  )
    ? data.prohibited_items
    : [];

  /* ================= RENDER ================= */
  return (
    <Container fluid className="pb-5">
      {/* HEADER */}
      <Row className="mb-4">
        <Col>
          <VoucherHeader data={data} />
        </Col>
      </Row>

      {/* BODY */}
      <Row className="g-4">
        <Col lg={6}>
          {event_schedule.length > 0 && (
            <EventsSchedule
              schedule={event_schedule}
            />
          )}

          {terms_and_conditions && (
            <TermsConditionsCard
              terms={[terms_and_conditions]}
              maxHeight={805}
            />
          )}
        </Col>

        <Col lg={6}>
          {venue && <VenueMap venueMap={venue} />}

          {prohibited_items.length > 0 && (
            <ProhibitedItems
              items={prohibited_items}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
}

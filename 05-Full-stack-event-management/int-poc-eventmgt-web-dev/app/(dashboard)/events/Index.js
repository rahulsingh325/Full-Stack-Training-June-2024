// "use client";

// /* =========================
//    React & Bootstrap Imports
// ========================= */
// import { useEffect, useState } from "react";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";

// /* =========================
//    API & Components Imports
// ========================= */
// import api from "@/helper/api";
// import EventCard from "./components/EventCard";
// import EventsToolbar from "./components/EventsToolbar";
// import EmptyState from "./components/EmptyState";
// import EventListCard from "./components/EventListCard";
// import Pagination from "@/components/pagination/PaginationFooter";
// import usePagination from "@/hooks/usePagination";
// import useDebounce from "@/hooks/useDebounce";

// /* =========================
//    Helpers
// ========================= */
// const toLocalDateOnly = (d) => {
//   if (!d) return null;
//   const y = d.getFullYear();
//   const m = String(d.getMonth() + 1).padStart(2, "0");
//   const day = String(d.getDate()).padStart(2, "0");
//   return `${y}-${m}-${day}`;
// };

// /* =========================
//    Events Listing Page
// ========================= */
// export default function Index() {
//   /* =========================
//      API DATA STATES
//   ========================= */
//   const [events, setEvents] = useState([]);
//   const [initialLoading, setInitialLoading] = useState(true); // first load only
//   const [isFetching, setIsFetching] = useState(false); // filters/search
//   const [error, setError] = useState(false);

//   /* =========================
//      VIEW & FILTER STATES
//   ========================= */
//   const [view, setView] = useState("grid");
//   const [status, setStatus] = useState("active");
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("");

//   /* =========================
//      DATE FILTER STATES
//      backend supported: all | week | month | custom
//   ========================= */
//   const [dateFilter, setDateFilter] = useState("all");
//   const [dateRange, setDateRange] = useState(null);
//   const [showCalendar, setShowCalendar] = useState(false);

//   /* =========================
//      STATUS COUNTS
//   ========================= */
//   const [statusCounts, setStatusCounts] = useState({
//     active: 0,
//     draft: 0,
//     past: 0,
//   });

//   /* =========================
//      PAGINATION
//   ========================= */
//   const [totalItemsFromAPI, setTotalItemsFromAPI] = useState(0);

//   const {
//     page,
//     pageSize,
//     totalPages,
//     goToPage,
//     changePageSize,
//   } = usePagination({
//     totalItems: totalItemsFromAPI,
//     initialPageSize: 4,
//   });

//   /* =========================
//      DEBOUNCED VALUES
//   ========================= */
//   const debouncedSearch = useDebounce(search, 400);
//   const debouncedCategory = useDebounce(category, 400);

//   /* =========================
//      RESET PAGE (GUARDED)
//   ========================= */
//   useEffect(() => {
//     if (
//       dateFilter === "custom" &&
//       (!dateRange?.from || !dateRange?.to)
//     ) {
//       return;
//     }
//     goToPage(1);
//   }, [
//     status,
//     debouncedSearch,
//     debouncedCategory,
//     dateFilter,
//     dateRange?.from,
//     dateRange?.to,
//   ]);

//   /* =========================
//      FETCH EVENTS
//   ========================= */
//   const fetchEvents = async () => {
//     try {
//       setError(false);

//       // loading split (UX FIX)
//       if (events.length === 0) {
//         setInitialLoading(true);
//       } else {
//         setIsFetching(true);
//       }

//       const params = {
//         limit: pageSize,
//         offset: (page - 1) * pageSize,
//         status,
//         search: debouncedSearch,
//         category: debouncedCategory,
//         date_filter: dateFilter,
//       };

//       if (dateFilter === "custom") {
//         params.from_date = toLocalDateOnly(dateRange?.from);
//         params.to_date = toLocalDateOnly(dateRange?.to);
//       }

//       const res = await api.get("/events/all_events_list", { params });

//       const rawCounts = res.data.status_counts || {};
//       setEvents(res.data.items || []);
//       setTotalItemsFromAPI(res.data.total || 0);
//       setStatusCounts({
//         active: Number(rawCounts.active) || 0,
//         draft: Number(rawCounts.draft) || 0,
//         past: Number(rawCounts.past) || 0,
//       });
//     } catch (err) {
//       console.error("EVENT LIST ERROR", err);
//       setError(true);
//     } finally {
//       setInitialLoading(false);
//       setIsFetching(false);
//     }
//   };

//   /* =========================
//      EFFECT (INDUSTRY SAFE)
//   ========================= */
//   useEffect(() => {
//     if (
//       dateFilter === "custom" &&
//       (!dateRange?.from || !dateRange?.to)
//     ) {
//       return;
//     }

//     fetchEvents();
//   }, [
//     page,
//     pageSize,
//     status,
//     debouncedSearch,
//     debouncedCategory,
//     dateFilter,
//     dateRange?.from,
//     dateRange?.to,
//   ]);

//   /* =========================
//      CATEGORY OPTIONS (AS IS)
//   ========================= */
//   const categoryOptions = [
//     { label: "All Category", value: "" },
//     ...Array.from(
//       new Map(
//         events
//           .filter((e) => e.category_name)
//           .map((e) => [
//             e.category_name,
//             { label: e.category_name, value: e.category_name },
//           ])
//       ).values()
//     ),
//   ];

//   /* =========================
//      UI STATES
//   ========================= */
//   if (initialLoading) {
//     return <Container fluid className="py-4">Loading events...</Container>;
//   }

//   if (error) {
//     return (
//       <Container fluid className="py-4 text-danger">
//         Failed to load events
//       </Container>
//     );
//   }

//   /* =========================
//      UI RENDER
//   ========================= */
//   return (
//     <div>
//       <EventsToolbar
//         view={view}
//         setView={setView}
//         status={status}
//         setStatus={setStatus}
//         counts={statusCounts}
//         search={search}
//         setSearch={setSearch}
//         category={category}
//         setCategory={setCategory}
//         categoryOptions={categoryOptions}
//         dateFilter={dateFilter}
//         setDateFilter={setDateFilter}
//         range={dateRange}
//         setRange={setDateRange}
//         showCalendar={showCalendar}
//         setShowCalendar={setShowCalendar}
//       />

//       {/* subtle loader – input focus safe */}
//       {isFetching && (
//         <div className="text-muted small mb-2">
//           Updating results…
//         </div>
//       )}

//       {events.length === 0 ? (
//         <EmptyState status={status} />
//       ) : (
//         <>
//           {view === "grid" && (
//             <Row className="g-4">
//               {events.map((raw) => (
//                 <Col key={raw.event_id} xl={3} lg={4} sm={6}>
//                   <EventCard event={raw} onRefresh={fetchEvents} />
//                 </Col>
//               ))}
//             </Row>
//           )}

//           {view === "list" && (
//             <div>
//               {events.map((raw) => (
//                 <EventListCard
//                   key={raw.event_id}
//                   event={raw}
//                   onRefresh={fetchEvents}
//                 />
//               ))}
//             </div>
//           )}
//         </>
//       )}

//       <Pagination
//         page={page}
//         totalPages={totalPages}
//         totalItems={totalItemsFromAPI}
//         pageSize={pageSize}
//         pageSizeOptions={[8, 16, 24, 32]}
//         onPageChange={goToPage}
//         onPageSizeChange={changePageSize}
//       />
//     </div>
//   );
// }


"use client";

/* =========================
   React & Bootstrap Imports
========================= */
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

/* =========================
   API & Components Imports
========================= */
import api from "@/helper/api";
import EventCard from "./components/EventCard";
import EventsToolbar from "./components/EventsToolbar";
import EmptyState from "./components/EmptyState";
import EventListCard from "./components/EventListCard";
import Pagination from "@/components/pagination/PaginationFooter";
import usePagination from "@/hooks/usePagination";
import useDebounce from "@/hooks/useDebounce";

/* =========================
   Date Adapter
========================= */
import { galleryDateAdapter } from "@/utils/dateAdapters";

/* =========================
   Events Listing Page
========================= */
export default function Index() {
  /* =========================
     API DATA STATES
  ========================= */
  const [events, setEvents] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(false);

  /* =========================
     VIEW & FILTER STATES
  ========================= */
  const [view, setView] = useState("grid");
  const [status, setStatus] = useState("active");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  /* =========================
     DATE FILTER (UI BASED)
  ========================= */
  const [dateKey, setDateKey] = useState("all"); // all | this_week | this_month | custom
  const [dateRange, setDateRange] = useState(null);

  /* =========================
     STATUS COUNTS
  ========================= */
  const [statusCounts, setStatusCounts] = useState({
    active: 0,
    draft: 0,
    past: 0,
  });

  /* =========================
     PAGINATION
  ========================= */
  const [totalItemsFromAPI, setTotalItemsFromAPI] = useState(0);

  const {
    page,
    pageSize,
    totalPages,
    goToPage,
    changePageSize,
  } = usePagination({
    totalItems: totalItemsFromAPI,
    initialPageSize: 8,
  });

  /* =========================
     DEBOUNCED VALUES
  ========================= */
  const debouncedSearch = useDebounce(search, 400);
  const debouncedCategory = useDebounce(category, 400);

  /* =========================
     RESET PAGE ON FILTER CHANGE
  ========================= */
  useEffect(() => {
    if (dateKey === "custom" && (!dateRange?.from || !dateRange?.to)) {
      return;
    }
    goToPage(1);
  }, [
    status,
    debouncedSearch,
    debouncedCategory,
    dateKey,
    dateRange?.from,
    dateRange?.to,
  ]);

  /* =========================
     FETCH EVENTS
  ========================= */
  const fetchEvents = async () => {
    try {
      setError(false);

      if (events.length === 0) {
        setInitialLoading(true);
      } else {
        setIsFetching(true);
      }

      const dateParams = galleryDateAdapter({
        key: dateKey,
        range: dateRange,
      });

      // custom selected but dates not picked yet
      if (!dateParams) return;

      const params = {
        limit: pageSize,
        offset: (page - 1) * pageSize,
        status,
        ...(debouncedSearch && { search: debouncedSearch }),
        ...(debouncedCategory && { category: debouncedCategory }),
        ...dateParams,
      };

      const res = await api.get("/events/all_events_list", { params });

      const rawCounts = res.data.status_counts || {};

      setEvents(res.data.items || []);
      setTotalItemsFromAPI(res.data.total || 0);
      setStatusCounts({
        active: Number(rawCounts.active) || 0,
        draft: Number(rawCounts.draft) || 0,
        past: Number(rawCounts.past) || 0,
      });
    } catch (err) {
      console.error("EVENT LIST ERROR", err);
      setError(true);
    } finally {
      setInitialLoading(false);
      setIsFetching(false);
    }
  };

  /* =========================
     EFFECT
  ========================= */
  useEffect(() => {
    if (dateKey === "custom" && (!dateRange?.from || !dateRange?.to)) {
      return;
    }
    fetchEvents();
  }, [
    page,
    pageSize,
    status,
    debouncedSearch,
    debouncedCategory,
    dateKey,
    dateRange?.from,
    dateRange?.to,
  ]);

  /* =========================
     CATEGORY OPTIONS
  ========================= */
  const categoryOptions = [
    { label: "All Category", value: "" },
    ...Array.from(
      new Map(
        events
          .filter((e) => e.category_name)
          .map((e) => [
            e.category_name,
            { label: e.category_name, value: e.category_name },
          ])
      ).values()
    ),
  ];

  /* =========================
     UI STATES
  ========================= */
  if (initialLoading) {
    return (
      <Container fluid className="py-4">
        Loading events...
      </Container>
    );
  }

  if (error) {
    return (
      <Container fluid className="py-4 text-danger">
        Failed to load events
      </Container>
    );
  }

  /* =========================
     UI RENDER
  ========================= */
  return (
    <div>
      <EventsToolbar
        view={view}
        setView={setView}
        status={status}
        setStatus={setStatus}
        counts={statusCounts}
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        categoryOptions={categoryOptions}
        dateKey={dateKey}
        setDateKey={setDateKey}
        range={dateRange}
        setRange={setDateRange}
      />

      {isFetching && (
        <div className="text-muted small mb-2">
          Updating results…
        </div>
      )}

      {events.length === 0 ? (
        <EmptyState status={status} />
      ) : (
        <>
          {view === "grid" && (
            <Row className="g-4">
              {events.map((raw) => (
                <Col key={raw.event_id} xl={3} lg={4} sm={6}>
                  <EventCard event={raw} onRefresh={fetchEvents} />
                </Col>
              ))}
            </Row>
          )}

          {view === "list" && (
            <div>
              {events.map((raw) => (
                <EventListCard
                  key={raw.event_id}
                  event={raw}
                  onRefresh={fetchEvents}
                />
              ))}
            </div>
          )}
        </>
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        totalItems={totalItemsFromAPI}
        pageSize={pageSize}
        pageSizeOptions={[8, 16, 24, 32]}
        onPageChange={goToPage}
        onPageSizeChange={changePageSize}
      />
    </div>
  );
}

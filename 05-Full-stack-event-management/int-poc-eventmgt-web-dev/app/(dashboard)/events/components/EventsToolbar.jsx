"use client";

import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import Link from "next/link";

import StatusTabs from "@/components/common/StatusTabs";
import SearchInput from "@/components/common/SearchInput";
import DateSelector from "@/components/common/DateSelector";
import GridToggle from "@/components/common/GridToggle";
import CategoryDropdown from "@/components/common/CategoryDropdown";
import FilterTrigger from "@/components/common/FilterTrigger";

export default function EventsToolbar({
  view,
  setView,

  status,
  setStatus,
  counts,

  search,
  setSearch,

  category,
  setCategory,
  categoryOptions,

  /* DATE (UI BASED) */
  dateKey,
  setDateKey,
  range,
  setRange,
}) {
  const [showFilters, setShowFilters] = useState(false);

  /* =========================
     DATE CHANGE HANDLER
     (UI ONLY → parent handles backend)
  ========================= */
  const handleDateChange = ({ key, range }) => {
    setDateKey(key);

    if (key === "custom") {
      setRange(range ?? null);
    } else {
      setRange(null);
    }
  };

  /* =========================
     CLEAR ALL FILTERS
  ========================= */
  const handleClearAll = () => {
    setSearch("");
    setCategory("");
    setDateKey("all");
    setRange(null);
  };

  return (
    <Container fluid className="mb-3">
      {/* ================= TOP ROW ================= */}
      <Row className="events-header align-items-center gy-2">
        {/* LEFT — STATUS TABS */}
        <Col xs={12} sm="auto">
          <StatusTabs
            tabs={[
              { label: "Active", value: "active", count: counts.active },
              { label: "Draft", value: "draft", count: counts.draft },
              { label: "Past", value: "past", count: counts.past },
            ]}
            activeTab={status}
            onChange={setStatus}
          />
        </Col>

        {/* RIGHT — FILTERS + CTA */}
        <Col xs={12} sm className="d-flex">
          <div className="d-flex align-items-center gap-2 ms-sm-auto w-auto">
            {/* SEARCH */}
            <div className="search-compact flex-grow-1 flex-xl-grow-0 text-truncate">
              <SearchInput
                value={search}
                onChange={setSearch}
                placeholder="Search event, location..."
              />
            </div>

            {/* FILTER ICON (MOBILE / TABLET) */}
            <FilterTrigger onOpen={() => setShowFilters(true)} />

            {/* CATEGORY (DESKTOP ≥1200) */}
            <div className="d-none d-xl-block">
              <CategoryDropdown
                options={categoryOptions}
                value={category}
                onChange={setCategory}
              />
            </div>

            {/* DATE SELECTOR (DESKTOP ≥1200) */}
            <div className="d-none d-xl-block">
              <DateSelector
                value={dateKey}
                onChange={handleDateChange}
                range={range}
                setRange={setRange}
                options={[
                  { key: "all", label: "All Dates" },
                  { key: "this_week", label: "This Week" },
                  { key: "this_month", label: "This Month" },
                  { key: "custom", label: "Custom Range" },
                ]}
              />
            </div>

            {/* GRID / LIST */}
            <div className="d-none d-sm-block">
              <GridToggle view={view} onChange={setView} />
            </div>

            {/* CREATE EVENT */}
            <Link
              href="/events/create"
              className="btn bg-primary-100 text-grey-10 rounded-pill px-4 py-2 fs-btn-sm d-none d-sm-inline-flex align-items-center flex-shrink-0"
            >
              + Create Event
            </Link>
          </div>
        </Col>
      </Row>

      {/* ================= MOBILE CREATE ================= */}
      <Row className="d-sm-none mt-2">
        <Col xs={12}>
          <Link
            href="/events/create"
            className="btn bg-primary-100 text-grey-10 rounded-pill w-100 py-2 fs-btn-sm text-center"
          >
            + Create Event
          </Link>
        </Col>
      </Row>

      {/* ================= FILTER OFFCANVAS ================= */}
      <Offcanvas
        show={showFilters}
        onHide={() => setShowFilters(false)}
        placement="end"
        backdrop="static"
        className="filter-offcanvas"
      >
        <Offcanvas.Header closeButton className="border-bottom">
          <div>
            <Offcanvas.Title className="fw-semibold">
              Filters
            </Offcanvas.Title>
            <div className="text-muted small">
              Narrow down events list
            </div>
          </div>
        </Offcanvas.Header>

        <Offcanvas.Body className="p-0 d-flex flex-column">
          <div className="flex-grow-1 overflow-auto p-3">
            {/* SEARCH */}
            <div className="mb-4">
              <div className="fw-medium mb-2">Search</div>
              <SearchInput
                value={search}
                onChange={setSearch}
                placeholder="Event name or location"
              />
            </div>

            {/* CATEGORY */}
            <div className="mb-4">
              <div className="fw-medium mb-2">Category</div>
              <CategoryDropdown
                options={categoryOptions}
                value={category}
                onChange={setCategory}
              />
            </div>

            {/* DATE */}
            <div className="mb-4">
              <div className="fw-medium mb-2">Date</div>
              <DateSelector
                value={dateKey}
                onChange={handleDateChange}
                range={range}
                setRange={setRange}
                options={[
                  { key: "all", label: "All Dates" },
                  { key: "this_week", label: "This Week" },
                  { key: "this_month", label: "This Month" },
                  { key: "custom", label: "Custom Range" },
                ]}
              />
            </div>
          </div>

          {/* ACTIONS */}
          <div className="border-top p-3 bg-white">
            <div className="d-flex gap-2">
              <button
                className="btn btn-light w-50"
                onClick={handleClearAll}
              >
                Clear all
              </button>

              <button
                className="btn btn-primary w-50"
                onClick={() => setShowFilters(false)}
              >
                Apply filters
              </button>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
}

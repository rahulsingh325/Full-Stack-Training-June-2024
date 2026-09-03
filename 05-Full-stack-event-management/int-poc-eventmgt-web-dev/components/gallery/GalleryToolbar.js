"use client";

import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";

import SearchInput from "@/components/common/SearchInput";
import CategoryDropdown from "@/components/common/CategoryDropdown";
import DateSelector from "@/components/common/DateSelector";
import FilterTrigger from "@/components/common/FilterTrigger";

import CreateFolderModal from "./CreateFolderModal";
import { Plus } from "lucide-react";

export default function GalleryToolbar({
  events,
  categoryOptions = [],
  search,
  setSearch,
  category,
  setCategory,

  /* UI DATE STATE (FROM PAGE) */
  dateKey,
  setDateKey,
  range,
  setRange,

  onCreate,
}) {
  const [showFilters, setShowFilters] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  /* =========================
     DATE CHANGE (UI ONLY)
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
     CLEAR ALL
  ========================= */
  const handleClearAll = () => {
    setSearch("");
    setCategory("");
    setDateKey("this_week");
    setRange(null);
  };

  return (
    <>
      {/* ================= TOP TOOLBAR ================= */}
      <div className="d-flex align-items-center justify-content-between mb-4 gap-2 flex-nowrap">

        {/* LEFT */}
        <div className="d-flex align-items-center gap-2 flex-nowrap overflow-hidden">

          {/* SEARCH */}
          <div style={{ width: 220 }}>
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search event"
            />
          </div>

          {/* FILTER ICON */}
          {/* <FilterTrigger onOpen={() => setShowFilters(true)} /> */}

          {/* CATEGORY (DESKTOP) */}
          {/* <div className="d-none d-md-block">
            <CategoryDropdown
              options={categoryOptions}
              value={category}
              onChange={setCategory}
            />
          </div> */}
        </div>

        {/* RIGHT */}
        <div className="d-flex align-items-center gap-2 flex-nowrap">

          {/* DATE SELECTOR (DESKTOP) */}
          <div className="d-none d-md-block">
            <DateSelector
              value={dateKey}
              onChange={handleDateChange}
              options={[
                { key: "all", label: "All Dates" },
                { key: "this_week", label: "This Week" },
                { key: "this_month", label: "This Month" },
                { key: "custom", label: "Custom Range" },
              ]}
              range={range}
              setRange={setRange}
              showIcon={false}
            />
          </div>

          {/* CREATE */}
          <button
            className="btn bg-primary-100 text-grey-10 rounded-pill px-3 d-flex align-items-center"
            onClick={() => setOpenCreate(true)}
          >
            <Plus size={14} />
            <span className="d-none d-xl-inline ms-1">
              Create New Folder
            </span>
            <span className="d-none d-sm-inline d-xl-none ms-1">
              New Folder
            </span>
          </button>
        </div>
      </div>

      {/* ================= FILTER OFFCANVAS ================= */}
      <Offcanvas
        show={showFilters}
        onHide={() => setShowFilters(false)}
        placement="end"
        backdrop="static"
        className="filter-offcanvas"
      >
        <Offcanvas.Header closeButton className="border-bottom">
          <Offcanvas.Title className="fw-semibold">
            Filters
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className="p-0 d-flex flex-column">
          <div className="flex-grow-1 overflow-auto p-3">

            {/* SEARCH */}
            <div className="mb-4">
              <div className="fw-medium mb-2">Search</div>
              <CategoryDropdown
                options={categoryOptions}
                value={category}
                onChange={setCategory}
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
                options={[
                  { key: "all", label: "All Dates" },
                  { key: "this_week", label: "This Week" },
                  { key: "this_month", label: "This Month" },
                  { key: "custom", label: "Custom Range" },
                ]}
                range={range}
                setRange={setRange}
                showIcon={false}
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

      {/* ================= CREATE MODAL ================= */}
      <CreateFolderModal
        show={openCreate}
        events={events}
        onClose={() => setOpenCreate(false)}
        onCreate={onCreate}
      />
    </>
  );
}

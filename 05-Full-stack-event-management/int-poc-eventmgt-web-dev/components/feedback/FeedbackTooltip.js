"use client";

import { useState } from "react";
import DateSelector from "@/components/common/DateSelector";

export default function FeedbackTooltip({
  onAllEvent, onAllRating
}) {
  const [dateFilter, setDateFilter] = useState("custom");
  const [range, setRange] = useState({
    from: new Date("2029-04-01"),
    to: new Date("2029-05-30"),
  });

  const dateOptions = [
    { key: "all", label: "All Dates" },
    { key: "month", label: "This Month" },
    { key: "custom", label: "Custom Range" },
  ];


  return (
    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
      {/* LEFT FILTERS */}
      <div className="d-flex gap-2 flex-wrap cool-grey-10 align-items-center">
        <FilterButton label="All Rating" onClick={onAllRating} className="bg-cool-grey-10 text-secondary-100" />
        <FilterButton label="All Event" onClick={onAllEvent} className="bg-cool-grey-10 text-secondary-100" />
      </div>

      {/* RIGHT DATE SELECTOR */}
      {/* <DateSelector
        value={dateFilter}
        onChange={setDateFilter}
        options={dateOptions}
        range={range}
        setRange={setRange}
        showIcon={true}
      /> */}
    </div>
  );
}

/* SINGLE FILTER BUTTON */
function FilterButton({ label, onClick }) {
  return (
    <button
      className="btn btn-light rounded-pill px-3 small d-flex align-items-center gap-1"
      onClick={onClick}
    >
      {label}
      {/* <span style={{ fontSize: 12 }}>▾</span> */}
    </button>
  );
}


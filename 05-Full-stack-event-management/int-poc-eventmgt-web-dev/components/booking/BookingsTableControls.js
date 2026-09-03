"use client";

import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";

import SearchInput from "../common/SearchInput";
import CategoryDropdown from "../common/CategoryDropdown";
import DateSelector from "../common/DateSelector";

export default function BookingsTableControls({
  /* SEARCH */
  search,
  setSearch,

  /* STATUS */
  status,
  setStatus,

  /* DATE RANGE (backend params) */
  setFromDate,
  setToDate,

  /* CATEGORY (future use) */
  category,
  setCategory,
  categoryOptions,
}) {
  /* =========================
     LOCAL STATE (UI ONLY)
  ========================= */
  const [dateKey, setDateKey] = useState("this_month"); // UI key
  const [range, setRange] = useState(null);

  const dateOptions = [
    { key: "this_week", label: "This Week" },
    { key: "this_month", label: "This Month" },
    { key: "custom", label: "Custom Range" },
  ];

  /* =========================
     APPLY DATE FILTER → BACKEND DATES
  ========================= */
  useEffect(() => {
    const today = new Date();
    let start = null;
    let end = null;

    if (dateKey === "this_week") {
      const day = today.getDay();
      start = new Date(today);
      start.setDate(today.getDate() - day);
      end = today;
    }

    if (dateKey === "this_month") {
      start = new Date(today.getFullYear(), today.getMonth(), 1);
      end = today;
    }

    if (dateKey === "custom" && range?.from && range?.to) {
      start = range.from;
      end = range.to;
    }

    if (start && end) {
      setFromDate(start.toISOString().split("T")[0]);
      setToDate(end.toISOString().split("T")[0]);
    }
  }, [dateKey, range, setFromDate, setToDate]);

  /* =========================
     DATE CHANGE HANDLER (UI ONLY)
  ========================= */
  const handleDateChange = ({ key, range }) => {
    setDateKey(key);

    if (key === "custom") {
      setRange(range ?? null);
    } else {
      setRange(null);
    }
  };

  return (
    <Card className="border-0 shadow-sm rounded-4 p-3 mb-3">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">

        {/* ===== LEFT : STATUS TABS ===== */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "#F1F2FF",
            borderRadius: "999px",
            padding: "6px",
            gap: "4px",
            overflowX: "auto",
            whiteSpace: "nowrap",
          }}
        >
          {[
            { label: "All", value: null },
            { label: "Confirmed", value: "Confirmed" },
            { label: "Pending", value: "Pending" },
            { label: "Cancelled", value: "Cancelled" },
            { label: "Expired", value: "Expired" }
          ].map((item) => {
            const isActive = status === item.value;

            return (
              <button
                key={item.label}
                onClick={() => setStatus(item.value)}
                style={{
                  background: isActive ? "#F472F1" : "transparent",
                  color: isActive ? "#fff" : "#333",
                  fontSize: "10px",
                  fontWeight: 500,
                  padding: "10px 15px",
                  borderRadius: "999px",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* ===== RIGHT CONTROLS ===== */}
        <div className="d-flex align-items-center gap-2 flex-wrap">

          {/* SEARCH */}
          <div style={{ minWidth: 200 }}>
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search event, location..."
            />
          </div>

          {/* CATEGORY */}
          <div className="d-none d-lg-block">
            {/* <CategoryDropdown
              options={categoryOptions}
              value={category}
              onChange={(opt) => setCategory(opt?.value || "")}
            /> */}
          </div>

          {/* DATE SELECTOR */}
          <div className="d-none d-lg-block">
            <DateSelector
              value={dateKey}
              onChange={handleDateChange}
              options={dateOptions}
              range={range}
              setRange={setRange}
              showIcon={false}
            />
          </div>

        </div>
      </div>
    </Card>
  );
}

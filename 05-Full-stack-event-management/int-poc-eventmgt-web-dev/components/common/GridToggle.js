"use client";

import { Grid, List } from "lucide-react";

export default function GridToggle({ view = "grid", onChange }) {
  return (
    <div className="grid-toggle d-flex align-items-center rounded-pill">

      {/* grid */}
      <button
        type="button"
        className={`grid-toggle-btn ${
          view === "grid" ? "active" : ""
        }`}
        onClick={() => onChange("grid")}
        aria-label="Grid view"
      >
        <Grid size={18} />
      </button>

      {/* list */}
      <button
        type="button"
        className={`grid-toggle-btn ${
          view === "list" ? "active" : ""
        }`}
        onClick={() => onChange("list")}
        aria-label="List view"
      >
        <List size={18} />
      </button>

    </div>
  );
}

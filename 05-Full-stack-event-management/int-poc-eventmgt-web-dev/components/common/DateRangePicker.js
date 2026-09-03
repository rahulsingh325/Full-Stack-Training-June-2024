"use client";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function DateRangePicker({
  range,
  setRange,
  onClose,
}) {
  return (
    <div className="bg-white shadow rounded-4 p-3">
      <DayPicker
        mode="range"
        selected={range}
        onSelect={setRange}
        numberOfMonths={1}
      />

      <div className="d-flex justify-content-end gap-2 mt-3">
        <button
          className="btn btn-light"
          onClick={() => setRange(undefined)}
        >
          Clear
        </button>

        <button
          className="btn btn-primary"
          onClick={onClose}
        >
          Apply
        </button>
      </div>
    </div>
  );
}

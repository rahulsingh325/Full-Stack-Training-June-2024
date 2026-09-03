"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown } from "lucide-react";

export default function CategoryDropdown({
  options = [],
  value,
  onChange,
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  /* =========================
     SAFE OPTIONS
  ========================= */
  const finalOptions = useMemo(() => {
    return [
      // { label: "All Category", value: null },
      ...options,
    ];
  }, [options]);

  /* =========================
     OUTSIDE CLICK HANDLER
  ========================= */
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div
      ref={wrapperRef}
      className="position-relative"
      style={{ width: 130 }}
    >
      {/* Trigger */}
      <button
        type="button"
        className="d-flex d-none d-lg-inline-flex align-items-center justify-content-between gap-2 px-4 py-2 rounded-pill bg-cool-grey-10 border-0 w-100 fs-btn-sm"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span
          className="fw-medium text-secondary-100 text-truncate"
          style={{ maxWidth: 140 }}
          title={value || "All Category"}
        >
          {value || "All Category"}
        </span>
        <ChevronDown size={18} />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="position-absolute mt-2 bg-grey-10 shadow rounded-3 z-3"
          style={{
            width: "100%",
            maxHeight: 260,
            overflowY: "auto",
          }}
        >
          {finalOptions.map((opt) => (
            <div
              key={`${opt.value}-${opt.label}`}
              className="px-3 py-2 small"
              style={{
                cursor: "pointer",
                whiteSpace: "normal",
                lineHeight: "1.4",
              }}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { Search } from "lucide-react";

export default function SearchInput({
  value = "",
  onChange,
  placeholder = "Search...",
  showText = true,
  showIcon = true,
  height = 40,
}) {
  if (!showText) {
    return (
      <button
        type="button"
        className="btn rounded-circle bg-cool-grey-10 d-flex align-items-center justify-content-center"
         style={{ width: height, height }}
      >
        <Search size={16} />
      </button>
    );
  }

  return (
    <div className="position-relative search-input-wrapper" style={{ height }}>
      <input
        type="text"
        className="form-control rounded-pill h-100 pe-lg-5 fs-body-md fw-regular text-grey-60 icon-text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)} 
        placeholder={placeholder}
      />

      {showIcon && (
        <span
          className="position-absolute top-50 end-0 search-icon translate-middle-y me-1 rounded-circle d-flex align-items-center justify-content-center"
           style={{ width: height - 10, height: height - 10 }}
        >
          <Search size={16} />
        </span>
      )}
    </div>
  );
}

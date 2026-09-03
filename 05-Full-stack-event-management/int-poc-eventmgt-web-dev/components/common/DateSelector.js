// "use client";

// import { useEffect, useRef, useState } from "react";
// import { Calendar, ChevronDown } from "lucide-react";
// import DateRangePicker from "./DateRangePicker";

// /* =========================
//    DATE FILTER MAPPING
//    (UI key → Backend params)
// ========================= */
// function mapDateKeyToApi(key, range) {
//   const today = new Date();

//   switch (key) {
//     case "this_week":
//       return { date_filter: "week" };

//     case "this_month":
//       return { date_filter: "month" };

//     case "last_8_months": {
//       const from = new Date(today);
//       from.setMonth(today.getMonth() - 7); // incl current month
//       return {
//         date_filter: "custom",
//         from_date: from,
//         to_date: today,
//       };
//     }

//     case "custom":
//       return {
//         date_filter: "custom",
//         from_date: range?.from,
//         to_date: range?.to,
//       };

//     case "all":
//     default:
//       return { date_filter: "all" };
//   }
// }

// /* =========================
//    DateSelector Component
// ========================= */
// export default function DateSelector({
//   value,          // UI key (this_month, last_8_months, custom, etc.)
//   onChange,       // (apiPayload) => void
//   options = [],   // [{ key, label }]
//   range,
//   setRange,
//   showIcon = true,
// }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [showCalendar, setShowCalendar] = useState(false);
//   const ref = useRef(null);

//   /* =========================
//      LABEL
//   ========================= */
//   const activeOption = options.find((o) => o.key === value);

//   const label =
//     value === "custom" && range?.from && range?.to
//       ? `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`
//       : activeOption?.label || "Select Date";

//   /* =========================
//      OUTSIDE CLICK
//   ========================= */
//   useEffect(() => {
//     function handleClickOutside(e) {
//       if (ref.current && !ref.current.contains(e.target)) {
//         setIsOpen(false);
//         setShowCalendar(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () =>
//       document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   /* =========================
//      HANDLE OPTION SELECT
//   ========================= */
//   const handleSelect = (key) => {
//     // 🔹 UI state update
//     if (key === "custom") {
//       setShowCalendar(true);
//     } else {
//       setShowCalendar(false);
//       setRange(null); // important: predefined ranges backend handle kare
//     }

//     setIsOpen(false);

//     // 🔹 Backend-aligned payload
//     const apiPayload = mapDateKeyToApi(key, range);
//     onChange(apiPayload);
//   };

//   return (
//     <div ref={ref} className="position-relative">
//       {/* BUTTON */}
//       <button
//         type="button"
//         className="btn rounded-pill bg-cool-grey-10 px-3 d-flex align-items-center gap-1 fs-body-sm"
//         onClick={() => {
//           setIsOpen((prev) => !prev);
//           setShowCalendar(false);
//         }}
//       >
//         {showIcon && <Calendar size={16} />}
//         <span className="text-secondary-100 fs-10 fw-medium">{label}</span>
//         <ChevronDown size={16} />
//       </button>

//       {/* DROPDOWN */}
//       {isOpen && (
//         <div
//           className="position-absolute mt-2 bg-white shadow rounded-3 w-100"
//           style={{ zIndex: 1055 }}
//         >
//           {options.map((opt) => (
//             <button
//               key={opt.key}
//               className="dropdown-item px-3 py-2 fs-body-sm"
//               onClick={() => handleSelect(opt.key)}
//             >
//               {opt.label}
//             </button>
//           ))}
//         </div>
//       )}

//       {/* CALENDAR (CUSTOM ONLY) */}
//       {showCalendar && value === "custom" && (
//         <div
//           className="position-absolute mt-2"
//           style={{ right: 0, zIndex: 1050 }}
//         >
//           <DateRangePicker
//             range={range}
//             setRange={setRange}
//             onClose={() => {
//               // apply custom range
//               const apiPayload = mapDateKeyToApi("custom", range);
//               onChange(apiPayload);
//               setShowCalendar(false);
//             }}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import DateRangePicker from "./DateRangePicker";

export default function DateSelector({
  value,
  options = [],
  range,
  setRange,
  onChange,
  showIcon = true,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const ref = useRef(null);

  /* =========================
     LABEL
  ========================= */
  const activeOption = options.find((o) => o.key === value);

  const label =
    value === "custom" && range?.from && range?.to
      ? `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`
      : activeOption?.label || "Select Date";

  /* =========================
     OUTSIDE CLICK
  ========================= */
  useEffect(() => {
    function handleOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
        setShowCalendar(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () =>
      document.removeEventListener("mousedown", handleOutside);
  }, []);

  /* =========================
     OPTION SELECT
  ========================= */
  const handleSelect = (key) => {
    setIsOpen(false);

    if (key === "custom") {
      setShowCalendar(true);          // ✅ OPEN calendar
      onChange?.({ key: "custom" });  // ✅ sync parent dateKey
    } else {
      setShowCalendar(false);
      setRange(null);
      onChange?.({ key });            // ✅ normal month change
    }
  };

  return (
    <div ref={ref} className="position-relative">
      {/* BUTTON */}
      <button
        type="button"
        className="btn rounded-pill bg-cool-grey-10 px-3 d-flex align-items-center gap-1 fs-body-sm"
        onClick={() => {
          setIsOpen((p) => !p);
          setShowCalendar(false);
        }}
      >
        {showIcon && <Calendar size={16} />}
        <span className="text-secondary-100 fs-10 fw-medium">
          {label}
        </span>
        <ChevronDown size={16} />
      </button>

      {/* DROPDOWN */}
      {isOpen && (
        <div
          className="position-absolute mt-2 bg-white shadow rounded-3 w-100"
          style={{ zIndex: 1055 }}
        >
          {options.map((opt) => (
            <button
              key={opt.key}
              className="dropdown-item px-3 py-2 fs-body-sm"
              onClick={() => handleSelect(opt.key)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {/* CALENDAR */}
      {showCalendar && value === "custom" && (
        <div
          className="position-absolute mt-2"
          style={{ right: 0, zIndex: 1050 }}
        >
          <DateRangePicker
            range={range}
            setRange={setRange}
            onClose={() => {
              // ✅ APPLY custom range
              onChange?.({ key: "custom", range });
              setShowCalendar(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

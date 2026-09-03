// "use client";

// import { Card } from "react-bootstrap";
// import { ChevronDown } from "lucide-react";
// import { useMemo } from "react";

// export default function PopularEvents({ data }) {
//   if (!data?.length) return null;

//   const rows = useMemo(() => {
//     const sorted = [...data]
//       .sort((a, b) => (b.total_bookings || 0) - (a.total_bookings || 0))
//       .slice(0, 3);

//     const maxBookings = Math.max(
//       ...sorted.map(i => i.total_bookings || 0),
//       1
//     );

//     const fillColors = ["#E9EBFF", "#F26CF9", "#37437D"];

//     return sorted.map((item, index) => {
//       const percent = Math.round(
//         ((item.total_bookings || 0) / maxBookings) * 100
//       );

//       return {
//         name: item.category_name,
//         total: item.total_events,
//         percent,
//         fillColor: fillColors[index],
//       };
//     });
//   }, [data]);

//   return (
//     <Card className="border-0 shadow-sm rounded-4 p-4">
//       {/* HEADER */}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h6 className="fw-semibold mb-0">Popular Events</h6>
//         <button className="btn btn-light btn-sm rounded-pill px-3 d-flex align-items-center gap-1">
//           Popular <ChevronDown size={14} />
//         </button>
//       </div>

//       {/* LIST */}
//       {rows.map(item => (
//         <div
//           key={item.name}
//           className="d-flex align-items-center mb-4"
//         >
//           {/* EVENT NAME */}
//           <div
//             className="text-muted fs-body-md fw-regular"
//             style={{ width: 90 }}
//           >
//             {item.name}
//           </div>

//           {/* BAR */}
//           <div className="flex-grow-1 position-relative">
//             <div
//               className="rounded-3"
//               style={{
//                 height: 24,
//                 background: "#F3F4F6",
//                 overflow: "hidden",
//               }}
//             >
//               {/* FILLED PART */}
//               <div
//                 className="h-100 d-flex align-items-center ps-3"
//                 style={{
//                   width: `${item.percent}%`,
//                   background: item.fillColor,
//                   color: "#fff",
//                   fontWeight: 600,
//                   fontSize: 14,
//                 }}
//               >
//                 {item.percent}%
//               </div>

//               {/* EVENTS COUNT */}
//               <div
//                 className="position-absolute top-50 end-0 translate-middle-y pe-3 text-muted"
//                 style={{ fontSize: 14 }}
//               >
//                 <strong className="text-dark">
//                   {item.total.toLocaleString()}
//                 </strong>{" "}
//                 Events
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </Card>
//   );
// }


"use client";

import { Card } from "react-bootstrap";
import { useMemo } from "react";

export default function PopularEvents({ data }) {
  if (!data?.length) return null;

  const rows = useMemo(() => {
    const fillColors = ["#E9EBFF", "#F26CF9", "#37437D"];

    return data.map((item, index) => ({
      name: item.category_name,
      total: item.total_events,
      percent: item.percentage ?? 0,
      fillColor: fillColors[index % fillColors.length],
    }));
  }, [data]);


  return (
    <Card className="border-0 shadow-sm rounded-4 p-4">
      {/* ================= HEADER ================= */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h6 className="fw-semibold text-grey-100 mb-0">Popular Events Types</h6>
        <button className="btn bg-cool-grey-10 text-secondary-100 fw-regular fs-10 btn-sm rounded-pill px-3 d-flex align-items-center gap-1">
          Popular {/*  <ChevronDown size={14} /> */}
        </button>
      </div>

      {/* ================= LIST ================= */}
      <div
        style={{
          maxHeight: 122,
          overflowY: "auto",
          paddingRight: 6,
        }}
        className="custom-scroll"
      >
        {rows.map((item) => (
          <div
            key={item.name}
            className="d-flex align-items-center text-grey-90 fs-body-md fw-regular mb-4"
          >
            {/* CATEGORY NAME */}
            <div
              className="text-muted fs-body-md fw-regular"
              style={{ width: 110 }}
            >
              {item.name}
            </div>

            {/* BAR */}
            <div className="flex-grow-1 position-relative">
              <div
                className="rounded-3"
                style={{
                  height: 24,
                  background: "#F3F4F6",
                  overflow: "hidden",
                }}
              >
                {/* FILLED PART */}
                <div
                  className="h-100 d-flex align-items-center ps-3"
                  style={{
                    width: `${item.percent}%`,
                    background: item.fillColor,
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: 14,
                  }}
                >
                  {item.percent}%
                </div>

                {/* EVENTS COUNT */}
                <div
                  className="position-absolute top-50 end-0 translate-middle-y pe-3 text-muted"
                  style={{ fontSize: 14 }}
                >
                  <strong className="text-dark">
                    {item.total.toLocaleString()}
                  </strong>{" "}
                  Events
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </Card>
  );
}

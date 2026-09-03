// "use client";

// import { Card } from "react-bootstrap";
// import {
//   RefreshCcw,
//   RotateCcw,
//   XCircle,
//   Plus,
//   MoreHorizontal,
// } from "lucide-react";
// import dayjs from "dayjs";

// export default function RecentActivity({ data }) {
//   if (!data || !data.length) return null;

//   /**
//    * ACTIVITY TYPE → ICON MAP
//    */
//   const iconMap = {
//     BOOKING_CREATED: <Plus size={16} />,
//     BOOKING_UPDATED: <RefreshCcw size={16} />,
//     BOOKING_CANCELLED: <XCircle size={16} />,
//     BOOKING_REVIEWED: <RotateCcw size={16} />,
//   };

//   // ✅ latest 4 activities only
//   const latestActivities = data.slice(0, 4);

//   return (
//     <Card className="border-0 shadow-sm rounded-4 p-4">
//       {/* ================= HEADER ================= */}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h6 className="fw-semibold mb-0">Recent Activity</h6>
//         <MoreHorizontal className="text-muted" />
//       </div>

//       {/* ================= ACTIVITY LIST ================= */}
//       <div className="d-flex flex-column gap-4">
//         {latestActivities.map((item, index) => {
//           const icon =
//             iconMap[item.activity_type] || <RefreshCcw size={16} />;

//           return (
//             <div
//               key={`${item.entity_id || "activity"}-${item.created_at || index}`}
//               className="d-flex gap-3"
//             >
//               {/* ICON */}
//               <div
//                 className="rounded-circle d-flex align-items-center justify-content-center"
//                 style={{
//                   width: 36,
//                   height: 36,
//                   backgroundColor: "#EEF1FF",
//                   color: "#2F3A74",
//                   flexShrink: 0,
//                 }}
//               >
//                 {icon}
//               </div>

//               {/* CONTENT */}
//               <div>
//                 <div className="text-dark">
//                   {item.message}
//                 </div>
//                 <div className="text-muted small mt-1">
//                   {item.created_at
//                     ? dayjs(item.created_at).format(
//                         "DD MMM YYYY, hh:mm A"
//                       )
//                     : ""}
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </Card>
//   );
// }



"use client";

import { Card } from "react-bootstrap";
import {
  RefreshCcw,
  RotateCcw,
  XCircle,
  Plus,
  MoreHorizontal,
} from "lucide-react";
import dayjs from "dayjs";

export default function RecentActivity({
  data = [],
  embedded = false,
  limit = 4, // 👈 NEW (default preview = 4)
}) {
  if (!data.length) return null;

  /**
   * ACTIVITY TYPE → ICON MAP
   */
  const iconMap = {
    BOOKING_CREATED: <Plus size={16} />,
    BOOKING_UPDATED: <RefreshCcw size={16} />,
    BOOKING_CANCELLED: <XCircle size={16} />,
    BOOKING_REVIEWED: <RotateCcw size={16} />,
  };

  // ✅ LIMIT LOGIC
  const activitiesToShow =
    typeof limit === "number" ? data.slice(0, limit) : data;

  const content = (
    <>
      {/* ================= HEADER ================= */}
      {!embedded && (
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h6 className="fw-semibold mb-0">Recent Activity</h6>
          <MoreHorizontal className="text-muted" />
        </div>
      )}

      {/* ================= ACTIVITY LIST ================= */}
      <div className="d-flex flex-column gap-4">
        {activitiesToShow.map((item, index) => {
          const icon =
            iconMap[item.activity_type] || <RefreshCcw size={16} />;

          return (
            <div
              key={`${item.entity_id || "activity"}-${item.created_at || index}`}
              className="d-flex gap-3"
            >
              {/* ICON */}
              <div
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: 36,
                  height: 36,
                  backgroundColor: "#EEF1FF",
                  color: "#2F3A74",
                  flexShrink: 0,
                }}
              >
                {icon}
              </div>

              {/* CONTENT */}
              <div>
                <div className="text-dark">{item.message}</div>
                <div className="text-muted small mt-1">
                  {item.created_at
                    ? dayjs(item.created_at).format(
                        "DD MMM YYYY, hh:mm A"
                      )
                    : ""}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );

  // 🔒 Same UI, just wrapper difference
  if (embedded) {
    return content;
  }

  return (
    <Card className="border-0 shadow-sm rounded-4 p-4">
      {content}
    </Card>
  );
}


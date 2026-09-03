// "use client";

// import { Card } from "react-bootstrap";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
// } from "recharts";

// /* STATIC COLORS (UI stable) */
// const COLORS = [
//   "#F26CF9",
//   "#1C2346",
//   "#DADDEF",
//   "#E9ECF8",
//   "#B6C0FF",
//   "#FFE4C4",
// ];

// export default function ExpenseBreakdown({ data = [], loading }) {
//   if (loading) return null;

//   /* =========================
//      BACKEND-DRIVEN DATA
//   ========================= */

//   const totalExpense = data.reduce(
//     (sum, item) => sum + (item.total_amount || 0),
//     0
//   );

//   const chartData = data.map((item, index) => {
//     const value = item.total_amount || 0;
//     const percent = totalExpense
//       ? ((value / totalExpense) * 100).toFixed(2)
//       : 0;

//     return {
//       label: item.category,
//       value,
//       percent,
//       color: COLORS[index % COLORS.length],
//     };
//   });

//   return (
//     <Card className="border-0 rounded-4 shadow-sm p-4 mt-4">
//       {/* HEADER */}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h5 className="fw-semibold mb-0">Expense Breakdown</h5>
//         <span className="text-muted fs-4">•••</span>
//       </div>

//       {/* EMPTY STATE */}
//       {chartData.length === 0 && (
//         <div className="text-center text-muted py-4">
//           No expense data available
//         </div>
//       )}

//       {chartData.length > 0 && (
//         <div className="row align-items-center">
//           {/* LEFT : DONUT */}
//           <div className="col-5 d-flex justify-content-center">
//             <div
//               className="position-relative"
//               style={{ width: 162, height: 170 }}
//             >
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={chartData}
//                     dataKey="value"
//                     innerRadius={52}
//                     outerRadius={70}
//                     paddingAngle={4}
//                     cornerRadius={8}
//                     startAngle={90}
//                     endAngle={-270}
//                   >
//                     {chartData.map((item, index) => (
//                       <Cell
//                         key={`${item.label}-${index}`}
//                         fill={item.color}
//                       />
//                     ))}


//                   </Pie>
//                 </PieChart>
//               </ResponsiveContainer>

//               {/* CENTER TEXT */}
//               <div className="position-absolute top-50 start-50 translate-middle text-center">
//                 <div
//                   className="text-muted mb-1 text-nowrap"
//                   style={{ fontSize: 10, lineHeight: "12px" }}
//                 >
//                   Total All Expenses
//                 </div>
//                 <div className="fw-semibold text-secondary fs-7">
//                   ${totalExpense.toLocaleString()}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT : LIST */}
//           <div className="col-7">
//             {chartData.map((item, index) => (
//               <div key={`${item.label}-${index}`}
//                 className="d-flex justify-content-between align-items-center mb-3"
//               >
//                 {/* LEFT */}
//                 <div className="d-flex align-items-center gap-3">
//                   <span
//                     className="rounded-circle"
//                     style={{
//                       width: 10,
//                       height: 10,
//                       background: item.color,
//                     }}
//                   />
//                   <div className="fw-regular fs-body-sm text-grey-100">
//                     {item.label}
//                     <span className="fw-regular fs-body-sm text-grey-70">
//                       {" "}({item.percent}%)
//                     </span>
//                   </div>
//                 </div>

//                 {/* RIGHT */}
//                 <div className="fw-regular text-grey-100 fs-body-sm">
//                   ${item.value.toLocaleString()}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </Card>
//   );
// }






// "use client";

// import { Card } from "react-bootstrap";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
// } from "recharts";
// import { useEffect, useState } from "react";

// /* STATIC COLORS (UI stable) */
// const COLORS = [
//   "#F26CF9",
//   "#1C2346",
//   "#DADDEF",
//   "#E9ECF8",
//   "#B6C0FF",
//   "#FFE4C4",
// ];

// export default function ExpenseBreakdown({ data = [], loading }) {
//   if (loading) return null;

//   /* =========================
//      RESPONSIVE (SMALL SCREEN)
//   ========================= */
//   const [isSmallScreen, setIsSmallScreen] = useState(false);

//   useEffect(() => {
//     const check = () => setIsSmallScreen(window.innerWidth <= 375);
//     check();
//     window.addEventListener("resize", check);
//     return () => window.removeEventListener("resize", check);
//   }, []);

//   /* =========================
//      BACKEND-DRIVEN DATA
//   ========================= */
//   const totalExpense = data.reduce(
//     (sum, item) => sum + (item.total_amount || 0),
//     0
//   );

//   const chartData = data.map((item, index) => {
//     const value = item.total_amount || 0;
//     const percent = totalExpense
//       ? ((value / totalExpense) * 100).toFixed(2)
//       : 0;

//     return {
//       label: item.category,
//       value,
//       percent,
//       color: COLORS[index % COLORS.length],
//     };
//   });

//   return (
//     <Card className="border-0 rounded-4 shadow-sm p-4 mt-4">
//       {/* ================= HEADER ================= */}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h5 className="fw-semibold mb-0">Expense Breakdown</h5>
//         <span className="text-muted fs-4">•••</span>
//       </div>

//       {/* ================= EMPTY STATE ================= */}
//       {chartData.length === 0 && (
//         <div className="text-center text-muted py-4">
//           No expense data available
//         </div>
//       )}

//       {chartData.length > 0 && (
//         <div className="row align-items-center">
//           {/* ================= LEFT : DONUT ================= */}
//           <div className="col-5 d-flex justify-content-center">
//             <div
//               className="position-relative"
//               style={{
//                 width: isSmallScreen ? 130 : 162,
//                 height: isSmallScreen ? 140 : 170,
//               }}
//             >
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={chartData}
//                     dataKey="value"
//                     innerRadius={isSmallScreen ? 40 : 52}
//                     outerRadius={isSmallScreen ? 58 : 70}
//                     paddingAngle={4}
//                     cornerRadius={8}
//                     startAngle={90}
//                     endAngle={-270}
//                   >
//                     {chartData.map((item, index) => (
//                       <Cell
//                         key={`${item.label}-${index}`}
//                         fill={item.color}
//                       />
//                     ))}
//                   </Pie>
//                 </PieChart>
//               </ResponsiveContainer>

//               {/* ================= CENTER TEXT ================= */}
//               <div className="position-absolute top-50 start-50 translate-middle text-center">
//                 <div
//                   className="text-muted mb-1 text-nowrap"
//                   style={{
//                     fontSize: isSmallScreen ? 9 : 10,
//                     lineHeight: "12px",
//                   }}
//                 >
//                   Total All Expenses
//                 </div>
//                 <div className="fw-semibold text-secondary fs-7">
//                   ${totalExpense.toLocaleString()}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ================= RIGHT : LIST ================= */}
//           <div className="col-7">
//             {chartData.map((item, index) => (
//               <div
//                 key={`${item.label}-${index}`}
//                 className="d-flex justify-content-between align-items-center mb-3"
//               >
//                 <div className="d-flex align-items-center gap-3">
//                   <span
//                     className="rounded-circle"
//                     style={{
//                       width: 10,
//                       height: 10,
//                       background: item.color,
//                     }}
//                   />
//                   <div className="fw-regular fs-body-sm text-grey-100">
//                     {item.label}
//                     <span className="fw-regular fs-body-sm text-grey-70">
//                       {" "}({item.percent}%)
//                     </span>
//                   </div>
//                 </div>

//                 <div className="fw-regular text-grey-100 fs-body-sm">
//                   ${item.value.toLocaleString()}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </Card>
//   );
// }


"use client";

import { Card } from "react-bootstrap";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

/* STATIC COLORS */
const COLORS = [
  "#F26CF9",
  "#1C2346",
  "#DADDEF",
  "#E9ECF8",
  "#B6C0FF",
  "#FFE4C4",
];

export default function ExpenseBreakdown({ data = [], loading }) {

  /* =========================
     RESPONSIVE (SMALL SCREEN)
  ========================= */
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const check = () => setIsSmallScreen(window.innerWidth <= 375);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* =========================
     SAFE DATA
  ========================= */
  const safeData = Array.isArray(data) ? data : [];

  const totalExpense = safeData.reduce(
    (sum, item) => sum + (item.total_amount || 0),
    0
  );

  const chartData = safeData.map((item, index) => {
    const value = item.total_amount || 0;
    const percent = totalExpense
      ? ((value / totalExpense) * 100).toFixed(2)
      : 0;

    return {
      label: item.category,
      value,
      percent,
      color: COLORS[index % COLORS.length],
    };
  });

  return (
    <Card className="border-0 rounded-4 shadow-sm p-4 mt-4">
      {/* ================= HEADER ================= */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h6 className="fw-semibold mb-0">Expense Breakdown</h6>
        <span className="text-muted">•••</span>
      </div>

      {/* ================= LOADING STATE ================= */}
      {loading && (
        <div className="text-center text-muted py-5">
          Loading expense data…
        </div>
      )}

      {/* ================= EMPTY STATE ================= */}
      {!loading && chartData.length === 0 && (
        <div className="text-center text-muted py-4">
          No expense data available
        </div>
      )}

      {/* ================= CONTENT ================= */}
      {!loading && chartData.length > 0 && (
        <div className="row align-items-center">
          {/* LEFT : DONUT */}
          <div className="col-5 d-flex justify-content-center">
            <div
              className="position-relative"
              style={{
                width: isSmallScreen ? 130 : 162,
                height: isSmallScreen ? 140 : 170,
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    innerRadius={isSmallScreen ? 40 : 52}
                    outerRadius={isSmallScreen ? 58 : 70}
                    paddingAngle={4}
                    cornerRadius={8}
                    startAngle={90}
                    endAngle={-270}
                  >
                    {chartData.map((item, index) => (
                      <Cell
                        key={`${item.label}-${index}`}
                        fill={item.color}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* CENTER TEXT */}
              <div className="position-absolute top-50 start-50 translate-middle text-center">
                <div
                  className="text-muted mb-1 text-nowrap"
                  style={{
                    fontSize: isSmallScreen ? 9 : 10,
                    lineHeight: "12px",
                  }}
                >
                  Total All Expenses
                </div>
                <div className="fw-semibold text-secondary fs-7">
                  ${totalExpense.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT : LIST */}
          <div className="col-7">
            {chartData.map((item, index) => (
              <div
                key={`${item.label}-${index}`}
                className="d-flex justify-content-between align-items-center mb-3"
              >
                <div className="d-flex align-items-center gap-3">
                  <span
                    className="rounded-circle"
                    style={{
                      width: 10,
                      height: 10,
                      background: item.color,
                    }}
                  />
                  <div className="fw-regular fs-body-sm text-grey-100">
                    {item.label}
                    <span className="text-grey-70">
                      {" "}({item.percent}%)
                    </span>
                  </div>
                </div>

                <div className="fw-regular text-grey-100 fs-body-sm">
                  ${item.value.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}

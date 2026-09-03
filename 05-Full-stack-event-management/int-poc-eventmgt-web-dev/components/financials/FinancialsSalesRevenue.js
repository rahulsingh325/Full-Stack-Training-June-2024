
// "use client";

// import { Card } from "react-bootstrap";
// import {
//     PieChart,
//     Pie,
//     Cell,
//     ResponsiveContainer,
// } from "recharts";
// import { financialData } from "@/data/financialData";

// export default function SalesRevenue() {
//     const { salesRevenue } = financialData;

//     return (
//         <Card
//             className="border-0 rounded-4 shadow-sm p-3 mt-4">

//             {/* HEADER */}
//             <div className="d-flex justify-content-between align-items-center mb-2">
//                 <h6 className="fw-semibold mb-0">Sales Revenue</h6>
//                 <span className="text-muted">•••</span>
//             </div>
//             <div className="row align-items-center">

//                 <div className="col-4 d-flex justify-content-center">
//                     <div className="d-flex flex-column align-items-center">
//                         {/* DONUT */}
//                         <div style={{ width: 101, height: 101 }}>
//                             <ResponsiveContainer width="100%" height="100%">
//                                 <PieChart>
//                                     <Pie
//                                         data={salesRevenue.data}
//                                         dataKey="value"
//                                         innerRadius={32}
//                                         outerRadius={50}
//                                         paddingAngle={2}
//                                     >
//                                         {salesRevenue.data.map((item, index) => (
//                                             <Cell key={index} fill={item.color} />
//                                         ))}
//                                     </Pie>
//                                 </PieChart>
//                             </ResponsiveContainer>
//                         </div>

//                         {/* TEXT BELOW DONUT */}
//                         <div className="text-center mt-2">
//                             <div className="text-muted fs-body-sm">
//                                 Total All Revenue
//                             </div>
//                             <div className="fw-semibold text-secondary">
//                                 ${salesRevenue.total.toLocaleString()}
//                             </div>
//                         </div>
//                     </div>
//                 </div>


//                 {/* MIDDLE : LEGEND LEFT (1/3) */}
//                 <div className="col-4">
//                     {salesRevenue.data.slice(0, 3).map((item, index) => (
//                         <div className="d-flex align-items-start gap-2 mb-2" key={index}>
//                             <span
//                                 style={{
//                                     width: 6,
//                                     height: 32,
//                                     borderRadius: 6,
//                                     background: item.color,
//                                 }}
//                             />
//                             <div>
//                                 <div className="fw-medium fs-body-sm">{item.label}</div>
//                                 <div className="text-muted fs-body-sm">
//                                     {item.percent}% • ${item.value.toLocaleString()}
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* RIGHT : LEGEND RIGHT (1/3) */}
//                 <div className="col-4">
//                     {salesRevenue.data.slice(3).map((item, index) => (
//                         <div className="d-flex align-items-start gap-2 mb-2" key={index}>
//                             <span
//                                 style={{
//                                     width: 6,
//                                     height: 32,
//                                     borderRadius: 6,
//                                     background: item.color,
//                                 }}
//                             />
//                             <div>
//                                 <div className="fw-medium fs-body-sm">{item.label}</div>
//                                 <div className="text-muted fs-body-sm">
//                                     {item.percent}% • ${item.value.toLocaleString()}
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//         </Card>
//     );
// }



"use client";

import { Card } from "react-bootstrap";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

/* STABLE COLORS (UI consistency) */
const COLORS = [
  "#F26CF9",
  "#1C2346",
  "#DADDEF",
  "#E9ECF8",
  "#B6C0FF",
  "#FFE4C4",
];

export default function FinancialsSalesRevenue({ data = [], loading }) {
  if (loading) return null;

  /* =========================
     BACKEND-DRIVEN DATA
  ========================= */

  const totalRevenue = data.reduce(
    (sum, item) => sum + (item.revenue || 0),
    0
  );

  const chartData = data.map((item, index) => {
    const value = item.revenue || 0;
    const percent = totalRevenue
      ? ((value / totalRevenue) * 100).toFixed(2)
      : 0;

    return {
      label: item.category_name,
      value,
      percent,
      color: COLORS[index % COLORS.length],
    };
  });

  return (
    <Card className="border-0 rounded-4 shadow-sm p-3 mt-4">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="fw-semibold mb-0">Sales Revenue</h6>
        <span className="text-muted">•••</span>
      </div>

      {/* EMPTY STATE */}
      {chartData.length === 0 && (
        <div className="text-center text-muted py-4">
          No sales revenue data available
        </div>
      )}

      {chartData.length > 0 && (
        <div className="row align-items-center">
          {/* LEFT : DONUT */}
          <div className="col-4 d-flex justify-content-center">
            <div className="d-flex flex-column align-items-center">
              <div style={{ width: 101, height: 101 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      innerRadius={32}
                      outerRadius={50}
                      paddingAngle={2}
                    >
                      {chartData.map((item) => (
                        <Cell
                          key={item.label}
                          fill={item.color}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* TEXT BELOW DONUT */}
              <div className="text-center mt-2">
                <div className="text-muted fs-body-sm">
                  Total All Revenue
                </div>
                <div className="fw-semibold text-secondary">
                  ₹{totalRevenue.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* MIDDLE : LEGEND LEFT */}
          <div className="col-4">
            {chartData.slice(0, 3).map((item) => (
              <div
                className="d-flex align-items-start gap-2 mb-2"
                key={item.label}
              >
                <span
                  style={{
                    width: 6,
                    height: 32,
                    borderRadius: 6,
                    background: item.color,
                  }}
                />
                <div>
                  <div className="fw-medium fs-body-sm">
                    {item.label}
                  </div>
                  <div className="text-muted fs-body-sm">
                    {item.percent}% • ${item.value.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT : LEGEND RIGHT */}
          <div className="col-4">
            {chartData.slice(3).map((item) => (
              <div
                className="d-flex align-items-start gap-2 mb-2"
                key={item.label}
              >
                <span
                  style={{
                    width: 6,
                    height: 32,
                    borderRadius: 6,
                    background: item.color,
                  }}
                />
                <div>
                  <div className="fw-medium fs-body-sm">
                    {item.label}
                  </div>
                  <div className="text-muted fs-body-sm">
                    {item.percent}% • ${item.value.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}

// "use client";

// import { Card, Row, Col } from "react-bootstrap";
// import {
//   Wallet,
//   CircleDollarSign,
//   ArrowUpRight,
//   ArrowDownRight,
//   MoreVertical,
// } from "lucide-react";

// export default function FinancialStats({
//   data,
//   monthlyChange,
//   loading,
// }) {
//   if (loading || !data) return null;


//   const FALLBACK_CHANGES = {
//     balance: 3.4,
//     income: 2.5,
//     expense: -0.2,
//   };

//   const formatChange = (val) => {
//     const sign = val > 0 ? "+" : "";
//     return `${sign}${val.toFixed(1)}%`;
//   };


//   const cards = [
//     {
//       label: "Balance",
//       value: data.balance,
//       change:
//         typeof monthlyChange?.balance_percent_change === "number"
//           ? monthlyChange.balance_percent_change
//           : FALLBACK_CHANGES.balance,
//       icon: "wallet",
//     },
//     {
//       label: "Income",
//       value: data.total_income,
//       change:
//         typeof monthlyChange?.income_percent_change === "number"
//           ? monthlyChange.income_percent_change
//           : FALLBACK_CHANGES.income,
//       icon: "income",
//     },
//     {
//       label: "Expenses",
//       value: data.total_expense,
//       change:
//         typeof monthlyChange?.expense_percent_change === "number"
//           ? monthlyChange.expense_percent_change
//           : FALLBACK_CHANGES.expense,
//       icon: "expense",
//     },
//   ];



//   return (
//     <Row className="g-4 mb-4">
//       {cards.map((card) => {
//         const isDown =
//           typeof card.change === "number" && card.change < 0;

//         return (
//           <Col md={4} key={card.label}>
//             <Card className="border-0 rounded-4 shadow-sm p-4 position-relative h-100">

//               {/* TOP */}
//               <div className="d-flex justify-content-between align-items-start">
//                 <div
//                   className="d-flex align-items-center justify-content-center rounded-circle"
//                   style={{
//                     width: 52,
//                     height: 52,
//                     backgroundColor: "#f1edff",
//                     position: "relative",
//                   }}
//                 >
//                   {card.icon === "wallet" && (
//                     <Wallet size={22} color="#d946ef" />
//                   )}

//                   {card.icon === "income" && (
//                     <CircleDollarSign size={22} color="#d946ef" />
//                   )}

//                   {card.icon === "expense" && (
//                     <>
//                       <CircleDollarSign size={22} color="#d946ef" />
//                       <ArrowUpRight
//                         size={12}
//                         color="#d946ef"
//                         style={{
//                           position: "absolute",
//                           top: 10,
//                           right: 10,
//                         }}
//                       />
//                     </>
//                   )}
//                 </div>

//                 <MoreVertical size={18} className="text-muted" />
//               </div>

//               {/* AMOUNT */}
//               <div className="mt-6">
//                 <h4 className="fw-semibold text-secondary-100">
//                   ${Number(card.value || 0).toLocaleString()}
//                 </h4>
//               </div>

//               {/* LABEL */}
//               <div className="fs-body-sm fw-regular text-grey-30">
//                 {card.label}
//               </div>

//               {/* CHANGE */}
//               {typeof card.change === "number" && (
//                 <div
//                   className="position-absolute"
//                   style={{ right: 16, bottom: 16 }}
//                 >
//                   <div
//                     className="d-flex align-items-center gap-1 px-3 py-1 rounded-pill"
//                     style={{
//                       backgroundColor: card.change < 0
//                         ? "#eef2ff"
//                         : "#f3e8ff",
//                       color: card.change < 0
//                         ? "#6b7280"
//                         : "#7c3aed",
//                       fontSize: "12px",
//                       fontWeight: 500,
//                     }}
//                   >
//                     {card.change < 0 ? (
//                       <ArrowDownRight size={14} />
//                     ) : (
//                       <ArrowUpRight size={14} />
//                     )}

//                     {/*  PLUS / MINUS SIGN */}
//                     {formatChange(card.change)}
//                   </div>
//                 </div>
//               )}

//             </Card>
//           </Col>
//         );
//       })}
//     </Row>
//   );
// }


"use client";

import { Card, Row, Col } from "react-bootstrap";
import {
  Wallet,
  CircleDollarSign,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
} from "lucide-react";

export default function FinancialStats({
  data,
  monthlyChange,
  loading,
}) {
  if (loading || !data || !monthlyChange) return null;

  const formatChange = (val) => {
    const sign = val > 0 ? "+" : "";
    return `${sign}${val.toFixed(1)}%`;
  };

  const cards = [
    {
      label: "Balance",
      value: data.balance,
      change: monthlyChange.balance_percent_change,
      icon: "wallet",
    },
    {
      label: "Income",
      value: data.total_income,
      change: monthlyChange.income_percent_change,
      icon: "income",
    },
    {
      label: "Expenses",
      value: data.total_expense,
      change: monthlyChange.expense_percent_change,
      icon: "expense",
    },
  ];

  return (
    <Row className="g-4 mb-4">
      {cards.map((card) => {
        const isDown =
          typeof card.change === "number" && card.change < 0;

        return (
          <Col md={4} key={card.label}>
            <Card className="border-0 rounded-4 shadow-sm p-4 position-relative h-100">

              {/* TOP */}
              <div className="d-flex justify-content-between align-items-start">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: 52,
                    height: 52,
                    backgroundColor: "#f1edff",
                    position: "relative",
                  }}
                >
                  {card.icon === "wallet" && (
                    <Wallet size={22} color="#d946ef" />
                  )}

                  {card.icon === "income" && (
                    <CircleDollarSign size={22} color="#d946ef" />
                  )}

                  {card.icon === "expense" && (
                    <>
                      <CircleDollarSign size={22} color="#d946ef" />
                      <ArrowUpRight
                        size={12}
                        color="#d946ef"
                        style={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                        }}
                      />
                    </>
                  )}
                </div>

                <MoreVertical size={18} className="text-muted" />
              </div>

              {/* AMOUNT */}
              <div className="mt-6">
                <h4 className="fw-semibold text-secondary-100">
                  ${Number(card.value || 0).toLocaleString()}
                </h4>
              </div>

              {/* LABEL */}
              <div className="fs-body-sm fw-regular text-grey-30">
                {card.label}
              </div>

              {/* CHANGE (Income & Expense only) */}
              {typeof card.change === "number" && (
                <div
                  className="position-absolute"
                  style={{ right: 16, bottom: 16 }}
                >
                  <div
                    className="d-flex align-items-center gap-1 px-3 py-1 rounded-pill"
                    style={{
                      backgroundColor: isDown
                        ? "#eef2ff"
                        : "#f3e8ff",
                      color: isDown
                        ? "#6b7280"
                        : "#7c3aed",
                      fontSize: "12px",
                      fontWeight: 500,
                    }}
                  >
                    {isDown ? (
                      <ArrowDownRight size={14} />
                    ) : (
                      <ArrowUpRight size={14} />
                    )}

                    {formatChange(card.change)}
                  </div>
                </div>
              )}

            </Card>
          </Col>
        );
      })}
    </Row>
  );
}

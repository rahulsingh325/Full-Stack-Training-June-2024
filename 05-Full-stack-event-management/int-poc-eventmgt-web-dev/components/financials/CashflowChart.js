"use client";

import { Card, Dropdown } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

/* Month formatter (UI only) */
const formatMonth = (period) => {
  const [year, month] = period.split("-");
  const date = new Date(year, Number(month) - 1, 1);
  return date.toLocaleString("en-US", { month: "short" });
};

export default function CashflowChart({ data = [], loading }) {
  if (loading) return null;

  /* =========================
     BACKEND → UI SHAPE
  ========================= */

  const chartData = data.map((item) => ({
    month: formatMonth(item.period), // Jan, Feb
    income: item.income || 0,
    expense: item.expense || 0,
  }));

  return (
    <Card className="border-0 rounded-4 shadow-sm p-4 mt-4">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h5 className="fw-semibold mb-3">Cashflow</h5>

          {/* LEGEND */}
          <div className="d-flex align-items-center gap-4 text-muted fs-body-sm">
            <div className="d-flex align-items-center gap-2">
              <span
                className="rounded-circle"
                style={{ width: 10, height: 10, background: "#F26CF9" }}
              />
              Income
            </div>
            <div className="d-flex align-items-center gap-2">
              <span
                className="rounded-circle"
                style={{ width: 10, height: 10, background: "#E6E7F2" }}
              />
              Expense
            </div>
          </div>
        </div>

        {/* RANGE (UI only for now) */}
        {/* <Dropdown>
          <Dropdown.Toggle
            variant="light"
            className="rounded-pill fw-medium text-grey-90"
          >
            Last 6 Months
          </Dropdown.Toggle>
        </Dropdown> */}
      </div>

      {/* EMPTY STATE */}
      {chartData.length === 0 && (
        <div className="text-center text-muted py-5">
          No cashflow data available
        </div>
      )}

      {/* CHART */}
      {chartData.length > 0 && (
        <div style={{ height: 250 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              barCategoryGap={28}
              barGap={-18}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              {/* GRID */}
              <CartesianGrid
                vertical={false}
                strokeDasharray="6 6"
                stroke="#ECECEC"
              />

              {/* ZERO LINE */}
              <ReferenceLine y={0} stroke="#DADADA" strokeWidth={1.2} />

              {/* X AXIS */}
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280", fontSize: 13 }}
              />

              {/* Y AXIS */}
              <YAxis
                width={40}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                tickFormatter={(v) =>
                  v === 0 ? "0" : `${v / 1000}K`
                }
              />

              {/* TOOLTIP */}
              <Tooltip
                cursor={{ fill: "rgba(242,108,249,0.08)" }}
                contentStyle={{
                  borderRadius: 14,
                  border: "none",
                  padding: "12px 14px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                }}
                formatter={(value, name) => [
                  `₹${value.toLocaleString()}`,
                  name === "income" ? "Income" : "Expense",
                ]}
              />

              {/* INCOME */}
              <Bar
                dataKey="income"
                fill="#F26CF9"
                radius={[10, 10, 0, 0]}
                barSize={18}
              />

              {/* EXPENSE */}
              <Bar
                dataKey="expense"
                fill="#E6E7F2"
                radius={[10, 10, 0, 0]}
                barSize={18}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}

"use client";

import { Card } from "react-bootstrap";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { useState, useMemo } from "react";
import DateSelector from "../common/DateSelector";

export default function TicketSalesCard({ data }) {
  if (!data) return null;

  /* ================= DATE FILTER (UI ONLY) ================= */
  const [dateFilter, setDateFilter] = useState("this_week");
  const [range, setRange] = useState(null);

  const dateOptions = [
    { key: "today", label: "Today" },
    { key: "this_week", label: "This Week" },
    { key: "last_7_days", label: "Last 7 Days" },
    { key: "this_month", label: "This Month" },
    { key: "custom", label: "Custom Range" },
  ];

  /* ================= DATA NORMALIZATION (BACKEND = SOURCE OF TRUTH) ================= */
  const chartData = useMemo(() => {
    const total = data.total_capacity || 0;

    const soldOut = data.sold_out || 0;           // confirmed
    const fullyBooked = data.fully_booked || 0;   // pending / initiated
    const available = data.available || 0;        // remaining

    const percent = (value) =>
      total ? Math.round((value / total) * 100) : 0;

    return {
      total,

      //  DONUT → ALL 3 STATES
      donut: [
        {
          label: "Sold Out",
          value: soldOut,
          percent: percent(soldOut),
          color: "#F26CF9",
        },
        {
          label: "Fully Booked",
          value: fullyBooked,
          percent: percent(fullyBooked),
          color: "#37437D",
        },
        {
          label: "Available",
          value: available,
          percent: percent(available),
          color: "#DDDEED",
        },
      ],

      //  LIST BREAKDOWN (same order)
      breakdown: [
        {
          label: "Sold Out",
          value: soldOut,
          percent: percent(soldOut),
          color: "#F26CF9",
        },
        {
          label: "Fully Booked",
          value: fullyBooked,
          percent: percent(fullyBooked),
          color: "#37437D",
        },
        {
          label: "Available",
          value: available,
          percent: percent(available),
          color: "#DDDEED",
        },
      ],
    };
  }, [data]);

  return (
    <Card className="border-0 shadow-sm rounded-4 p-4">

      {/* ================= HEADER ================= */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-semibold mb-0">Ticket Sales</h6>

        {/* <DateSelector
          value={dateFilter}
          onChange={setDateFilter}
          options={dateOptions}
          range={range}
          setRange={setRange}
          showIcon={false}
        /> */}
      </div>

      {/* ================= DONUT ================= */}
      <div style={{ minWidth: "100%", height: 220 }} className="position-relative">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData.donut}
              dataKey="value"
              innerRadius={60}
              outerRadius={80}
              startAngle={90}
              endAngle={-270}
              paddingAngle={3}
              minAngle={6}
            >
              {chartData.donut.map((item, index) => (
                <Cell key={index} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* CENTER TEXT */}
        <div className="position-absolute top-50 start-50 translate-middle text-center">
          <div className="text-muted small">Total Capacity</div>
          <h4 className="fw-bold mb-0">
            {chartData.total.toLocaleString("en-IN")}
          </h4>
        </div>
      </div>

      {/* ================= BREAKDOWN ================= */}
      <div className="mt-4">
        {chartData.breakdown.map(item => (
          <div
            key={item.label}
            className="d-flex align-items-center justify-content-between mb-3"
          >
            <div className="d-flex align-items-center gap-3">
              <span
                style={{
                  width: 6,
                  height: 32,
                  borderRadius: 4,
                  backgroundColor: item.color,
                }}
              />
              <div>
                <div className="text-muted small">{item.label}</div>
                <div className="fw-bold">
                  {item.value.toLocaleString("en-IN")}
                </div>
              </div>
            </div>

            <span className="badge bg-light text-dark px-3 py-2 rounded-3">
              {item.percent}%
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}


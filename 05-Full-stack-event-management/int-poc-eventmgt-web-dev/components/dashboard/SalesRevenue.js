"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card } from "react-bootstrap";
import DateSelector from "../common/DateSelector";
import { useState, useMemo } from "react";
import dayjs from "dayjs";

export default function SalesRevenue({ summary, data }) {
  if (!summary || !data?.length) return null;

  /* ================= DATE STATE (UI ONLY) ================= */
  const [dateFilter, setDateFilter] = useState("last_8_months");
  const [range, setRange] = useState(null);

  const dateOptions = [
    { key: "month", label: "This Month" },
    { key: "last_8_months", label: "Last 8 Months" },
    { key: "custom", label: "Custom Range" },
  ];

  /* ================= NORMALIZE API DATA ================= */
  const chartData = useMemo(() => {
    return data.map(item => {
      const revenue = item.revenue || 0;

      return {
        month: dayjs(item.month).format("MMM"),
        revenue,
        profit: Math.round(revenue * 0.25), // 🔹 TEMP PROFIT (25%)
      };
    });
  }, [data]);

  /* ================= TOOLTIP ================= */
  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;

    return (
      <div className="bg-white shadow rounded-4 px-3 py-2">
        <div className="text-muted small">Revenue</div>
        <div className="fw-bold">
          ${payload[0].value.toLocaleString()}
        </div>
      </div>
    );
  };

  return (
    <Card
      className="border-0 shadow-sm rounded-4 p-4"
      style={{ height: 277 }}
    >

      {/* ================= HEADER ================= */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-semibold mb-0">Sales Revenue</h6>

        {/* <DateSelector
          value={dateFilter}
          onChange={setDateFilter}
          options={dateOptions}
          range={range}
          setRange={setRange}
          showIcon={false}
        /> */}
      </div>

      {/* ================= TOTAL + LEGEND ================= */}
      <div className="d-flex justify-content-between align-items-start mb-2">
        <div>
          <div className="text-muted small">Total Revenue</div>
          <h3 className="fw-bold fs-5 mb-0">
            ${summary.toLocaleString()}
          </h3>
        </div>

        <div className="d-flex gap-3 align-items-center mt-1">
          <Legend color="#E9EBFF" label="Revenue" />
          <Legend color="#F26CF9" label="Profit" />
        </div>
      </div>

      {/* ================= CHART ================= */}
      <div style={{ width: "100%", height: 147 }}>
        <ResponsiveContainer>
          <BarChart
            data={chartData}
            barCategoryGap="25%"
            barGap={6}
            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
          >
            <CartesianGrid vertical={false} stroke="#EDEDED" />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11 }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              width={32}
              tick={{ fontSize: 11 }}
              tickFormatter={(v) =>
                v === 0 ? "0" : `${v / 1000}K`
              }
            />

            <Tooltip content={<CustomTooltip />} cursor={false} />

            <Bar
              dataKey="revenue"
              fill="#E9EBFF"
              radius={[12, 12, 0, 0]}
              barSize={12}
            />

            <Bar
              dataKey="profit"
              fill="#F26CF9"
              radius={[12, 12, 0, 0]}
              barSize={12}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

function Legend({ color, label }) {
  return (
    <div className="d-flex align-items-center gap-2">
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: color,
        }}
      />
      <span className="text-muted small">{label}</span>
    </div>
  );
}

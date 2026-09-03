"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
} from "recharts";
import { Card } from "react-bootstrap";
import DateSelector from "@/components/common/DateSelector";

/* =====================
   CUSTOM TOOLTIP
===================== */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { booking_date, booking_count } = payload[0].payload;

    return (
      <div className="bg-white shadow rounded-4 p-3">
        <div className="text-muted small mb-1">
          {new Date(booking_date).toDateString()}
        </div>
        <div className="fw-bold fs-5">
          {booking_count.toLocaleString()}{" "}
          <span className="fw-normal text-muted fs-6">Bookings</span>
        </div>
      </div>
    );
  }
  return null;
};

export default function BookingsChart({
  data = [],
  dateFilter,
  setDateFilter,
  range,
  setRange,
}) {
  const dateOptions = [
    { key: "week", label: "This Week" },
    { key: "month", label: "This Month" },
    { key: "custom", label: "Custom Range" },
  ];

  // normalize only for chart (NO aggregation)
  // const chartData = data.map((item) => ({
  //   booking_date: item.booking_date,
  //   booking_count: item.booking_count,
  //   day: new Date(item.booking_date).toLocaleDateString("en-US", {
  //     weekday: "short",
  //   }),
  // }));

  const chartData = data.map((item) => {
    const dateObj = new Date(item.booking_date);

    return {
      booking_date: item.booking_date,
      booking_count: item.booking_count,
      dayLabel: dateObj.toLocaleDateString("en-US", {
        weekday: "short",
      }),
    };
  });


  return (
    <Card className="border-0 shadow-sm rounded-4">
      <Card.Body>
        {/* HEADER (UI SAME) */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-semibold mb-0">Bookings Overview</h5>

          {/* <DateSelector
            value={dateFilter}
            onChange={setDateFilter}
            options={dateOptions}
            range={range}
            setRange={setRange}
            showIcon={false}
          /> */}
        </div>

        {/* EMPTY */}
        {data.length === 0 && (
          <div className="text-center text-muted py-4">
            No booking trend data available
          </div>
        )}

        {/* CHART (UI SAME) */}
        {data.length > 0 && (
          <div style={{ width: "100%", height: 277 }}>
            <ResponsiveContainer>
              <LineChart
                data={chartData}
                margin={{ top: 20, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid vertical={false} stroke="#EDEDED" />

                {/* <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#7A7A7A", fontSize: 13 }}
                /> */}

                <XAxis
                  dataKey="booking_date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#7A7A7A", fontSize: 13 }}
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      weekday: "short",
                    })
                  }
                />


                <YAxis
                  axisLine={false}
                  tickLine={false}
                  width={40}
                  tick={{ fill: "#7A7A7A", fontSize: 13 }}
                  tickMargin={10}
                  tickFormatter={(v) =>
                    v >= 1000 ? `${v / 1000}K` : v
                  }
                />

                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{
                    stroke: "#D6D6D6",
                    strokeDasharray: "5 5",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="booking_count"
                  fill="rgba(242,108,249,0.08)"
                  stroke="none"
                />

                <Line
                  type="monotone"
                  dataKey="booking_count"
                  stroke="#F26CF9"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#F26CF9" }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

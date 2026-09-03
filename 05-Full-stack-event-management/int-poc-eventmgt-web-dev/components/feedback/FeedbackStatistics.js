"use client"

import { useMemo, useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

import DateSelector from "@/components/common/DateSelector"

export default function FeedbackStatistics({ data }) {
  const [dateFilter, setDateFilter] = useState("year")
  const [range, setRange] = useState(null)

  const chartData = useMemo(() => {
    if (!Array.isArray(data)) return []

    let rating1to3 = 0
    let rating4to5 = 0

    data.forEach((d) => {
      if (d.bucket === "1-3") {
        rating1to3 = d.total
      }
      if (d.bucket === "4-5") {
        rating4to5 = d.total
      }
    })

    return [
      {
        label: "Ratings",
        rating_1_3: rating1to3,
        rating_4_5: rating4to5,
      },
    ]
  }, [data])


  const dateOptions = [
    { key: "year", label: "This Year" },
    { key: "month", label: "This Month" },
    { key: "custom", label: "Custom Range" },
  ]

  return (
    <div className="card border-0 rounded-4 p-4 h-100">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-semibold text-grey-100 mb-0">
          Feedback Statistics
        </h5>

        {/* <DateSelector
          value={dateFilter}
          onChange={setDateFilter}
          options={dateOptions}
          range={range}
          setRange={setRange}
          showIcon={false}
        /> */}
      </div>

      {/* LEGEND */}
      <div className="d-flex gap-4 small mb-4">
        <LegendDot color="light" text="Rating 1–3" />
        <LegendDot color="pink" text="Rating 4–5" />
      </div>

      {/* CHART */}
      <div style={{ height: 150 }}>
        <ResponsiveContainer>
          <BarChart
            data={chartData}
            barSize={40}
            margin={{ left: -20, top: 10, right: 10, bottom: 10 }}
          >
            <CartesianGrid vertical={false} stroke="#ECECEC" />

            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11 }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11 }}
            />

            <Tooltip cursor={false} content={<CustomTooltip />} />

            <Bar
              dataKey="rating_1_3"
              fill="#EEF0FA"
              radius={[14, 14, 0, 0]}
            />
            <Bar
              dataKey="rating_4_5"
              fill="#F26CF9"
              radius={[14, 14, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>

        {chartData.length === 0 && (
          <div className="text-muted small text-center mt-3">
            No feedback data available
          </div>
        )}
      </div>
    </div>
  )
}

/* ---------------- TOOLTIP ---------------- */

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null

  return (
    <div className="bg-white shadow rounded-4 px-3 py-2 small">
      <div className="d-flex align-items-center gap-2 mb-1">
        <span className="legend-dot legend-light" />
        <strong>{payload[0]?.value}</strong> Rating 1–3
      </div>
      <div className="d-flex align-items-center gap-2">
        <span className="legend-dot legend-pink" />
        <strong>{payload[1]?.value}</strong> Rating 4–5
      </div>
    </div>
  )
}

/* ---------------- LEGEND ---------------- */

function LegendDot({ color, text }) {
  return (
    <div className="d-flex align-items-center gap-2">
      <span className={`legend-dot legend-${color}`} />
      {text}
    </div>
  )
}

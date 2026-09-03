"use client";

import { useState, useEffect } from "react";
import { Card, ProgressBar, Spinner } from "react-bootstrap";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import api from "@/helper/api";
import DateSelector from "../common/DateSelector";

/* COLORS (stable mapping) */
const COLORS = [
  "#F26CF9",
  "#37437D",
  "#DDDEED",
  "#EEEFFF",
  "#B6C0FF",
  "#FFE4C4",
];

export default function BookingsCategoryCard({ data = [] }) {
  /* =========================
     DATE STATE (UI ONLY)
  ========================= */
  const [dateKey, setDateKey] = useState("this_week");
  const [range, setRange] = useState(null);

  /* =========================
     DRILLDOWN STATE
  ========================= */
  const [activeCategory, setActiveCategory] = useState(null);
  const [detailData, setDetailData] = useState([]);
  const [loadingDetail, setLoadingDetail] = useState(false);

  /* =========================
     DERIVED DATE PARAMS
  ========================= */
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  useEffect(() => {
    const today = new Date();
    let start = null;
    let end = null;

    if (dateKey === "this_week") {
      const day = today.getDay();
      start = new Date(today);
      start.setDate(today.getDate() - day);
      end = today;
    }

    if (dateKey === "this_month") {
      start = new Date(today.getFullYear(), today.getMonth(), 1);
      end = today;
    }

    if (dateKey === "custom" && range?.from && range?.to) {
      start = range.from;
      end = range.to;
    }

    if (start && end) {
      setFromDate(start.toISOString().split("T")[0]);
      setToDate(end.toISOString().split("T")[0]);
    }
  }, [dateKey, range]);

  /* =========================
     CHART DATA
  ========================= */
  const chartData = data.map((c, index) => ({
    id: c.category_id || c.event_category_id,
    name: c.category_name || c.event_category,
    value: c.booking_count || 0,
    percent: c.percentage || 0,
    color: COLORS[index % COLORS.length],
  }));


  useEffect(() => {
    if (chartData.length > 0 && !activeCategory) {
      handleCategoryClick(chartData[0]);
    }
  }, [chartData]);

  const totalBookings = chartData.reduce(
    (sum, c) => sum + c.value,
    0
  );

  /* =========================
     CATEGORY CLICK
  ========================= */
  const handleCategoryClick = async (category) => {
    if (!category?.id) return;

    setActiveCategory(category);
    setLoadingDetail(true);

    try {
      const res = await api.get(
        `/bookings/categories/${category.id}`,
        {
          params: {
            from_date: fromDate || undefined,
            to_date: toDate || undefined,
          },
        }
      );

      setDetailData(res.data || []);
    } catch (err) {
      console.error("Category detail API failed", err);
      setDetailData([]);
    } finally {
      setLoadingDetail(false);
    }
  };

  /* =========================
     DATE CHANGE (UI ONLY)
  ========================= */
  const handleDateChange = ({ key, range }) => {
    setDateKey(key);

    if (key === "custom") {
      setRange(range ?? null);
    } else {
      setRange(null);
    }
  };

  return (
    <Card className="border-0 bg-grey-10 shadow-sm rounded-4 p-4">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-semibold mb-0">
          Bookings Category
        </h5>

        {/* <DateSelector
          value={dateKey}
          onChange={handleDateChange}
          range={range}
          setRange={setRange}
          options={[
            { key: "this_week", label: "This Week" },
            { key: "this_month", label: "This Month" },
            { key: "custom", label: "Custom Range" },
          ]}
          showIcon={false}
        /> */}
      </div>

      {/* EMPTY STATE */}
      {chartData.length === 0 && (
        <div className="text-center text-muted py-4">
          No category data available
        </div>
      )}

      {chartData.length > 0 && (
        <>
          {/* ================= TOP SECTION ================= */}
          <div className="row align-items-center mb-4">
            {/* DONUT */}
            <div className="col-md-5">
              <div
                className="position-relative"
                style={{
                  width: "100%",
                  height: 220,
                  pointerEvents: "none",
                }}
              >
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      innerRadius={70}
                      outerRadius={95}
                      startAngle={90}
                      endAngle={-270}
                      paddingAngle={2}
                    >
                      {chartData.map((entry) => (
                        <Cell
                          key={entry.name}
                          fill={entry.color}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>

                <div className="position-absolute top-50 start-50 translate-middle text-center">
                  <div className="text-grey-80 fs-body-sm fw-regular ">
                    Total Bookings
                  </div>
                  <div className="fw-bold text-secondary-100 fs-5">
                    {totalBookings.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* CATEGORY LIST */}
            <div className="col-md-7">
              {chartData.map((item) => (
                <div
                  key={item.id}
                  className="mb-3"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleCategoryClick(item)}
                >
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <div className="fw-medium fs-btn-sm text-grey-100">
                      {item.name}{" "}
                      <span className="text-grey-70 fs-11 fw-regular">
                        ({item.percent}%)
                      </span>
                    </div>
                    <div className="fw-semibold text-grey-90 fs-btn-sm">
                      {item.value.toLocaleString()}
                    </div>
                  </div>

                  <ProgressBar
                    now={item.percent}
                    style={{
                      height: 8,
                      backgroundColor: "#F1F3FA",
                    }}
                  >
                    <ProgressBar
                      now={item.percent}
                      style={{
                        backgroundColor: item.color,
                      }}
                    />
                  </ProgressBar>
                </div>
              ))}
            </div>
          </div>

          {/* ================= DRILLDOWN ================= */}
          {activeCategory && (
            <Card className="border-0 rounded-4 bg-grey-20 p-4 mt-3">
              <div className="fw-semibold fs-body-md text-grey-100 mb-3">
                {detailData[0]?.category_name ||
                  activeCategory.name}{" "}
                <span className="text-grey-70 fs-11 fw-regular">
                  ({activeCategory.value.toLocaleString()} Bookings)
                </span>
              </div>

              {loadingDetail && (
                <div className="text-center py-3">
                  <Spinner size="sm" />
                </div>
              )}

              {!loadingDetail &&
                detailData.length === 0 && (
                  <div className="text-muted small">
                    No events found for this category
                  </div>
                )}

              {!loadingDetail && detailData.length > 0 && (
                <div
                  style={{
                    maxHeight: 180,
                    overflowY: "auto",
                    paddingRight: 6,
                  }}
                  className="custom-scroll"
                >
                  {detailData.map((item) => {
                    const percent = item.total_capacity
                      ? (item.tickets_sold / item.total_capacity) * 100
                      : 0;

                    return (
                      <div
                        key={item.event_id}
                        className="mb-3"
                      >
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <div className="text-grey-90 fs-body-sm fw-regular">
                            {item.event_name}
                          </div>
                          <div>
                            <span className="fs-body-sm fw-medium text-grey-100">
                              {item.tickets_sold}
                            </span>
                            <span className="fs-11 fw-regular text-grey-70">
                              /{item.total_capacity}
                            </span>
                          </div>
                        </div>

                        <ProgressBar
                          now={percent}
                          style={{
                            height: 8,
                            backgroundColor: "#E6E8F2",
                          }}
                        >
                          <ProgressBar
                            now={percent}
                            style={{
                              backgroundColor: "#37437D",
                            }}
                          />
                        </ProgressBar>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          )}
        </>
      )}
    </Card>
  );
}

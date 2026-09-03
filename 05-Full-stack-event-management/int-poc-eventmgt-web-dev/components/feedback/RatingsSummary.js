"use client"

import { useState, useMemo } from "react"
import DateSelector from "../common/DateSelector"
import AddRatingTypeModal from "./AddRatingTypeModal"
import { Button } from "react-bootstrap"

export default function RatingsSummary({ data, ratingTypes = [], onRatingTypeAdded, }) {
  const [dateFilter, setDateFilter] = useState("week")
  const [range, setRange] = useState(null)
  const [showRatingTypeModal, setShowRatingTypeModal] = useState(false)


  const overallRating =
    typeof data?.overall?.overall_rating === "number"
      ? data.overall.overall_rating
      : "-"

  const totalReviews =
    typeof data?.overall?.total_reviews === "number"
      ? data.overall.total_reviews
      : 0

  /* =========================
     SUMMARY DIMENSIONS (API)
     ========================= */
  const summaryDimensions = Array.isArray(data?.dimensions)
    ? data.dimensions
    : []

  /* =========================
     MERGE RATING TYPES + SUMMARY
     ========================= */
  const mergedDimensions = useMemo(() => {
    if (!Array.isArray(ratingTypes) || ratingTypes.length === 0) {
      return summaryDimensions
    }

    return ratingTypes.map((rt) => {
      const found = summaryDimensions.find(
        (d) => d.code === rt.code
      )

      return {
        display_name: rt.display_name,
        avg_rating:
          typeof found?.avg_rating === "number"
            ? found.avg_rating
            : 0,
      }
    })
  }, [ratingTypes, summaryDimensions])

  const dateOptions = [
    { key: "week", label: "This Week" },
    { key: "month", label: "This Month" },
    { key: "custom", label: "Custom Range" },
  ]

  return (
    <div className="card border-0 rounded-4 p-4 h-100">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h6 className="fw-semibold text-grey-100 mb-0">
          Ratings
        </h6>

        <Button
          variant="" className="text-grey-10 rounded-4 fs-11 fw-regular bg-primary-100"
          onClick={() => setShowRatingTypeModal(true)}
        >
          Add Rating Type
        </Button>

        {/* <DateSelector
          value={dateFilter}
          onChange={setDateFilter}
          options={dateOptions}
          range={range}
          setRange={setRange}
          showIcon={false}
        /> */}
      </div>

      <div className="row align-items-center">
        {/* LEFT : OVERALL */}
        <div className="col-md-4 text-center mb-4 mb-lg-0">
          <div className="feedback-donut mx-auto mb-3">
            <div className="feedback-donut-inner d-flex flex-column justify-content-center align-items-center">
              <small className="text-muted fs-10">
                Overall Rating
              </small>

              <div className="fw-bold fs-2 lh-1">
                {overallRating}
                <span className="fs-6 text-grey-50">/5</span>
              </div>

              <small className="text-muted fs-10">
                {totalReviews} Reviews
              </small>
            </div>
          </div>
        </div>

        {/* RIGHT : DIMENSIONS */}
        <div className="col-md-8">
          <div className="row g-3">
            {mergedDimensions.map((d, idx) => (
              <RatingRow
                key={idx}
                label={d.display_name}
                value={d.avg_rating}
              />
            ))}

            {mergedDimensions.length === 0 && (
              <div className="text-muted small">
                No rating data available
              </div>
            )}
          </div>
        </div>
      </div>
      <AddRatingTypeModal
        show={showRatingTypeModal}
        onHide={() => setShowRatingTypeModal(false)}
        onSuccess={() => {
          setShowRatingTypeModal(false)
          onRatingTypeAdded?.()
        }}
      />
    </div>

  )
}

/* =========================
   RATING ROW
   ========================= */

function RatingRow({ label, value }) {
  return (
    <div className="col-6 my-3">
      <div className="progress mb-1" style={{ height: 6 }}>
        <div
          className="progress-bar bg-primary-50"
          style={{ width: `${value * 20}%` }}
        />
      </div>

      <div className="d-flex justify-content-between small">
        <span className="text-secondary-100 fs-10">
          {label}
        </span>
        <span className="text-primary-100 fw-semibold fs-10">
          {value}/5
        </span>
      </div>
    </div>
  )
}

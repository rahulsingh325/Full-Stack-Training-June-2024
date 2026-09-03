"use client"

import React, { useEffect, useState } from "react"
import { Col, Container, Row, Spinner, Alert, Button } from "react-bootstrap"

import RatingsSummary from "@/components/feedback/RatingsSummary"
import FeedbackStatistics from "@/components/feedback/FeedbackStatistics"
import FeedbackTooltip from "@/components/feedback/FeedbackTooltip"
import FeedbackList from "@/components/feedback/FeedbackList"

import api from "@/helper/api"
import EventCard from "../events/components/EventCard"

const Index = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [summary, setSummary] = useState(null)
  const [ratingDistribution, setRatingDistribution] = useState(null)
  const [feedbacks, setFeedbacks] = useState([])
  const [ratingTypes, setRatingTypes] = useState([])

  const [pagination, setPagination] = useState({
    page: 1,
    page_size: 8,
    total_count: 0,
  })

  const [viewMode, setViewMode] = useState("feedback");
  // "feedback" | "event"

  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchAll()
  }, [pagination.page])

  const fetchAll = async () => {
    try {
      setLoading(true)
      setError(null)

      const params = {
        page: pagination.page,
        page_size: pagination.page_size,
      }

      const [summaryRes, distributionRes, listRes, ratingTypesRes] = await Promise.all([
        api.get("/feedback/summary"),
        api.get("/feedback/rating-distribution"),
        api.get("/feedback/list", { params }),
        api.get("/feedback/rating-types"),
      ])

      setSummary(summaryRes.data)
      setRatingDistribution(distributionRes.data)
      setFeedbacks(listRes.data.items || [])
      setRatingTypes(ratingTypesRes.data || [])

      setPagination((p) => ({
        ...p,
        total_count: listRes.data.total_count || 0,
      }))
    } catch (err) {
      console.error(err)
      setError("Failed to load feedback data")
    } finally {
      setLoading(false)
    }
  }

  const fetchEvents = async () => {
    try {
      const res = await api.get(
        "/events/all_events_list",
        {
          params: {
            limit: 8,
            offset: 0,
            status: "active",
            date_filter: "all",
          },
        }
      );

      setEvents(res.data?.items || res.data || []);
    } catch (err) {
      console.error("EVENT FETCH ERROR", err);
    }
  };


  return (
    <Container fluid className="bg-grey-20 p-6 rounded-4">
      {loading && (
        <div className="text-center py-5">
          <Spinner />
        </div>
      )}

      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <>
          <Row className="g-4">
            <Col xl={6}>
              <RatingsSummary data={summary} ratingTypes={ratingTypes} onRatingTypeAdded={fetchAll} />
            </Col>
            <Col xl={6}>
              <FeedbackStatistics data={ratingDistribution} />
            </Col>
          </Row>

          <Row className="mt-4">
            <Col className="p-4 rounded-4 bg-grey-10">
              <FeedbackTooltip
                onAllEvent={() => {
                  setViewMode("event");
                  fetchEvents();
                }}
                onAllRating={() => {
                  setViewMode("feedback");
                }}
              />

              {/* FEEDBACK LIST */}
              {viewMode === "feedback" && (
                <FeedbackList
                  items={feedbacks}
                  pagination={pagination}
                  onPageChange={(page) =>
                    setPagination((p) => ({ ...p, page }))
                  }
                />
              )}

              {/* EVENT LIST */}
              {viewMode === "event" && (
                <div className="row g-4">
                  {events.map((event) => (
                    <div key={event.event_id} className="col-xl-4 col-md-6">
                      <EventCard
                        event={event}
                        showEdit={false}
                        showViewDetails={true}
                      />
                    </div>
                  ))}
                </div>
              )}

            </Col>
          </Row>

        </>
      )}
    </Container>
  )
}

export default Index

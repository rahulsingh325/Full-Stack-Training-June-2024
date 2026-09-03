"use client"

import { useState, useEffect } from "react"
import { Modal, Button, Form } from "react-bootstrap"

/* ---------------- STAR RATING ---------------- */
const StarRating = ({ label, value, onChange }) => (
  <div className="d-flex justify-content-between align-items-center mb-3">
    <span className="fw-medium">{label}</span>
    <div>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          onClick={() => onChange(i)}
          style={{
            cursor: "pointer",
            fontSize: 20,
            color: i <= value ? "#f5c518" : "#ccc",
            marginLeft: 4,
          }}
        >
          ★
        </span>
      ))}
    </div>
  </div>
)

/* ---------------- FEEDBACK MODAL ---------------- */
const FeedbackModal = ({
  show,
  onClose,
  bookingId,
  eventName,
  ratingTypes = [],
  onSubmit,
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const [form, setForm] = useState({
    comment: "",
    is_anonymous: false,
    ratings: {},
  })

  /* INIT RATINGS */
  useEffect(() => {
    const initialRatings = {}
    ratingTypes.forEach((rt) => {
      initialRatings[rt.code] = 0
    })
    setForm((p) => ({ ...p, ratings: initialRatings }))
  }, [ratingTypes])

  const setRating = (code, value) => {
    setForm((p) => ({
      ...p,
      ratings: { ...p.ratings, [code]: value },
    }))
  }

  const handleSubmit = async () => {


    setError(null)

    const ratingsArray = Object.entries(form.ratings)
      .filter(([_, v]) => v > 0)
      .map(([code, value]) => ({ code, value }))

    if (ratingsArray.length === 0) {
      setError("Please give at least one rating")
      return
    }

    const payload = {
      booking_id: bookingId,
      comment: form.comment,
      is_anonymous: form.is_anonymous,
      ratings: ratingsArray,
    }
    


    try {
      setSubmitting(true)
      await onSubmit(payload)
      onClose()
    } catch (err) {
      setError("Feedback already submitted")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Submit Feedback</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="text-muted mb-3">
          Event: <strong>{eventName}</strong>
        </p>

        {ratingTypes.map((rt) => (
          <StarRating
            key={rt.code}
            label={rt.display_name}
            value={form.ratings[rt.code] || 0}
            onChange={(v) => setRating(rt.code, v)}
          />
        ))}

        <Form.Group className="mt-3">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Write your feedback (optional)"
            value={form.comment}
            onChange={(e) =>
              setForm((p) => ({ ...p, comment: e.target.value }))
            }
          />
        </Form.Group>

        <Form.Check
          className="mt-3"
          type="checkbox"
          label="Submit anonymously"
          checked={form.is_anonymous}
          onChange={(e) =>
            setForm((p) => ({ ...p, is_anonymous: e.target.checked }))
          }
        />

        {error && <div className="text-danger small mt-2">{error}</div>}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="" className="bg-secondary-100 text-grey-10" onClick={onClose} disabled={submitting}>
          Cancel
        </Button>
        <Button variant="" className="text-grey-10 bg-primary-100" onClick={handleSubmit} disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Feedback"}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default FeedbackModal

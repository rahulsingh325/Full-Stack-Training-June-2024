"use client"

import { useState } from "react"
import { Modal, Button, Form, Alert, Spinner } from "react-bootstrap"
import api from "@/helper/api"

const AddRatingTypeModal = ({ show, onHide, onSuccess }) => {
  const [code, setCode] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [sortOrder, setSortOrder] = useState(1)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async () => {
    try {
      setLoading(true)
      setError(null)

      await api.post("/feedback/rating-types", {
        code,
        display_name: displayName,
        sort_order: Number(sortOrder),
      })

      // reset
      setCode("")
      setDisplayName("")
      setSortOrder(1)

      onSuccess?.()
      onHide()
    } catch (err) {
      setError("Failed to create rating type")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Rating Type</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form.Group className="mb-3">
          <Form.Label>Code</Form.Label>
          <Form.Control
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="e.g. SERVICE"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Display Name</Form.Label>
          <Form.Control
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Service Quality"
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Sort Order</Form.Label>
          <Form.Control
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="" className="bg-secondary-100 text-grey-10" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="" className="bg-primary-100 text-grey-10" onClick={handleSubmit} disabled={loading}>
          {loading ? <Spinner size="sm" /> : "Create"}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddRatingTypeModal

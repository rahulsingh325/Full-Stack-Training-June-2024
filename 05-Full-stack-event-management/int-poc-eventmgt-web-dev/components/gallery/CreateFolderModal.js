"use client";

import { useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

export default function CreateFolderModal({
  show,
  onClose,
  onCreate,
  events = [],
}) {
  const [eventId, setEventId] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!eventId) {
      toast.error("Please select an event");
      return;
    }

    setLoading(true);
    await onCreate({
      event_id: eventId,
      title: title || null,
    });
    setLoading(false);
    handleClose();
  };

  const handleClose = () => {
    setEventId("");
    setTitle("");
    onClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create New Folder</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Event *</Form.Label>
          <Form.Select
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
          >
            <option value="">Select event</option>
            {events.map((ev) => (
              <option
                key={ev.event_id}
                value={ev.event_id}
              >
                {ev.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group>
          <Form.Label>Gallery Title (optional)</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g. Tech Expo Gallery"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="" className="bg-secondary-100 text-grey-10" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="" className="text-grey-10 bg-primary-100" 
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner size="sm" className="me-2" />
              Creating...
            </>
          ) : (
            "Create Folder"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import api from "@/helper/api";

export default function ComposeModal({ show, onClose, onDraftCreated }) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  // reset when modal opens
  useEffect(() => {
    if (!show) return;
    setSubject("");
    setBody("");
    setLoading(false);
  }, [show]);

  async function handleSaveDraft() {
    if (!subject.trim()) return;

    setLoading(true);
    try {
      const res = await api.post("/emails/draft", {
        subject: subject.trim(),
        body: body.trim(),
      });

      // optional: refresh draft list
      onDraftCreated?.(res.data.email_id);

      onClose();
    } catch (err) {
      console.error("Draft create failed", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal show={show} onHide={onClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>New Draft</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* SUBJECT */}
        <Form.Group className="mb-3">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            placeholder="Enter subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </Form.Group>

        {/* BODY */}
        <Form.Group>
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            placeholder="Write your message…"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="" className="bg-secondary-100 text-grey-10" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="" className="bg-primary-100 text-grey-10"
          disabled={!subject.trim() || loading}
          onClick={handleSaveDraft}
        >
          Save Draft
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

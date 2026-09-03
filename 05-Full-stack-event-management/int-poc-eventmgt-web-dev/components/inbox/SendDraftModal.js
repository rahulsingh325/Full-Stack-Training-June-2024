"use client";

import { useEffect, useState } from "react";
import { Modal, Button, ListGroup, Spinner, Form } from "react-bootstrap";
import api from "@/helper/api";

export default function SendDraftModal({ show, onClose, emailId }) {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  /* ---------- SEARCH USERS (DEBOUNCED) ---------- */
  useEffect(() => {
    if (!show) return;
    if (query.length < 1) {
      setUsers([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await api.get("/users/search", {
          params: {
            q: query,
            limit: 10,
          },
        });
        setUsers(res.data || []);
      } catch (err) {
        console.error("USER SEARCH FAILED", err);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, show]);

  /* ---------- SEND DRAFT ---------- */
  async function handleSend() {
    if (!selectedUser || !emailId) return;

    setSending(true);
    try {
      await api.post("/emails/send", {
        email_id: emailId,
        receiver_user_id: selectedUser.user_id,
      });

      onClose();
      resetState();
    } catch (err) {
      console.error("SEND FAILED", err);
    } finally {
      setSending(false);
    }
  }

  function resetState() {
    setQuery("");
    setUsers([]);
    setSelectedUser(null);
  }

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Send Draft</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* SEARCH INPUT */}
        <Form.Control
          placeholder="Search user by email…"
          value={selectedUser ? selectedUser.email : query}
          disabled={!!selectedUser}
          onChange={(e) => setQuery(e.target.value)}
          className="mb-3"
        />

        {/* CLEAR SELECTED USER */}
        {selectedUser && (
          <Button
            size="sm"
            variant="link"
            onClick={() => {
              setSelectedUser(null);
              setQuery("");
            }}
          >
            Change recipient
          </Button>
        )}

        {/* DROPDOWN LIST */}
        {loading ? (
          <div className="text-center py-3">
            <Spinner size="sm" />
          </div>
        ) : !selectedUser && users.length === 0 && query ? (
          <div className="text-muted text-center py-3">
            No users found
          </div>
        ) : (
          !selectedUser && (
            <ListGroup>
              {users.map((u) => (
                <ListGroup.Item
                  key={u.user_id}
                  action
                  onClick={() => {
                    setSelectedUser(u);
                    setUsers([]);
                  }}
                >
                  {u.email}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )
        )}

      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="primary"
          disabled={!selectedUser || sending}
          onClick={handleSend}
        >
          {sending ? "Sending…" : "Send"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

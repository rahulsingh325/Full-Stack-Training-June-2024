"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Trash2,
  Star,
  MoreVertical,
  Printer,
  ArrowUpRight,
  Reply,
  Forward,
  Send,
} from "lucide-react";
import { Card, Button } from "react-bootstrap";
import { useInbox } from "@/context/InboxContext";
import api from "@/helper/api";
import SendDraftModal from "./SendDraftModal";

export default function MailDetails({ mail }) {
  const { setSelectedMailId } = useInbox();
  const [showSendModal, setShowSendModal] = useState(false);

  if (!mail) {
    return (
      <div className="h-100 d-flex align-items-center justify-content-center text-muted">
        Select a message to read
      </div>
    );
  }

  const {
    email_id,
    subject,
    sender_email,
    receiver_email,
    sent_at,
    created_at,
    body,
    is_starred,
    folder,
  } = mail;

  const d = sent_at
    ? new Date(sent_at)
    : created_at
    ? new Date(created_at)
    : null;

  /* ---------- DISPLAY LOGIC (FINAL) ---------- */
  const isSent = folder === "sent";

  const displayLabel = isSent ? "Recipient" : "Sender";
  const displayEmail = isSent ? receiver_email : sender_email;

  /* ---------- STAR ---------- */
  async function toggleStar() {
    try {
      await api.patch(`/emails/update/${email_id}`, {
        is_starred: !is_starred,
      });
    } catch (err) {
      console.error("STAR UPDATE FAILED", err);
    }
  }

  /* ---------- TRASH ---------- */
  async function moveToTrash() {
    try {
      await api.patch(`/emails/update/${email_id}`, {
        target_folder: "trash",
      });
      setSelectedMailId(null);
    } catch (err) {
      console.error("TRASH FAILED", err);
    }
  }

  return (
    <div className="bg-grey-10 rounded-4 h-100 d-flex flex-column">
      {/* ================= TOP BAR ================= */}
      <div className="d-flex justify-content-between bg-grey-20 rounded-4 p-4 align-items-center">
        <div className="d-flex gap-2">
          <IconButton
            icon={<ArrowLeft size={20} />}
            onClick={() => setSelectedMailId(null)}
          />
          <IconButton
            icon={<Trash2 size={20} />}
            onClick={moveToTrash}
          />
        </div>

        <div className="d-flex align-items-center gap-2">
          <IconButton
            icon={
              <Star
                size={20}
                className={is_starred ? "text-warning fill-warning" : ""}
              />
            }
            onClick={toggleStar}
          />
          <IconButton icon={<MoreVertical size={20} />} />
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <Card className="h-100 bg-grey-10 p-6 border-0">
        {/* SUBJECT */}
        <div className="d-flex justify-content-between align-items-start mb-4">
          <h5 className="fw-medium mb-0">
            {subject === "(draft)" || !subject ? "No subject" : subject}
            {folder === "draft" && (
              <span className="ms-2 text-muted small">(draft)</span>
            )}
          </h5>

          <div className="d-flex gap-2">
            <Button
              variant="light"
              className="rounded-circle"
              onClick={() => window.print()}
            >
              <Printer size={16} />
            </Button>

            <Button variant="light" className="rounded-circle" disabled>
              <ArrowUpRight size={16} />
            </Button>
          </div>
        </div>

        {/* SENDER / RECIPIENT */}
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div className="d-flex gap-3">
            <div
              className="rounded-circle bg-light d-flex align-items-center justify-content-center fw-semibold"
              style={{ width: 40, height: 40 }}
            >
              {displayEmail?.[0]?.toUpperCase() || "?"}
            </div>

            <div>
              {/* <div className="fw-medium">{displayLabel}</div> */}
              <div className="text-grey-90">{displayEmail}</div>

              {/* {isSent && (
                <div className="text-muted small">
                  You sent this message
                </div>
              )} */}

              {/* {folder === "draft" && (
                <div className="text-muted small">
                  This draft is not sent yet
                </div>
              )} */}
            </div>
          </div>

          <div className="text-end text-muted small">
            {d && (
              <>
                <div>{d.toLocaleDateString()}</div>
                <div>
                  {d.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </>
            )}
          </div>
        </div>

        {/* BODY */}
        <div
          className="flex-grow-1 text-grey-90"
          style={{
            overflowY: "auto",
            whiteSpace: "pre-wrap",
            lineHeight: 1.6,
          }}
        >
          {body ? body : <span className="text-muted">(No content)</span>}
        </div>
      </Card>

      {/* ================= FOOTER ================= */}
      <div className="d-flex gap-3 mt-3 pt-3 border-top justify-content-between">
        <div className="d-flex gap-2">
          <Button variant="light" disabled>
            <Reply size={16} /> Reply
          </Button>
          <Button variant="light" disabled>
            <Forward size={16} /> Forward
          </Button>
        </div>

        {/* SEND ONLY FOR DRAFT */}
        {folder === "draft" && (
          <Button
            variant=""
            className="d-flex align-items-center bg-primary-100 text-grey-10 gap-2"
            onClick={() => setShowSendModal(true)}
          >
            <Send size={16} /> Send
          </Button>
        )}
      </div>

      {/* SEND MODAL */}
      {folder === "draft" && (
        <SendDraftModal
          show={showSendModal}
          onClose={() => setShowSendModal(false)}
          emailId={email_id}
        />
      )}
    </div>
  );
}

/* ================= ICON BUTTON ================= */

function IconButton({ icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="btn btn-light rounded-circle d-flex align-items-center justify-content-center"
      style={{ width: 40, height: 40 }}
    >
      {icon}
    </button>
  );
}

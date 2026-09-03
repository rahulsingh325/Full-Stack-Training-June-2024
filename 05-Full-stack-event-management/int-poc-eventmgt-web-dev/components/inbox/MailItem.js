"use client";

import { Star } from "lucide-react";
import { useInbox } from "@/context/InboxContext";
import api from "@/helper/api";

function emailToName(email) {
  if (!email) return "Unknown";

  return email
    .split("@")[0]
    .replace(/[._-]/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());
}


function getDisplayName(mail) {
  if (mail.folder === "inbox") {
    return emailToName(mail.sender_email);
  }

  if (mail.folder === "sent") {
    return emailToName(mail.receiver_email);
  }


  if (mail.folder === "draft" || mail.folder === "drafts") {
    return "You";
  }

  return emailToName(mail.sender_email);
}


export default function MailItem({ mail, refreshList }) {
  const { selectedMailId, setSelectedMailId } = useInbox();
  const active = selectedMailId === mail.email_id;

  // const senderName = mail.from_name || "Harmony Audio";
  const senderName = getDisplayName(mail);

  const initials = senderName
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const displaySubject =
    mail.subject && mail.subject !== "(draft)"
      ? mail.subject
      : "No subject";

  async function toggleStar(e) {
    e.stopPropagation();
    try {
      await api.patch(`/emails/update/${mail.email_id}`, {
        is_starred: !mail.is_starred,
      });
      refreshList();
    } catch (err) {
      console.error(err);
    }
  }

  const time = mail.sent_at || mail.created_at;

  return (
    <div
      onClick={() => setSelectedMailId(mail.email_id)}
      className={`d-flex gap-3 py-3 px-3 border-bottom ${active ? "bg-primary bg-opacity-10 rounded-4" : ""
        }`}
      style={{ cursor: "pointer" }}
    >
      {/* Avatar */}
      <div
        className="rounded-circle bg-light d-flex align-items-center justify-content-center fw-semibold"
        style={{ width: 40, height: 40 }}
      >
        {initials}
      </div>

      {/* Middle Content */}
      <div className="flex-grow-1 min-w-0">
        {/* Sender + Sponsor */}
        <div className="d-flex align-items-center justify-content-between gap-2 mb-1">
          <span className="fw-medium fs-body-md text-grey-100">{senderName}</span>

          {mail.is_sponsor && (
            <span className="badge rounded-pill bg-primary-subtle text-primary">
              Sponsor
            </span>
          )}
          <small className="text-muted">
            {new Date(time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </small>
        </div>

        {/* Subject */}
        <div className="fw-regular d-flex justify-content-between fs-body-sm text-truncate text-grey-70">
          {displaySubject}
          <Star
            size={16}
            onClick={toggleStar}
            className={
              mail.is_starred
                ? "text-warning fill-warning"
                : "text-muted"
            }
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>

    </div>
  );
}

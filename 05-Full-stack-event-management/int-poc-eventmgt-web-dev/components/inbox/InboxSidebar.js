"use client";

import {
  Inbox,
  Star,
  Send,
  FileText,
  Ban,
  Trash2,
} from "lucide-react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { useInbox } from "@/context/InboxContext";

export default function InboxSidebar() {
  const {
    setSelectedMailId,
    folder,
    setFolder,
    setShowSidebar,
  } = useInbox();

  function openFolder(name) {
    setFolder(name);
    setSelectedMailId(null);

    
    if (typeof window !== "undefined" && window.innerWidth < 1200) {
      setShowSidebar(false);
    }
  }

  return (
    <aside className="h-100 d-flex flex-column">
      <Card className="rounded-4 border-0 p-3 mb-6">
        {/* INBOX */}
        <Button
          variant=""
          onClick={() => openFolder("inbox")}
          className={`py-5 px-4 rounded-4 d-flex align-items-center gap-2 ${
            folder === "inbox"
              ? "bg-primary-100 text-grey-10"
              : "bg-grey-10 text-grey-100 border-0"
          }`}
        >
          <Inbox size={18} />
          Inbox
        </Button>

        <ListGroup variant="flush" className="mb-4">
          <SidebarItem
            icon={<Star size={16} />}
            label="Starred"
            active={folder === "starred"}
            onClick={() => openFolder("starred")}
          />

          <SidebarItem
            icon={<Send size={16} />}
            label="Sent"
            active={folder === "sent"}
            onClick={() => openFolder("sent")}
          />

          <SidebarItem
            icon={<FileText size={16} />}
            label="Drafts"
            active={folder === "draft"}
            onClick={() => openFolder("draft")}
          />

          <SidebarItem
            icon={<Ban size={16} />}
            label="Spam"
            active={folder === "spam"}
            onClick={() => openFolder("spam")}
          />

          <SidebarItem
            icon={<Trash2 size={16} />}
            label="Trash"
            active={folder === "trash"}
            onClick={() => openFolder("trash")}
          />
        </ListGroup>
      </Card>

      {/* Labels — UI ONLY */}
      <Card className="border-0 rounded-4 p-3">
        <div className="d-flex justify-content-between align-items-center py-5 px-4">
          <h6 className="mb-0 fw-semibold">Labels</h6>
          <Button size="sm" variant="light" className="rounded-circle">
            +
          </Button>
        </div>

        <ListGroup variant="flush">
          <LabelItem color="bg-primary-subtle" text="Customer" />
          <LabelItem color="bg-pink-subtle" text="Sponsor" />
          <LabelItem color="bg-secondary-subtle" text="Partner" />
        </ListGroup>
      </Card>
    </aside>
  );
}

/* ---------- Helpers ---------- */

function SidebarItem({ icon, label, active, onClick }) {
  return (
    <ListGroup.Item
      action
      onClick={onClick}
      className={`d-flex align-items-center gap-2 border-0 py-5 px-4 ${
        active
          ? "bg-primary-100 text-grey-10 fw-medium fs-body-md rounded-4"
          : "bg-transparent text-grey-100"
      }`}
    >
      {icon}
      {label}
    </ListGroup.Item>
  );
}

function LabelItem({ color, text }) {
  return (
    <ListGroup.Item className="border-0 d-flex align-items-center gap-3 py-5 px-4">
      <span className={`label-tag ${color}`} />
      {text}
    </ListGroup.Item>
  );
}

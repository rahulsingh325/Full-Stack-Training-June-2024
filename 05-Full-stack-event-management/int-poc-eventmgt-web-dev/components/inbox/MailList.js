"use client";

import { useEffect, useState, useCallback } from "react";
import { SlidersHorizontal, Plus, Menu } from "lucide-react";
import { useInbox } from "@/context/InboxContext";
import api from "@/helper/api";

import MailItem from "./MailItem";
import SearchInput from "@/components/common/SearchInput";
import ComposeModal from "./ComposeModal";

export default function MailList() {
  const {
    folder = "inbox",
    selectedMailId,
    setSelectedMailId,
    setShowSidebar,
  } = useInbox();

  const [mails, setMails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [showCompose, setShowCompose] = useState(false);

  const isStarredView = folder === "starred";

  /* ================= FETCH MAILS ================= */

  const fetchMails = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page: 1,
        page_size: 50,
      };

      if (!isStarredView) {
        params.folder = folder;
      }

      const res = await api.get("/emails/list", { params });
      setMails(res.data.items ?? []);
    } catch (err) {
      console.error("EMAIL LIST ERROR", err);
      setMails([]);
    } finally {
      setLoading(false);
    }
  }, [folder, isStarredView]);

  useEffect(() => {
    fetchMails();
  }, [fetchMails]);

  /* ================= AUTO OPEN FIRST MAIL (ONLY ≥1200px) ================= */

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.innerWidth >= 1200 &&
      folder === "inbox" &&
      mails.length > 0 &&
      !selectedMailId
    ) {
      setSelectedMailId(mails[0].email_id);
    }
  }, [folder, mails, selectedMailId, setSelectedMailId]);

  /* ================= FILTER LOGIC ================= */

  const visibleMails = mails.filter((mail) => {
    if (isStarredView) return mail.is_starred === true;
    return mail.folder === folder;
  });

  /* ================= SEARCH FILTER ================= */

  const finalMails = visibleMails.filter((mail) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      mail.subject?.toLowerCase().includes(q) ||
      mail.sender_email?.toLowerCase().includes(q)
    );
  });

  return (
    <>
      <div className="bg-grey-10 rounded-4 h-100">
        {/* ================= TOP BAR ================= */}
        <div className="d-flex align-items-center bg-grey-20 gap-2 p-3 rounded-4 mb-3">
          
          {/* ☰ SIDEBAR BUTTON — SHOW ONLY <1200px */}
          <button
            className="btn btn-light rounded-circle d-xl-none"
            onClick={() => setShowSidebar(true)}
          >
            <Menu size={18} />
          </button>

          <div className="flex-grow-1">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search for message"
              height={42}
            />
          </div>

          {/* <button
            className="btn bg-secondary-100 text-grey-10 d-none d-md-block rounded-circle"
            disabled
          >
            <SlidersHorizontal size={16} />
          </button> */}

          <button
            className="btn bg-primary-100 text-grey-10 rounded-circle"
            onClick={() => setShowCompose(true)}
          >
            <Plus size={16} />
          </button>
        </div>

        {/* ================= MAIL LIST ================= */}
        {loading ? (
          <div className="text-center text-muted py-5">
            Loading…
          </div>
        ) : finalMails.length === 0 ? (
          <div className="text-center text-muted py-5">
            No messages found
          </div>
        ) : (
          finalMails.map((mail) => (
            <MailItem
              key={mail.email_id}
              mail={mail}
              refreshList={fetchMails}
            />
          ))
        )}
      </div>

      {/* ================= COMPOSE MODAL ================= */}
      <ComposeModal
        show={showCompose}
        onClose={() => setShowCompose(false)}
      />
    </>
  );
}

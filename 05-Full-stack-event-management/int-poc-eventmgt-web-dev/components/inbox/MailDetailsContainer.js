"use client";

import { useEffect, useState } from "react";
import { useInbox } from "@/context/InboxContext";
import MailDetails from "./MailDetails";
import api from "@/helper/api";

export default function MailDetailsContainer() {
  const { selectedMailId, folder } = useInbox();
  const [mail, setMail] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedMailId) return;

    markAsRead();
    fetchDetails();
  }, [selectedMailId, folder]);

  async function markAsRead() {
    try {
      await api.patch(`/emails/update/${selectedMailId}`, {
        is_read: true,
      });
    } catch (err) {
      console.error("MARK READ FAILED", err);
    }
  }

  function getDetailsApi(folder, emailId) {
    if (folder === "sent") {
      return `/emails/sender/details/${emailId}`;
    }
    return `/emails/receiver/details/${emailId}`;
  }

  async function fetchDetails() {
    setLoading(true);
    try {
      const url = getDetailsApi(folder, selectedMailId);
      const res = await api.get(url);
      setMail(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        window.location.href = "/login";
      } else {
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  }

  if (loading || !mail) {
    return (
      <div className="bg-grey-20 rounded-4 p-4">
        Loading message…
      </div>
    );
  }

  return <MailDetails mail={mail} />;
}
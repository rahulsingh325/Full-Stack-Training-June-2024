"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { InboxProvider, useInbox } from "@/context/InboxContext";

export default function InboxProviderClient({ children }) {
  const searchParams = useSearchParams();
  const mailIdFromUrl = searchParams.get("mailId");

  return (
    <InboxProvider initialMailId={mailIdFromUrl}>
      <InboxUrlSync />
      {children}
    </InboxProvider>
  );
}

function InboxUrlSync() {
  const { selectedMailId } = useInbox();
  const router = useRouter();

  useEffect(() => {
    if (selectedMailId) {
      router.push(`/inbox?mailId=${selectedMailId}`, { scroll: false });
    } else {
      router.push("/inbox", { scroll: false });
    }
  }, [selectedMailId, router]);

  return null;
}

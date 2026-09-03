"use client";

import { createContext, useContext, useState } from "react";

const InboxContext = createContext(null);

export function InboxProvider({ children, initialMailId = null }) {
  const [selectedMailId, setSelectedMailId] = useState(initialMailId);
  const [folder, setFolder] = useState("inbox");
  const [starredOnly, setStarredOnly] = useState(false);

  // NEW: sidebar control (for mobile)
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <InboxContext.Provider
      value={{
        selectedMailId,
        setSelectedMailId,

        folder,
        setFolder,

        starredOnly,
        setStarredOnly,

        // expose sidebar state
        showSidebar,
        setShowSidebar,
      }}
    >
      {children}
    </InboxContext.Provider>
  );
}

export const useInbox = () => {
  const ctx = useContext(InboxContext);
  if (!ctx) {
    throw new Error("useInbox must be used within InboxProvider");
  }
  return ctx;
};

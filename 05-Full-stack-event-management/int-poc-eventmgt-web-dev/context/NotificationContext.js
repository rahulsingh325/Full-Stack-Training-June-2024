"use client";
import { createContext, useContext, useState } from "react";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [recentActivity, setRecentActivity] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  return (
    <NotificationContext.Provider
      value={{
        recentActivity,
        setRecentActivity,
        unreadCount,
        setUnreadCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  return useContext(NotificationContext);
}

"use client";

import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { useNotification } from "@/context/NotificationContext";

export default function NotificationDropdown({ activity = [] }) {
  const [open, setOpen] = useState(false);
  const { unreadCount, setUnreadCount } = useNotification();
  const ref = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!ref.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const badgeCount = unreadCount > 9 ? "9+" : unreadCount;

  return (
    <div className="position-relative" ref={ref}>
      <button
        className="btn btn-icon bg-secondary-100 text-light rounded-circle position-relative"
        onClick={() => {
          setOpen(!open);
          setUnreadCount(0);
        }}
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary-100 fs-10">
            {badgeCount}
          </span>
        )}
      </button>

      {open && (
        <div
          className="position-absolute end-0 mt-3 bg-white shadow rounded-4"
          style={{
            width: 360,
            maxHeight: 440,
            zIndex: 1050,
            overflow: "hidden",
          }}
        >
          <div className="px-4 py-3 border-bottom">
            <h6 className="fw-semibold mb-0">Recent Activity</h6>
          </div>

          <div className="px-3 py-3" style={{ maxHeight: 300, overflowY: "auto" }}>
            {activity.length ? (
              <RecentActivity data={activity} embedded limit={4} />
            ) : (
              <div className="text-muted text-center small py-4">
                No recent activity
              </div>
            )}
          </div>

          <div className="border-top px-3 py-2">
            <button
              className="btn btn-light w-100 rounded-pill small fw-medium"
              onClick={() => {
                setOpen(false);
                router.push("/activity");
              }}
            >
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

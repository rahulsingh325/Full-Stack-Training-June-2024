"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  FileText,
  Mail,
  Calendar,
  CalendarCheck,
  Wallet,
  Image as ImageIcon,
  MessageSquare,
  LogOut,
  X,
} from "lucide-react";

import api from "@/helper/api";
import { useSidebar } from "@/context/SidebarContext";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { clearUser } from "@/store/authSlice";

/* SAME menuItems – DO NOT CHANGE */
const menuItems = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "Bookings", path: "/bookings", icon: ClipboardList },
  { label: "Invoices", path: "/invoices", icon: FileText },
  { label: "Inbox", path: "/inbox", icon: Mail },
  { label: "Calendar", path: "/calendar", icon: Calendar },
  { label: "Events", path: "/events", icon: CalendarCheck },
  { label: "Financials", path: "/financials", icon: Wallet },
  { label: "Gallery", path: "/gallery", icon: ImageIcon },
  { label: "Feedback", path: "/feedback", icon: MessageSquare },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const { isOpen, closeSidebar } = useSidebar();

  const handleLogout = async () => {
    try {
      await api.post("/authentication/logout");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout API failed", error);
    } finally {
      //  frontend cleanup (FINAL AUTH FLOW)
      localStorage.removeItem("token");
      localStorage.removeItem("user_email");
      dispatch(clearUser());
      closeSidebar();
      router.push("/auth/login");
    }
  };

  return (
    <>
      {/* OVERLAY */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`sidebar d-flex flex-column justify-content-between p-3 m-3 rounded-4 bg-cool-grey-10 ${isOpen ? "open" : ""
          }`}
      >
        {/* HEADER */}
        <div className="d-flex align-items-center justify-content-between mb-4 px-4">
          <div className="d-flex align-items-center gap-2">
            <Image
              src="/images/logo.webp"
              alt="Eventify"
              width={24}
              height={24}
            />
            <h2 className="fs-h4 logo-name fw-medium mb-0 text-secondary-100">
              Eventify
            </h2>
          </div>

          <button className="btn p-1 d-md-none" onClick={closeSidebar}>
            <X size={20} />
          </button>
        </div>

        {/* MENU */}
        <ul className="list-unstyled flex-grow-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.path === "/"
                ? pathname === "/"
                : pathname.startsWith(item.path);

            return (
              <li key={item.label}>
                <Link
                  href={item.path}
                  onClick={closeSidebar}
                  className={`sidebar-link d-flex align-items-center gap-2 px-4 py-2 mb-2 rounded-3 text-secondary-100 ${isActive ? "active" : ""
                    }`}
                >
                  <Icon size={18} />
                  <span className="sidebar-text">
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* UPGRADE BLOCK */}
        <div className="sidebar-upgrade p-3 rounded-3 mb-3 text-center">
          <Image
            src="/images/try-new-version.svg"
            alt="Try New Version"
            width={160}
            height={120}
          />
          <p className="fs-body-sm mt-2 fw-medium mx-4">
            Experience enhanced features and a smoother interface
          </p>
          <button className="btn bg-primary-100 text-white w-100 rounded-pill fs-btn-sm">
            Try New Version
          </button>
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="d-flex align-items-center gap-2 px-4 py-3 rounded-3 border-0 bg-transparent text-secondary-100 sidebar-logout"
        >
          <LogOut size={18} />
          <span className="logout-text">Sign Out</span>
        </button>

      </aside>
    </>
  );
}

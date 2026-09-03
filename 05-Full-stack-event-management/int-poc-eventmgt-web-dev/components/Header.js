"use client";

import { Bell, Settings, Menu } from "lucide-react";
import { Container } from "react-bootstrap";
import { useSidebar } from "@/context/SidebarContext";
import Image from "next/image";
import { useState } from "react";
import SearchInput from "./common/SearchInput";
import { useBreadcrumb } from "@/hooks/useBreadcrumbs";
import { menuItems } from "@/data/menuItems";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import NotificationDropdown from "./NotificationDropdown";
import { useNotification } from "@/context/NotificationContext";
import SettingDropdown from "./AdminDropdown";

const getFirstName = (email = "") => {
  if (!email) return "User";
  return email.split("@")[0];
};

export default function Header() {
  const { openSidebar } = useSidebar();
  const [globalSearch, setGlobalSearch] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const { recentActivity } = useNotification();

  /* ================= USER (UI ONLY) ================= */
  const emailFromRedux = useSelector((state) => state.auth.email);

  const emailFromStorage =
    typeof window !== "undefined"
      ? localStorage.getItem("user_email")
      : null;

  const email = emailFromRedux || emailFromStorage;
  const name = getFirstName(email);

  const breadcrumbs = useBreadcrumb(menuItems);
  const lastCrumb = breadcrumbs[breadcrumbs.length - 1];
  const isDashboardHome = pathname === "/";

  return (
    <Container fluid className="bg-grey-20 rounded-4 px-6 py-3 py-lg-4 my-3">
      <div className="d-flex justify-content-between align-items-center">

        {/* LEFT (DESKTOP) */}
        <div className="d-none d-md-block">
          {!isDashboardHome && (
            <div className="small mb-1 d-flex align-items-center gap-2">
              <span
                className="fw-medium"
                style={{ color: "#F26CF9", cursor: "pointer" }}
                onClick={() => router.push("/")}
              >
                Dashboard
              </span>
              <span className="text-muted">/</span>
              <span className="text-muted fw-medium">
                {lastCrumb?.label}
              </span>
            </div>
          )}

          <h4 className="mb-0 fw-semibold">
            {lastCrumb?.label || "Dashboard"}
          </h4>

          {isDashboardHome && (
            <div className="text-muted small mt-1">
              Hello {name}, welcome back!
            </div>
          )}
        </div>

        {/* MOBILE HEADER */}
        <div className="d-flex d-md-none align-items-center justify-content-between w-100">
          <Image
            src="/images/logo.webp"
            alt="Eventify"
            width={24}
            height={24}
          />
          <div className="fw-semibold">
            {lastCrumb?.label || "Dashboard"}
          </div>
          <button className="btn btn-icon" onClick={openSidebar}>
            <Menu size={20} />
          </button>
        </div>

        {/* RIGHT (DESKTOP) */}
        <div className="d-none d-md-flex align-items-center gap-3">

          {/* <SearchInput
            value={globalSearch}
            onChange={setGlobalSearch}
            placeholder="Search anything"
            showIcon
          /> */}

          <NotificationDropdown activity={recentActivity} />

          <SettingDropdown>
            <button className="btn btn-icon bg-secondary-100 text-light rounded-circle">
              <Settings size={18} />
            </button>
          </SettingDropdown>

          {/* USER INFO */}
          <div className="d-flex align-items-center gap-2">
            <Avatar />
            <div className="d-none d-lg-block text-start">
              <div className="fw-medium small">
                {name}
              </div>
              <div className="text-muted small">
                Admin
              </div>
            </div>
          </div>
        </div>

      </div>
    </Container>
  );
}

"use client";

import { SidebarProvider } from "@/context/SidebarContext";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";
import { NotificationProvider } from "@/context/NotificationContext";

/*  Header → client-only */
const Header = dynamic(() => import("@/components/Header"), {
  ssr: false,
});

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <NotificationProvider>
        <div className="dashboard-layout">
          <Sidebar />
          <main className="dashboard-content d-flex flex-column min-vh-100">
            <Header />
            {children}
            <Footer />
          </main>
        </div>
      </NotificationProvider>
    </SidebarProvider>
  );
}

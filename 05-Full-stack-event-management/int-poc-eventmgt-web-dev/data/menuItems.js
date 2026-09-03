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
} from "lucide-react";

export const menuItems = [
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

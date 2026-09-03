"use client";

import Dropdown from "react-bootstrap/Dropdown";
import { useRouter } from "next/navigation";

export default function SettingDropdown({ children }) {
  const router = useRouter();

  return (
    <Dropdown align="end">
      {/* TOGGLE */}
      <Dropdown.Toggle
        as="div"
        id="admin-settings-dropdown"  
        className="admin-dropdown-toggle"
      >
        {children}
      </Dropdown.Toggle>

      {/* MENU */}
      <Dropdown.Menu align="end" className="shadow-sm">
        <Dropdown.Item
          onClick={() => router.push("/settings/organization")}
        >
          Organization
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

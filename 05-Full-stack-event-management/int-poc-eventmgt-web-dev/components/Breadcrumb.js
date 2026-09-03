"use client";

import Link from "next/link";
import { useBreadcrumb } from "@/hooks/useBreadcrumbs";
import { menuItems } from "@/data/menuItems";

export default function Breadcrumb() {
  const breadcrumbs = useBreadcrumb(menuItems);

  return (
    <div className="mb-3 text-muted small">
      {breadcrumbs.map((item, index) => (
        <span key={item.path}>
          {index > 0 && " / "}
          {index === breadcrumbs.length - 1 ? (
            <span className="fw-medium text-dark">
              {item.label}
            </span>
          ) : (
            <Link
              href={item.path}
              className="text-decoration-none text-muted"
            >
              {item.label}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}

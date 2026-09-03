// "use client";

// import { usePathname } from "next/navigation";

// export function useBreadcrumb(menuItems) {
//   const pathname = usePathname();

//   // Dashboard (/)
//   if (pathname === "/") {
//     return [{ label: "Dashboard", path: "/" }];
//   }

//   const segments = pathname.split("/").filter(Boolean);

//   let currentPath = "";
//   const crumbs = [{ label: "Dashboard", path: "/" }];

//   segments.forEach((seg) => {
//     currentPath += `/${seg}`;

//     const matched = menuItems.find(
//       (item) => item.path === currentPath
//     );

//     crumbs.push({
//       label: matched
//         ? matched.label
//         : seg.replace(/-/g, " "),
//       path: currentPath,
//     });
//   });

//   return crumbs;
// }






import { usePathname } from "next/navigation";

export function useBreadcrumb(menuItems) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs = [];
  let path = "";

  segments.forEach((seg, index) => {
    path += `/${seg}`;

    const prev = segments[index - 1];

    /* ===============================
       HANDLE DYNAMIC IDS
    =============================== */
    const isId =
      seg.length > 20 && seg.includes("-");

    if (isId) {
      if (prev === "bookings") {
        breadcrumbs.push({
          label: "Booking Details",
          path,
        });
      } else if (prev === "events") {
        breadcrumbs.push({
          label: "Event Details",
          path,
        });
      } else {
        breadcrumbs.push({
          label: "Details",
          path,
        });
      }
      return;
    }

    /* ===============================
       HANDLE NESTED STATIC PAGES
    =============================== */
    if (seg === "voucher" && prev) {
      breadcrumbs.push({
        label: "E-Voucher",
        path,
      });
      return;
    }

    /* ===============================
       NORMAL MENU MATCH
    =============================== */
    const match = menuItems.find(
      (item) => item.path === path
    );

    if (match) {
      breadcrumbs.push({
        label: match.label,
        path,
      });
    }
  });

  return breadcrumbs;
}

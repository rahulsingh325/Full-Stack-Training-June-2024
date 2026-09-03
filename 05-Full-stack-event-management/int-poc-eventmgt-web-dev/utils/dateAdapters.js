// utils/dateAdapters.js

const toDateString = (d) => {
  if (!d) return undefined;
  return d.toISOString().split("T")[0];
};

/* =========================
   FINANCIALS ADAPTER
   backend: month_filter
========================= */
export function financialsDateAdapter({ key, range }) {
  if (key === "custom") {
    if (!range?.from || !range?.to) return null;

    return {
      month_filter: "custom",
      from_date: toDateString(range.from),
      to_date: toDateString(range.to),
    };
  }

  return {
    month_filter: key, // this_month | last_month
  };
}

/* =========================
   GALLERY ADAPTER
   backend: date_filter
========================= */
export function galleryDateAdapter({ key, range }) {
  switch (key) {
    case "this_week":
      return { date_filter: "week" };

    case "this_month":
      return { date_filter: "month" };

    case "custom":
      if (!range?.from || !range?.to) return null;

      return {
        date_filter: "custom",
        from_date: toDateString(range.from),
        to_date: toDateString(range.to),
      };

    case "all":
    default:
      return { date_filter: "all" };
  }
}

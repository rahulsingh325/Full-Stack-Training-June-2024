import { useState, useMemo } from "react";

export default function usePagination({
  totalItems,
  initialPageSize = 6,
}) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalPages = Math.ceil(totalItems / pageSize);

  const range = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return { start, end };
  }, [page, pageSize]);

  const goToPage = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  const changePageSize = (size) => {
    setPageSize(size);
    setPage(1); 
  };

  return {
    page,
    totalPages,
    pageSize,
    range,
    goToPage,
    changePageSize,
  };
}

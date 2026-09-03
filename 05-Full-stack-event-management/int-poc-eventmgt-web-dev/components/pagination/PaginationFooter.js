import { Pagination, Dropdown } from "react-bootstrap";

function getPages(page, totalPages) {
  const pages = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  pages.push(1);

  if (page > 3) {
    pages.push("...");
  }

  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (page < totalPages - 2) {
    pages.push("...");
  }

  pages.push(totalPages);

  return pages;
}


export default function PaginationFooter({
  page,
  totalPages,
  pageSize,
  totalItems,
  pageSizeOptions = [],
  onPageChange,
  onPageSizeChange,
}) {
  if (totalPages <= 1) return null;

  const pages = getPages(page, totalPages);

  return (
    <div className="d-flex justify-content-sm-between justify-content-center align-items-center mt-4">

      {/* LEFT INFO */}
      <div className="text-muted small d-flex align-items-center gap-2 d-none d-sm-flex flex-nowrap">
        Showing

        {/* PAGE SIZE DROPDOWN */}
        <Dropdown>
          <Dropdown.Toggle
            size="sm"
            variant="light"
            className="rounded-pill px-3"
          >
            {pageSize}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {pageSizeOptions.map((size) => (
              <Dropdown.Item
                key={size}
                active={size === pageSize}
                onClick={() => onPageSizeChange(size)}
              >
                {size}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        out of <strong>{totalItems}</strong>
      </div>

      {/* RIGHT PAGINATION */}
      <Pagination className="mb-0 pagination-circle">
        <Pagination.Prev
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        />

        {pages.map((p, i) =>
          p === "..." ? (
            <Pagination.Ellipsis
              key={`ellipsis-${i}`}
              disabled
            />
          ) : (
            <Pagination.Item
              key={`page-${p}-${i}`}
              active={p === page}
              onClick={() => onPageChange(p)}
            >
              {p}
            </Pagination.Item>
          )
        )}

        <Pagination.Next
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
        />
      </Pagination>

    </div>
  );
}


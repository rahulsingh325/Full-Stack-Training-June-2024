"use client";

import { Card, Table, Badge } from "react-bootstrap";
import SearchInput from "../common/SearchInput";
import FilterTrigger from "../common/FilterTrigger";
import DateSelector from "../common/DateSelector";
import PaginationFooter from "../pagination/PaginationFooter";

/* =========================
   LOCAL DATE / TIME FORMAT (utils REMOVED, UI SAME)
========================= */
const getDateTime = (iso) => {
  if (!iso) return { date: "-", time: "-" };

  const d = new Date(iso);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return {
    date: `${year}/${month}/${day}`,
    time: d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
  };
};

export default function RecentTransactions({
  data = [],
  loading = false,

  /* pagination */
  page = 1,
  totalPages = 1,
  totalItems = 0,
  pageSize,

  /* date filter */
  dateKey,
  range,
  setRange,
  onDateChange,

  /* callbacks */
  onPageChange,
  onPageSizeChange,
  search,
  onSearchChange,
}) {
  return (
    <Card className="border-0 rounded-4 shadow-sm p-4 mt-4">
      {/* ================= HEADER ================= */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-semibold mb-0">Recent Transactions</h6>

        <div className="d-flex align-items-center gap-2">
          {/* SEARCH */}
          <div style={{ width: 200 }}>
            <SearchInput
              value={search}
              placeholder="Search event"
              height={30}
              onChange={(val) => onSearchChange?.(val)}
            />
          </div>

          {/* FILTER ICON */}
          {/* <div className="d-none d-sm-block">
            <FilterTrigger onOpen={() => { }} />
          </div> */}
          {/* DATE FILTER */}
          <div className="d-none d-md-block">
            <DateSelector
              value={dateKey}
              range={range}
              setRange={setRange}
              options={[
                { key: "this_month", label: "This Month" },
                { key: "last_month", label: "Last Month" },
                { key: "custom", label: "Custom Range" },
              ]}
              onChange={(val) => {
                onDateChange?.(val);
                onPageChange?.(1);
              }}
              showIcon={false}
            />
          </div>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <Table responsive borderless hover className="align-middle mb-4">
        <thead className="text-muted small border-bottom">
          <tr>
            <th className="text-grey-70 fw-regular fs-11">Date</th>
            <th className="text-grey-70 fw-regular fs-11">Event</th>
            <th className="text-grey-70 fw-regular fs-11">Amount</th>
            <th className="text-grey-70 fw-regular fs-11">Note</th>
            <th className="text-grey-70 fw-regular fs-11">Status</th>
          </tr>
        </thead>

        <tbody>
          {!loading && data.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center text-muted py-4">
                No transactions found
              </td>
            </tr>
          )}

          {data.map((item) => {
            const { date, time } = getDateTime(item.transaction_date);

            const isIncome =
              item.transaction_type === "income" ||
              item.transaction_type === "BOOKING";

            return (
              <tr key={item.transaction_id} className="border-bottom">
                {/* DATE */}
                <td>
                  <div className="fw-regular fs-body-sm text-grey-100">
                    {date}
                  </div>
                  <div className="text-grey-70 fs-11 fw-regular">
                    {time}
                  </div>
                </td>

                {/* EVENT */}
                <td className="fw-regular fs-body-sm text-grey-100">
                  {item.event_name || "-"}
                </td>

                {/* AMOUNT */}
                <td
                  className={`fw-regular ${isIncome
                    ? "text-primary-110"
                    : "text-cool-grey-60"
                    }`}
                >
                  {isIncome ? "+" : "-"}$
                  {Math.abs(item.amount).toLocaleString()}
                </td>

                {/* NOTE */}
                <td>
                  <span className="bg-grey-20 rounded px-2 py-1 small">
                    {item.note || "-"}
                  </span>
                </td>

                {/* STATUS */}
                <td>
                  <Badge
                    pill
                    bg="light"
                    text={
                      item.status === "paid" ||
                        item.status === "completed"
                        ? "success"
                        : "secondary"
                    }
                  >
                    {item.status}
                  </Badge>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <PaginationFooter
          page={page}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          onPageChange={onPageChange}
          onPageSizeChange={(size) => {
            onPageSizeChange?.(size);
            onPageChange?.(1);
          }}
        />
      )}
    </Card>
  );
}

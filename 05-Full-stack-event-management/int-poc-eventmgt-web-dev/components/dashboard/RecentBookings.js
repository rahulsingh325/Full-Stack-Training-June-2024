"use client";

import { Card, Table } from "react-bootstrap";
import { useState, useMemo } from "react";
import DateSelector from "../common/DateSelector";
import dayjs from "dayjs";
import SearchInput from "../common/SearchInput";

export default function RecentBookings({ data }) {
  if (!data || !data.length) return null;

  const [dateFilter, setDateFilter] = useState("all");
  const [range, setRange] = useState(null);
  const [search, setSearch] = useState("");

  const dateOptions = [
    { key: "week", label: "This Week" },
    { key: "month", label: "This Month" },
    { key: "custom", label: "Custom Range" },
  ];

  /* ======================================================
     STATUS MAP (API BASED)
  ====================================================== */
  const statusMap = {
    confirmed: {
      label: "Confirmed",
      bg: "#FFE6FA",
      color: "#F26CF9",
    },
    initiated: {
      label: "Pending",
      bg: "#EEF1FF",
      color: "#4B5AD7",
    },
    cancelled: {
      label: "Cancelled",
      bg: "#F1F1F1",
      color: "#6C757D",
    },
  };

  const rows = useMemo(() => {
    return data
      .map(item => {
        const created = dayjs(item.created_at);

        return {
          id: item.booking_ref,
          invoiceId: item.booking_ref,
          created,
          date: created.format("DD MMM YYYY"),
          time: created.format("hh:mm A"),
          name: item.customer_name || "—",
          event: item.event_name,
          qty: 1,
          amount: item.total_amount,
          status: item.status,
        };
      })
      .filter(row => {
        if (search) {
          const q = search.toLowerCase();
          if (
            !row.invoiceId?.toLowerCase().includes(q) &&
            !row.name?.toLowerCase().includes(q) &&
            !row.event?.toLowerCase().includes(q)
          ) {
            return false;
          }
        }

        if (dateFilter === "all") return true;

        if (dateFilter === "week") {
          return row.created.isAfter(dayjs().subtract(7, "day"));
        }

        if (dateFilter === "month") {
          return row.created.isSame(dayjs(), "month");
        }

        if (dateFilter === "custom" && range?.from && range?.to) {
          return row.created.isBetween(
            dayjs(range.from).startOf("day"),
            dayjs(range.to).endOf("day"),
            null,
            "[]"
          );
        }

        return true;
      });
  }, [data, search, dateFilter, range]);


  return (
    <Card className="border-0 shadow-sm rounded-4 p-4 mt-4 h-45">

      {/* ================= HEADER ================= */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h6 className="fw-semibold mb-0">Recent Bookings</h6>

        <div className="d-flex align-items-center gap-3">
          {/* SEARCH (UI ONLY) */}
          <div className="d-none d-md-block">
            <SearchInput
              value={search}
              onChange={(val) => {
                setSearch(val);
              }}
              placeholder="Search name, event, etc"
            />
          </div>


          {/* DATE FILTER (UI ONLY) */}
          {/* <DateSelector
            value={dateFilter}
            onChange={setDateFilter}
            options={dateOptions}
            range={range}
            setRange={setRange}
            showIcon={false}
          /> */}
        </div>
      </div>

      <div
        className="custom-scroll"
        style={{
          maxHeight: "490px",
          overflowY: "auto",
        }}
      >
        {/* ================= TABLE ================= */}
        <Table responsive borderless className="align-middle mb-0 table-nowrap">
          <thead className="border-bottom text-muted small">
            <tr>
              <th className="text-grey-70 fs-11 fw-regular">Booking ID </th>
              <th className="text-grey-70 fs-11 fw-regular">Date </th>
              <th className="text-grey-70 fs-11 fw-regular">Name </th>
              <th className="text-grey-70 fs-11 fw-regular">Event </th>
              <th className="text-center text-grey-70 fw-regular fs-11">Qty</th>
              <th className="text-grey-70 fs-11 fw-regular">Amount</th>
              <th className="text-grey-70 fs-11 fw-regular">Status</th>
            </tr>
          </thead>

          <tbody>
            {rows.map(row => {
              const status =
                statusMap[row.status] || statusMap.initiated;

              return (
                <tr key={row.id}>
                  <td className="fw-regular text-grey-100 fs-body-sm">{row.invoiceId}</td>

                  <td>
                    <div className="fw-regular text-grey-100 fs-body-sm">{row.date}</div>
                    <div className="text-grey-70 fw-regular fs-body-sm small">{row.time}</div>
                  </td>

                  <td className="fw-regular text-grey-100 fs-body-sm">
                    <div className="table-ellipsis">
                      {row.name}
                    </div>
                  </td>
                  <td className="fw-regular text-grey-100 fs-body-sm">{row.event}</td>

                  <td className="fw-regular text-grey-100 fs-body-sm">{row.qty}</td>

                  <td className="fw-regular text-grey-100 fs-body-sm">${row.amount}</td>

                  <td>
                    <span
                      className="px-3 py-1 rounded-pill small fw-medium"
                      style={{
                        backgroundColor: status.bg,
                        color: status.color,
                      }}
                    >
                      {status.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </Card>
  );
}

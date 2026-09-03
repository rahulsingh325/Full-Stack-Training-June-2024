'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Ticket, CheckCircle, DollarSign } from 'lucide-react';

import api from '@/helper/api';
import useDebounce from '@/hooks/useDebounce';
import usePagination from '@/hooks/usePagination';

import BookingsChart from '@/components/booking/BookingsChart';
import StatsCard from '@/components/booking/StatsCard';
import BookingsCategoryCard from '@/components/booking/BookingsCategoryCard';
import BookingsTable from '@/components/booking/BookingsTable';
import BookingsTableControls from '@/components/booking/BookingsTableControls';


const getSunday = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay());
  return d;
};

const formatKey = (date) =>
  date.toISOString().split("T")[0];




const Index = () => {
  /* =========================
     FILTER STATE
  ========================= */
  const [status, setStatus] = useState(null); // "Confirmed" | "Pending" | "Cancelled"
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  /* =========================
     DATA STATE
  ========================= */
  const [kpis, setKpis] = useState(null);
  const [trendData, setTrendData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  const [tableData, setTableData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loadingTable, setLoadingTable] = useState(false);

  const weekTrendData = useMemo(() => {
    if (!trendData || trendData.length === 0) return [];

    // 🔹 backend data ko map me daalo
    const dataMap = {};
    trendData.forEach((item) => {
      dataMap[item.booking_date] = item.booking_count;
    });

    // 🔹 latest date se week ka Sunday nikaalo
    const latestDate = new Date(
      trendData[trendData.length - 1].booking_date
    );
    const sunday = getSunday(latestDate);

    // 🔹 hamesha Sun → Sat generate karo
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(sunday);
      d.setDate(sunday.getDate() + i);

      const key = formatKey(d);

      return {
        booking_date: key,
        booking_count: dataMap[key] || 0,
      };
    });
  }, [trendData]);




  /* =========================
     PAGINATION (SERVER SIDE)
  ========================= */
  const {
    page,
    pageSize,
    totalPages,
    goToPage,
    changePageSize,
  } = usePagination({
    totalItems,
    initialPageSize: 50,
  });

  /* =========================
     DATE PARAMS
  ========================= */
  const dateParams = useMemo(() => ({
    ...(fromDate && { from_date: fromDate }),
    ...(toDate && { to_date: toDate }),
  }), [fromDate, toDate]);

  /* =========================
     DASHBOARD APIS
  ========================= */
  const loadDashboardData = useCallback(async () => {
    if (!fromDate || !toDate) return;

    try {
      const [kpisRes, trendRes, categoryRes] = await Promise.all([
        api.get('/bookings/kpis', { params: dateParams }),
        api.get('/bookings/trend', { params: dateParams }),
        api.get('/bookings/categories', { params: dateParams }),
      ]);

      setKpis(kpisRes.data);
      setTrendData(trendRes.data);
      setCategoryData(categoryRes.data);
    } catch (err) {
      console.error('Dashboard APIs failed', err);
    }
  }, [dateParams, fromDate, toDate]);

  /* =========================
     BOOKINGS LIST (SERVER PAGINATION)
  ========================= */
  const loadBookingsTable = useCallback(async () => {
    setLoadingTable(true);
    try {
      const res = await api.get('/bookings/list', {
        params: {
          ...(status && { status }),                  // backend expects "Confirmed" etc.
          ...(debouncedSearch && { search: debouncedSearch }),
          ...dateParams,
          page,
          page_size: pageSize,
        },
      });

      setTableData(res.data.items || []);
      setTotalItems(res.data.total || 0);
    } catch (err) {
      console.error('Bookings list API failed', err);
      setTableData([]);
      setTotalItems(0);
    } finally {
      setLoadingTable(false);
    }
  }, [
    status,
    debouncedSearch,
    dateParams,
    page,
    pageSize,
  ]);

  /* =========================
     EFFECTS
  ========================= */
  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  useEffect(() => {
    loadBookingsTable();
  }, [loadBookingsTable]);

  // filters change → reset to page 1
  useEffect(() => {
    goToPage(1);
  }, [status, debouncedSearch, fromDate, toDate]);

  /* =========================
     RENDER
  ========================= */
  return (
    <Container fluid className="py-4">
      {/* ===== DASHBOARD ===== */}
      <Row className="g-4">
        <Col xl={6}>
          <Row className="g-4 mb-4">
            <Col sm={4}>
              <StatsCard
                icon={Ticket}
                label="Total Bookings"
                value={kpis?.total_bookings ?? 0}
              />
            </Col>
            <Col sm={4}>
              <StatsCard
                icon={CheckCircle}
                label="Tickets Sold"
                value={kpis?.total_tickets_sold ?? 0}
              />
            </Col>
            <Col sm={4}>
              <StatsCard
                icon={DollarSign}
                label="Earnings"
                value={kpis?.total_earnings ?? 0}
              />
            </Col>
          </Row>

          <BookingsChart
            data={weekTrendData}
            dateFilter="week"
            setDateFilter={() => { }}
            range={null}
            setRange={() => { }}
          />
        </Col>

        <Col xl={6}>
          <BookingsCategoryCard data={categoryData} />
        </Col>
      </Row>

      {/* ===== TABLE ===== */}
      <Row className="mt-4">
        <Col>
          <BookingsTableControls
            search={search}
            setSearch={setSearch}
            status={status}
            setStatus={setStatus}
            setFromDate={setFromDate}
            setToDate={setToDate}
          />

          <BookingsTable
            data={tableData}
            loading={loadingTable}
            page={page}
            totalPages={totalPages}
            pageSize={pageSize}
            totalItems={totalItems}
            onPageChange={goToPage}
            onPageSizeChange={changePageSize}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Index;

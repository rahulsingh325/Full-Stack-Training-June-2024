"use client";

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import api from "@/helper/api";

import FinancialStats from "@/components/financials/FinancialStats";
import RecentTransactions from "@/components/financials/RecentTransactions";
import CashflowChart from "@/components/financials/CashflowChart";
import FinancialsSalesRevenue from "@/components/financials/FinancialsSalesRevenue";
import ExpenseBreakdown from "@/components/financials/ExpenseBreakdown";
import ExpenseAddModal from "@/components/financials/AddExpenseModal";
import AddExpenseCategoryModal from "@/components/financials/AddExpenseCategoryModal";

import useDebounce from "@/hooks/useDebounce";
import { financialsDateAdapter } from "@/utils/dateAdapters";

const Index = () => {
  /* =========================
     DASHBOARD DATA (STATIC-ish)
  ========================= */
  const [kpis, setKpis] = useState(null);
  const [monthlyChange, setMonthlyChange] = useState(null);
  const [cashflow, setCashflow] = useState([]);
  const [salesByCategory, setSalesByCategory] = useState([]);
  const [expenseSummary, setExpenseSummary] = useState([]);

  /* =========================
     RECENT TRANSACTIONS (DYNAMIC)
  ========================= */
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  /* =========================
     FILTER STATE
  ========================= */
  const [filters, setFilters] = useState({
    month_filter: "this_month",
    page_size: 10,
    from_date: undefined,
    to_date: undefined,
  });

  /* =========================
     UI STATE
  ========================= */
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [transactionsLoading, setTransactionsLoading] = useState(true);

  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);

  const [dateKey, setDateKey] = useState("this_month");
  const [range, setRange] = useState(null);

  /* ======================================================
      DASHBOARD SUMMARY FETCH (NO SEARCH / PAGINATION)
  ====================================================== */
  const fetchDashboardSummary = async () => {
    setDashboardLoading(true);
    try {
      const res = await api.get("/financials/all_data", {
        params: {
          month_filter: filters.month_filter,
          ...(filters.month_filter === "custom" &&
            filters.from_date &&
            filters.to_date && {
            from_date: filters.from_date,
            to_date: filters.to_date,
          }),
        },
      });

      const data = res.data || {};
      setKpis(data.kpis || null);
      setMonthlyChange(data.monthly_change || null);
      setCashflow(data.cashflow || []);
      setSalesByCategory(data.sales_by_category || []);
      setExpenseSummary(data.expense_summary || []);
    } catch (err) {
      console.error("Dashboard summary error", err);
    } finally {
      setDashboardLoading(false);
    }
  };

  /* ======================================================
     RECENT TRANSACTIONS FETCH (SEARCH + PAGINATION)
  ====================================================== */
  const fetchRecentTransactions = async () => {
    setTransactionsLoading(true);
    try {
      const res = await api.get("/financials/all_data", {
        params: {
          page,
          page_size: filters.page_size,
          month_filter: filters.month_filter,
          ...(debouncedSearch && { search: debouncedSearch }),
          ...(filters.month_filter === "custom" &&
            filters.from_date &&
            filters.to_date && {
            from_date: filters.from_date,
            to_date: filters.to_date,
          }),
        },
      });

      const data = res.data || {};
      setTransactions(data.recent_transactions || []);

      const pagination = data.pagination || {
        page: 1,
        page_size: filters.page_size,
        total: 0,
      };

      setTotalItems(pagination.total);
      setTotalPages(
        Math.max(
          1,
          Math.ceil(pagination.total / pagination.page_size)
        )
      );
    } catch (err) {
      console.error("Recent transactions error", err);
    } finally {
      setTransactionsLoading(false);
    }
  };

  /* =========================
     EFFECTS
  ========================= */

  // Dashboard summary → only when date filter changes
  useEffect(() => {
    fetchDashboardSummary();
  }, [filters.month_filter, filters.from_date, filters.to_date]);

  // Recent transactions → search / page / page size
  useEffect(() => {
    fetchRecentTransactions();
  }, [page, filters.page_size, filters.month_filter, filters.from_date, filters.to_date, debouncedSearch]);

  useEffect(() => {
    fetchExpenseCategories();
  }, []);

  /* =========================
     EXPENSE CATEGORIES
  ========================= */
  const fetchExpenseCategories = async () => {
    try {
      const res = await api.get("/financials/expense-categories");
      setExpenseCategories(res.data || []);
    } catch (err) {
      console.error("Expense categories error", err);
    }
  };

  /* =========================
     DATE CHANGE HANDLER
  ========================= */
  const handleDateChange = (payload) => {
    setDateKey(payload.key);
    setPage(1);

    const params = financialsDateAdapter(payload);
    if (!params) return;

    setFilters((prev) => ({
      ...prev,
      ...params,
    }));
  };



  /* =========================
     RENDER
  ========================= */
  return (
    <>
      <Container fluid className="bg-grey-20 p-6 rounded-4">
        <div className="d-flex gap-2 justify-content-end mb-3">
          <Button variant=""
            onClick={() => setShowAddCategory(true)}
            className="bg-secondary-100 text-grey-10"
          >
            Add Category
          </Button>
          <Button variant=""
            onClick={() => setShowExpenseModal(true)}
            className="bg-primary-100 text-grey-10"
          >
            Add Expense
          </Button>
        </div>

        <Row>
          <Col xl={7} lg={12}>
            <FinancialStats
              data={kpis}
              monthlyChange={monthlyChange}
              loading={dashboardLoading}
            />

            <RecentTransactions
              data={transactions}
              loading={transactionsLoading}
              search={search}
              page={page}
              totalPages={totalPages}
              totalItems={totalItems}
              pageSize={filters.page_size}
              onPageChange={setPage}
              onSearchChange={(val) => {
                setSearch(val);
                setPage(1);
              }}
              onPageSizeChange={(size) => {
                setPage(1);
                setFilters((prev) => ({
                  ...prev,
                  page_size: size,
                }));
              }}
              dateKey={dateKey}
              range={range}
              setRange={setRange}
              onDateChange={handleDateChange}
            />
          </Col>

          <Col xl={5} lg={12}>
            <CashflowChart data={cashflow} loading={dashboardLoading} />
            <FinancialsSalesRevenue
              data={salesByCategory}
              loading={dashboardLoading}
            />
            
            <ExpenseBreakdown
              data={expenseSummary}
              loading={dashboardLoading}
            />
          </Col>
        </Row>
      </Container>

      {showExpenseModal && (
        <ExpenseAddModal
          show={showExpenseModal}
          onHide={() => setShowExpenseModal(false)}
          categories={expenseCategories}
          onExpenseAdded={fetchRecentTransactions}
        />
      )}

      <AddExpenseCategoryModal
        show={showAddCategory}
        onHide={() => setShowAddCategory(false)}
        onCategoryAdded={fetchExpenseCategories}
      />
    </>
  );
};

export default Index;

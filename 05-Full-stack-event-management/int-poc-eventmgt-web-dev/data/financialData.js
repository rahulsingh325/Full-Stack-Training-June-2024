export const financialData = {
  /* =====================
     TOP STATS (HEADER CARDS)
  ===================== */
  stats: {
    balance: {
      amount: 75000,
      currency: "USD",
      lastMonth: 72350,
      growth: "+3.65%",
    },
    income: {
      amount: 150000,
      currency: "USD",
      lastMonth: 146900,
      growth: "+2.08%",
    },
    expenses: {
      amount: 45000,
      currency: "USD",
      lastMonth: 45380,
      growth: "-0.84%",
    },
  },

  /* =====================
     CASHFLOW CHART
  ===================== */
  cashflow: {
    range: "Last 10 Months",
    data: [
      { month: "Jan", income: 6500, expense: -4200 },
      { month: "Feb", income: 6000, expense: -4800 },
      { month: "Mar", income: 5800, expense: -5200 },
      { month: "Apr", income: 6200, expense: -5000 },
      { month: "May", income: 6815, expense: -5120 },
      { month: "Jun", income: 7200, expense: -5600 },
      { month: "Jul", income: 7600, expense: -5900 },
      { month: "Aug", income: 7000, expense: -5400 },
      { month: "Sep", income: 7400, expense: -6100 },
      { month: "Oct", income: 8000, expense: -6500 },
    ],
  },

  /* =====================
     RECENT TRANSACTIONS (TABLE)
  ===================== */
  transactions: {
    total: 312,
    pageSize: 8,
    currentPage: 1,
    list: [
      {
        id: "TXN-1001",
        date: "2029-05-01",
        time: "10:00 AM",
        title: "Sunset Park Booking",
        category: "Vendor",
        amount: -7000,
        currency: "USD",
        note: "Echo Beats Festival venue payment",
        status: "Completed",
      },
      {
        id: "TXN-1002",
        date: "2029-05-02",
        time: "02:00 PM",
        title: "Ticket Sales",
        category: "Event",
        amount: 15000,
        currency: "USD",
        note: "Echo Beats Festival ticket sales",
        status: "Completed",
      },
      {
        id: "TXN-1003",
        date: "2029-05-03",
        time: "09:30 AM",
        title: "Festival Promotion",
        category: "Marketing",
        amount: -8000,
        currency: "USD",
        note: "Social media promotions",
        status: "Pending",
      },
      {
        id: "TXN-1004",
        date: "2029-05-04",
        time: "03:00 PM",
        title: "Harmony Audio Deposit",
        category: "Sponsorship",
        amount: 10000,
        currency: "USD",
        note: "-",
        status: "Completed",
      },
      {
        id: "TXN-1005",
        date: "2029-05-05",
        time: "11:00 AM",
        title: "Sound & Lighting Rental",
        category: "Equipment",
        amount: -3000,
        currency: "USD",
        note: "-",
        status: "Pending",
      },
      {
        id: "TXN-1006",
        date: "2029-05-06",
        time: "12:00 PM",
        title: "Merchandise Sales",
        category: "Event",
        amount: 2500,
        currency: "USD",
        note: "Echo Beats Festival merch",
        status: "Completed",
      },
      {
        id: "TXN-1007",
        date: "2029-05-07",
        time: "09:00 AM",
        title: "Catering Services Payment",
        category: "Vendor",
        amount: -5500,
        currency: "USD",
        note: "-",
        status: "Completed",
      },
      {
        id: "TXN-1008",
        date: "2029-05-08",
        time: "04:30 PM",
        title: "Volunteer Stipends",
        category: "Staffing",
        amount: -2000,
        currency: "USD",
        note: "-",
        status: "Pending",
      },
    ],
  },

  /* =====================
     SALES REVENUE (DONUT)
  ===================== */
  salesRevenue: {
    total: 150000,
    data: [
      {
        label: "Music",
        value: 45000,
        percent: 30,
        color: "#EEF0FF",
      },
      {
        label: "Fashion",
        value: 30000,
        percent: 20,
        color: "#DCE1FF",
      },
      {
        label: "Sports",
        value: 24000,
        percent: 16,
        color: "#6F7DBF",
      },
      {
        label: "Art & Design",
        value: 21000,
        percent: 14,
        color: "#2E3A67",
      },
      {
        label: "Health & Wellness",
        value: 15000,
        percent: 10,
        color: "#F26CF9",
      },
      {
        label: "Technology",
        value: 15000,
        percent: 10,
        color: "#FFD6FA",
      },
    ],
  },

  /* =====================
     EXPENSE BREAKDOWN (DONUT)
  ===================== */
  expenseBreakdown: {
    total: 45000,
    data: [
      {
        label: "Marketing",
        percent: 30.77,
        value: 13846.15,
        color: "#F26CF9",
      },
      {
        label: "Venue",
        percent: 26.92,
        value: 12115.38,
        color: "#2E3A67",
      },
      {
        label: "Staffing",
        percent: 19.23,
        value: 8653.85,
        color: "#6F7DBF",
      },
      {
        label: "Equipment",
        percent: 11.54,
        value: 5192.31,
        color: "#DCE1FF",
      },
      {
        label: "Miscellaneous",
        percent: 7.69,
        value: 3461.54,
        color: "#EEF0FF",
      },
      {
        label: "Utilities",
        percent: 3.85,
        value: 1730.77,
        color: "#FFD6FA",
      },
    ],
  },
};

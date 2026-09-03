export const dashboardData = {
  stats: {
    upcomingEvents: 345,
    totalBookings: 1798,
    ticketsSold: 1250,
  },

  ticketSales: {
    total: 2780,
    range: "This Week",
    breakdown: [
      {
        label: "Sold Out",
        value: 1251,
        percent: 45,
        color: "#F26CF9",
      },
      {
        label: "Fully Booked",
        value: 834,
        percent: 30,
        color: "#2F3A74",
      },
      {
        label: "Available",
        value: 695,
        percent: 25,
        color: "#E6E8F2",
      },
    ],
  },

  revenueSummary: {
    totalRevenue: 348805,
    range: "Last 8 Months",
  },

  revenue: [
    { month: "Jan", revenue: 45000, profit: 18000 },
    { month: "Feb", revenue: 42000, profit: 14000 },
    { month: "Mar", revenue: 48000, profit: 17000 },
    { month: "Apr", revenue: 56320, profit: 30000 },
    { month: "May", revenue: 47000, profit: 19000 },
    { month: "Jun", revenue: 43000, profit: 15000 },
    { month: "Jul", revenue: 46000, profit: 12000 },
    { month: "Aug", revenue: 52000, profit: 20000 },
  ],



  popularEvents: [
    {
      name: "Music",
      percent: 40,
      total: 20000,
      color: "#E9EBFF",
    },
    {
      name: "Sports",
      percent: 35,
      total: 17500,
      color: "#F26CF9",
    },
    {
      name: "Fashion",
      percent: 15,
      total: 12500,
      color: "#2F3A74",
    },
  ],
};

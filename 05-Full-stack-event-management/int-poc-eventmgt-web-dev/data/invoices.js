export const invoicesData = {
  /* =====================
     TOP STATS
  ===================== */
  stats: {
    paid: {
      count: 1805,
      lastMonth: 1600,
    },
    unpaid: {
      count: 535,
      lastMonth: 615,
    },
    overdue: {
      count: 80,
      lastMonth: 70,
    },
  },

  /* =====================
     INVOICE LIST (LEFT PANEL)
  ===================== */
  list: [
    {
      id: "INV10011",
      amount: 100,
      status: "paid",
      date: "Feb 15, 2029",
      time: "10:30 AM",
    },
    {
      id: "INV10012",
      amount: 220,
      status: "unpaid",
      date: "Feb 16, 2029",
      time: "03:45 PM",
    },
    {
      id: "INV10013",
      amount: 240,
      status: "paid",
      date: "Feb 17, 2029",
      time: "01:15 PM",
    },
    {
      id: "INV10015",
      amount: 50,
      status: "paid",
      date: "Feb 18, 2029",
      time: "05:30 PM",
    },
    {
      id: "INV10016",
      amount: 150,
      status: "paid",
      date: "Feb 19, 2029",
      time: "12:00 PM",
    },
    {
      id: "INV10017",
      amount: 60,
      status: "unpaid",
      date: "Feb 20, 2029",
      time: "02:30 PM",
    },
    {
      id: "INV10018",
      amount: 210,
      status: "paid",
      date: "Feb 21, 2029",
      time: "06:00 PM",
    },
  ],

  /* =====================
     SELECTED INVOICE DETAILS (RIGHT PANEL)
  ===================== */
  selectedInvoice: {
    id: "INV10012",
    status: "unpaid",

    issuedDate: "2029-02-16",
    issuedTime: "03:45 PM",
    dueDate: "2029-02-20",
    dueTime: "11:59 PM",

    billFrom: {
      name: "Event Management Co.",
      address: "123 Sunset Avenue, Los Angeles, CA 90001",
      email: "billing@eventmgmt.com",
      phone: "+1-800-555-1234",
    },

    billTo: {
      name: "Alicia Smithson",
      address: "789 Main Street, Beverly Hills, CA 90210",
      email: "alicia.smithson@gmail.com",
      phone: "+1-310-555-6789",
    },

    /* =====================
       TICKET DETAILS TABLE
    ===================== */
    tickets: [
      {
        category: "Platinum",
        price: 120,
        qty: 1,
        amount: 120,
      },
      {
        category: "Silver",
        price: 50,
        qty: 2,
        amount: 100,
      },
    ],

    summary: {
      subTotal: 220,
      tax: 22,
      fee: 5,
      total: 247,
    },

    note:
      "Please make payment before the due date to avoid any penalties or cancellation of your ticket. For any questions or concerns, contact our support team at support@eventmgmt.com or call +1-800-555-1234.",
  },
};

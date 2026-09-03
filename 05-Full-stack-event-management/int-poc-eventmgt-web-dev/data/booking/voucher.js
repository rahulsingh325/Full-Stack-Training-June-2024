export const voucherData = {
  booking: {
    bookingId: "INV10011",
    invoiceId: "INV202945",
    status: "confirmed",
    paymentStatus: "paid",

    user: {
      name: "Jackson Moore",
      email: "jackson.moore@email.com",
    },

    ticket: {
      category: "Platinum",
      seatNumber: "B12",
      gate: "3",
    },

    date: "April 20, 2029",
    time: {
      start: "12:00 PM",
      end: "11:00 PM",
    },

    barcode: "/images/barcode.png", // static image for now
  },

  event: {
    title: "Rhythm & Beats Music Festival",
    subtitle: "DJ Nova, The Rockerz, ElectroBeats, Harmony Crew",
    location: "Sunset Park, Los Angeles, CA",
    bannerImage: "/images/event-banner.jpg",
  },

  schedule: [
    {
      time: "10:00 AM - 11:00 AM",
      label: "Gate Opens",
    },
    {
      time: "11:00 AM - 12:00 PM",
      label: "Pre-Show Activities",
    },
    {
      time: "12:00 PM - 12:30 PM",
      label: "Opening Ceremony",
    },
    {
      time: "12:30 PM",
      label: "Concert Begin",
    },
  ],

  venueMap: {
    image: "/images/venue-map.png",
    legend: [
      { label: "Parking Area", color: "#5A67D8" },
      { label: "Security Checkpoints", color: "#48BB78" },
      { label: "General Admission", color: "#4299E1" },
      { label: "Information Booth", color: "#ED8936" },
      { label: "Restrooms", color: "#9F7AEA" },
      { label: "Merchandise Booths", color: "#D53F8C" },
      { label: "Food & Beverage Area", color: "#ECC94B" },
      { label: "VIP Lounge", color: "#2D3748" },
      { label: "First Aid Station", color: "#E53E3E" },
      { label: "Main Stage", color: "#38B2AC" },
    ],
  },

  termsAndConditions: [
    {
      title: "Ticket Purchase and Entry",
      points: [
        "All attendees must possess a valid ticket for entry.",
        "Tickets are non-refundable and non-transferable unless specified by the event organizer.",
        "Attendees must present a valid government-issued ID along with their ticket at the gate.",
      ],
    },
    {
      title: "Security and Safety",
      points: [
        "Attendees are subject to security checks, including bag inspections, upon entry.",
        "Prohibited items include weapons, drugs, alcohol, fireworks, and other hazardous materials.",
        "The security team reserves the right to deny entry to individuals deemed a security risk.",
      ],
    },
    {
      title: "Code of Conduct",
      points: [
        "All attendees are expected to behave responsibly and respectfully toward others.",
        "Any disruptive behavior, harassment, or illegal activity will result in immediate removal.",
      ],
    },
    {
      title: "Event Schedule and Changes",
      points: [
        "The event schedule is subject to change without prior notice.",
        "The organizer is not responsible for delays or cancellations caused by unforeseen circumstances.",
      ],
    },
    {
      title: "Photography and Recording",
      points: [
        "Professional cameras and recording devices are prohibited unless authorized.",
        "By attending, you consent to being photographed or filmed for promotional purposes.",
      ],
    },
    {
      title: "Health and Safety",
      points: [
        "Attendees must comply with health and safety guidelines, including those related to COVID-19 if applicable.",
        "The organizer reserves the right to enforce mask mandates or other health measures.",
      ],
    },
    {
      title: "Liability",
      points: [
        "The event organizer is not responsible for any personal injury, loss, or damage to personal property.",
        "By attending, you assume all risks associated with participation in the event.",
      ],
    },
  ],

  prohibitedItems: [
    { label: "Weapons and Dangerous Items", icon: "weapon" },
    { label: "Illegal Substances", icon: "drugs" },
    { label: "Alcohol and Beverages", icon: "alcohol" },
    { label: "Recording Equipment", icon: "camera" },
    { label: "Large or Hazardous Items", icon: "hazard" },
    { label: "Noise Makers and Disruptive Items", icon: "noise" },
    { label: "Unauthorized Merchandise", icon: "merch" },
    { label: "Pets and Animals", icon: "pets" },
    { label: "Bicycles, Skateboards, or Hoverboards", icon: "vehicle" },
    { label: "Coolers or Picnic Baskets", icon: "basket" },
    { label: "Umbrellas or Large Parasols", icon: "umbrella" },
    { label: "Camping Gear", icon: "camping" },
  ],
};

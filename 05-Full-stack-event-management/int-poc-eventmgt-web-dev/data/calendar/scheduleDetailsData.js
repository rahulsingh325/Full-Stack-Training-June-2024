export const scheduleDetailsData = {
  id: "event_001",

  title: "Echo Beats Festival Main Performance",

  type: "event", // event | meeting | task | rehearsal

  datetime: {
    date: "May 24, 2029",
    time: "7:00 PM",
    iso: "2029-05-24T19:00:00",
  },

  location: {
    venue: "Sunset Park",
    city: "Los Angeles",
    state: "CA",
    country: "USA",
    full_address: "Sunset Park, Los Angeles, CA",
  },

  banner_image: null,

  pic: {
    name: "Michael Taylor",
    role: "Event Coordinator",
    phone: "+1-800-555-7890",
    email: "michael.taylor@eventmgmt.com",
    avatar: null,
  },

  team: [
    { id: 1, name: "Team Member 1", avatar: null },
    { id: 2, name: "Team Member 2", avatar: null },
    { id: 3, name: "Team Member 3", avatar: null },
    { id: 4, name: "Team Member 4", avatar: null },
    { id: 5, name: "Team Member 5", avatar: null },
  ],

  notes: [
    "This is the headline performance of the Echo Beats Festival, featuring top artists from EDM, pop, and hip-hop genres.",
    "Ensure the technical team is ready for sound and lighting checks by 5:00 PM.",
    "VIP seating arrangements must be finalized by 6:30 PM.",
  ],

  meta: {
    created_by: "Admin",
    status: "active",
    priority: "high",
  },
};

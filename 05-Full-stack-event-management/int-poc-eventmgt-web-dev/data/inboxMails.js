// export const inboxMails = [
//   {
//     id: "1",
//     sender: "Harmony Audio",
//     initials: "HA",
//     subject: "Sound System Confirmation",
//     preview: "We’d like to confirm the delivery schedule for the sound system setup.",
//     time: "02:30 PM",
//     tag: "Sponsor",
//   },
//   {
//     id: "2",
//     sender: "Patrick Cooper",
//     initials: "PC",
//     subject: "Feedback on Champions League Event",
//     preview: "The event was great, but the seating arrangements could be improved.",
//     time: "01:45 PM",
//     tag: "Customer",
//   },
//   {
//     id: "3",
//     sender: "Marcus Rawless",
//     initials: "MR",
//     subject: "Request for Invoice Update",
//     preview: "Could you please update the billing address on my invoice?",
//     time: "11:30 AM",
//     tag: "Customer",
//   },
//   {
//     id: "4",
//     sender: "Alicia Smithson",
//     initials: "AS",
//     subject: "Query Regarding Ticket Availability",
//     preview: "Hi, I’d like to confirm if additional Platinum tickets are available.",
//     time: "10:15 AM",
//     tag: "Customer",
//   },
//   {
//     id: "5",
//     sender: "Jackson Moore",
//     initials: "JM",
//     subject: "Confirmation of Symphony Tickets",
//     preview: "I’ve received the tickets. Thanks for the prompt confirmation!",
//     time: "Yesterday",
//     tag: "Customer",
//   },
// ];



export const inboxMails = [
  {
    id: "1",
    sender: {
      name: "Harmony Audio",
      email: "support@harmonyaudio.com",
      initials: "HA",
    },
    subject: "Sound System Confirmation",
    preview:
      "We’d like to confirm the delivery schedule for the sound system setup.",
    body: {
      greeting: "Dear Event Management Team,",
      paragraphs: [
        "We hope this message finds you well. As the official sound partner for the Rhythm & Beats Music Festival, we are reaching out to confirm the delivery schedule for the sound system setup.",
        "Here are a few key points we’d like to discuss:",
      ],
      points: [
        {
          title: "Delivery Timing",
          text:
            "Please confirm the preferred date and time for our team to deliver the equipment to Sunset Park.",
        },
        {
          title: "Access Requirements",
          text:
            "Let us know the details regarding venue access, loading dock availability, and any on-site contacts we should coordinate with.",
        },
        {
          title: "Setup Specifications",
          text:
            "We would appreciate it if you could share any specific requirements for the stage layout or unique aspects of the venue that might impact our installation.",
        },
        {
          title: "Testing and Rehearsal",
          text:
            "If there is a scheduled time for sound testing or rehearsal, kindly let us know so we can ensure our team is present for technical support.",
        },
      ],
      closing: "Looking forward to your confirmation and further instructions.",
      signature: [
        "Warm regards,",
        "Harmony Audio Team",
        "+1-800-555-8976",
        "support@harmonyaudio.com",
      ],
    },
    meta: {
      date: "February 20, 2029",
      time: "02:30 PM",
      tag: "Sponsor",
      starred: false,
      unread: true,
    },
  },

  {
    id: "2",
    sender: {
      name: "Patrick Cooper",
      email: "patrick.cooper@email.com",
      initials: "PC",
    },
    subject: "Feedback on Champions League Event",
    preview:
      "The event was great, but the seating arrangements could be improved.",
    body: {
      greeting: "Hello Team,",
      paragraphs: [
        "The event was organized very well overall.",
        "However, I’d like to share some feedback regarding the seating arrangements.",
      ],
      points: [],
      closing: "Hope this feedback helps.",
      signature: ["Thanks,", "Patrick Cooper"],
    },
    meta: {
      date: "February 20, 2029",
      time: "01:45 PM",
      tag: "Customer",
      starred: false,
      unread: false,
    },
  },
];

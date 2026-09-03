const feedbackData = {
  summary: {
    overall_rating: 4.8,
    total_reviews: 15545,

    breakdown: [
      { label: "Venue", rating: 4.7 },
      { label: "Event Organization", rating: 4.8 },
      { label: "Staff Support", rating: 4.6 },
      { label: "Entertainment Quality", rating: 4.9 },
      { label: "Food & Beverages", rating: 4.3 },
      { label: "Value for Money", rating: 4.5 },
    ],
  },

  statistics: {
    year: 2029,
    ratings_count: {
      rating_1_3: 110,
      rating_4_5: 880,
    },
    monthly: [
      { month: "Jan", rating_1_3: 120, rating_4_5: 720 },
      { month: "Feb", rating_1_3: 150, rating_4_5: 820 },
      { month: "Mar", rating_1_3: 180, rating_4_5: 910 },
      { month: "Apr", rating_1_3: 140, rating_4_5: 760 },
      { month: "May", rating_1_3: 160, rating_4_5: 840 },
      { month: "Jun", rating_1_3: 110, rating_4_5: 880 },
      { month: "Jul", rating_1_3: 170, rating_4_5: 790 },
      { month: "Aug", rating_1_3: 130, rating_4_5: 690 },
      { month: "Sep", rating_1_3: 150, rating_4_5: 810 },
      { month: "Oct", rating_1_3: 140, rating_4_5: 860 },
      { month: "Nov", rating_1_3: 120, rating_4_5: 920 },
      { month: "Dec", rating_1_3: 130, rating_4_5: 900 },
    ],
  },

  filters: {
    ratings: ["All Rating", "5", "4+", "3+", "Below 3"],
    categories: [
      "All Category",
      "Music",
      "Fashion",
      "Food & Culinary",
      "Art & Design",
      "Technology",
    ],
    events: [
      "All Event",
      "Echo Beats Festival",
      "Runway Revolution 2029",
      "Symphony Under the Stars",
      "Culinary Delights Festival",
      "Artistry Unveiled Expo",
      "Tech Future Expo",
    ],
    date_range: {
      from: "2029-04-01",
      to: "2029-05-30",
    },
  },

  feedbacks: [
    {
      id: 1,
      name: "Jackson Moore",
      date: "2029-04-22",
      rating: 5,
      comment:
        "An absolutely amazing festival! The lineup of artists was incredible, and the sound quality was impeccable.",
      event: "Echo Beats Festival",
      category: "Music",
    },
    {
      id: 2,
      name: "Alicia Smithson",
      date: "2029-05-02",
      rating: 4,
      comment:
        "Beautiful designs and a well-organized event overall. Seating arrangements could have been planned better.",
      event: "Runway Revolution 2029",
      category: "Fashion",
    },
    {
      id: 3,
      name: "Patrick Cooper",
      date: "2029-04-20",
      rating: 5,
      comment:
        "The music under the open sky was breathtaking. The orchestra was phenomenal and the ambiance was magical.",
      event: "Symphony Under the Stars",
      category: "Music",
    },
    {
      id: 4,
      name: "Clara Simmons",
      date: "2029-05-25",
      rating: 4.5,
      comment:
        "The variety of cuisines and food stalls was fantastic, though some popular stalls ran out of food early.",
      event: "Culinary Delights Festival",
      category: "Food & Culinary",
    },
    {
      id: 5,
      name: "Natalie Johnson",
      date: "2029-05-15",
      rating: 5,
      comment:
        "A treat for art lovers! The installations were awe-inspiring and meeting the artists was a highlight.",
      event: "Artistry Unveiled Expo",
      category: "Art & Design",
    },
    {
      id: 6,
      name: "Henry Carter",
      date: "2029-06-01",
      rating: 4.2,
      comment:
        "Great platform for tech enthusiasts. More hands-on workshops would have made it even better.",
      event: "Tech Future Expo",
      category: "Technology",
    },
  ],

  pagination: {
    current_page: 1,
    per_page: 6,
    total_records: 568,
    total_pages: 95,
  },
};

export default feedbackData;

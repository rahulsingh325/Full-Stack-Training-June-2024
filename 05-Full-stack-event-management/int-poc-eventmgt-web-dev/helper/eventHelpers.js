export const getTicketStats = (tickets = []) => {
  if (!tickets.length) {
    return { minPrice: null, total: 0, sold: 0 };
  }

  const minPrice = Math.min(...tickets.map(t => t.price));
  const total = tickets.reduce((s, t) => s + (t.total_seats || 0), 0);
  const sold = tickets.reduce((s, t) => s + (t.sold_seats || 0), 0);

  return { minPrice, total, sold };
};

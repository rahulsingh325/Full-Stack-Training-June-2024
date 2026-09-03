export const buildAgendaTypeStats = (agendas = []) => {
  const byType = (type) =>
    agendas.filter((a) => a.agenda_type === type).length;

  return [
    {
      key: "all",
      title: "All Schedules",
      count: agendas.length,
    },
    {
      key: "event",
      title: "Event",
      count: byType("event"),
    },
    {
      key: "meeting",
      title: "Meeting",
      count: byType("meeting"),
    },
    {
      key: "setup",
      title: "Setup and Rehearsal",
      count: byType("setup"),
    },
  ];
};

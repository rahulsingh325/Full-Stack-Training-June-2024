import EventCard from "./EventCard";

export default function EventsGrid({ events }) {
  return (
    <div className="row g-4">
      {events.map((event) => (
        <div key={event.id} className="col-md-3">
          <EventCard event={event} />
        </div>
      ))}
    </div>
  );
}

export default function EmptyState({ status }) {
  return (
    <div className="text-center text-muted py-5">
      <h5 className="fw-semibold mb-2">
        No {status} events
      </h5>

      {status === "active" && (
        <p>Publish a draft event to make it active.</p>
      )}

      {status === "draft" && (
        <p>Your draft events will appear here.</p>
      )}

      {status === "past" && (
        <p>No past events found.</p>
      )}
    </div>
  );
}

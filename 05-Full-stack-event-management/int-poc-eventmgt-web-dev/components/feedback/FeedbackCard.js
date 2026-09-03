"use client";

export default function FeedbackCard({ data }) {
  const {
    name = "Anonymous",
    date,
    rating = 0,
    comment = "",
    event = "-",
    category = "-",
  } = data;

  
  return (
    <div className="card border-1 rounded-4 p-4 h-100 shadow-sm flex-column">
      {/* HEADER */}
      <div className="d-flex align-items-start gap-3 mb-3">
        <div
          className="rounded-circle bg-light flex-shrink-0"
          style={{ width: 48, height: 48 }}
        />

        <div className="flex-grow-1">
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <h6 className="mb-0 fw-semibold">{name}</h6>
            <span className="text-muted small">
              {date ? formatDate(date) : ""}
            </span>
          </div>

          <div className="d-flex align-items-center gap-1 mt-1">
            <Stars rating={rating} />
            <span className="ms-1 fw-medium">{rating}</span>
          </div>
        </div>
      </div>

      {/* COMMENT */}
      <p className="text-grey-80 fs-body-sm fw-regular mb-4">{comment}</p>

      {/* EVENT FOOTER */}
      <div className="bg-cool-grey-10 rounded-4 d-flex align-items-center p-3 mt-auto">
        <div
          className="bg-secondary bg-opacity-25 rounded-3 me-3"
          style={{ width: 64, height: 48 }}
        />

        <div className="flex-grow-1">
          <h6 className="mb-1 fw-medium fs-body-sm">{event}</h6>
          <span className="text-primary-110 fw-regular fs-11">{category}</span>
        </div>

        <button className="btn text-grey-10 bg-primary-100 rounded-circle ms-3">
          ↗
        </button>
      </div>
    </div>
  );
}

function Stars({ rating }) {
  const fullStars = Math.round(rating);

  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          style={{
            color: i < fullStars ? "#FFC107" : "#E4E6EB",
            fontSize: 18,
          }}
        >
          ★
        </span>
      ))}
    </>
  );
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
}


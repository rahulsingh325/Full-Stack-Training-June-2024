"use client";

import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { CalendarDays, MapPin, Share2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";

import IconButton from "@/components/ui/IconButton";
import EventMapModal from "./EventMapModal";
import { getTicketStats } from "@/helper/eventHelpers";

const getBookmarks = () => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("bookmarkedEvents")) || [];
};

const saveBookmarks = (ids) => {
  localStorage.setItem("bookmarkedEvents", JSON.stringify(ids));
};


export default function EventDetailsCard({ event }) {
  const [showMap, setShowMap] = useState(false);
  if (!event) return null;

  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const bookmarks = getBookmarks();
    setBookmarked(bookmarks.includes(event.id));
  }, [event.id]);

  const handleBookmark = () => {
    const bookmarks = getBookmarks();

    if (bookmarks.includes(event.id)) {
      // UNBOOKMARK
      const updated = bookmarks.filter((id) => id !== event.id);
      saveBookmarks(updated);
      setBookmarked(false);
    } else {
      // BOOKMARK
      const updated = [...bookmarks, event.id];
      saveBookmarks(updated);
      setBookmarked(true);
    }
  };



  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard");
    }
  };
  /* -----------------------------
     TICKET STATS
  ----------------------------- */
  const { minPrice, sold } = getTicketStats(event.tickets || []);

  /* -----------------------------
     TOTAL CAPACITY (SEAT ZONES)
  ----------------------------- */
  const totalCapacity = (event.seat_zones || []).reduce(
    (sum, zone) => sum + (zone.capacity || 0),
    0
  );

  /* -----------------------------
     FORMATTERS
  ----------------------------- */
  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      : "";

  const formatTime = (time) => (time ? time.slice(0, 5) : "");

  return (
    <Card className="border-0 rounded-4 overflow-hidden mb-4">
      {/* ================= BANNER ================= */}
      <div
        className="w-100 d-flex justify-content-between align-items-start p-4"
        style={{
          height: 340,
          backgroundImage: `url(${event.banner_image_url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* CATEGORY */}
        <Badge pill className="fw-medium px-3 py-2 fs-11 bg-grey-10 text-secondary-100">
          {event.category?.name || "Event"}
        </Badge>

        {/* STATUS */}
        <Badge
          pill
          className="px-3 py-2 d-flex align-items-center bg-primary-30 text-secondary-100 fw-regular gap-1"
        >
          <span
            className="rounded-circle bg-primary-100"
            style={{ width: 8, height: 8 }}
          />
          {event.status?.charAt(0).toUpperCase() + event.status?.slice(1)}
        </Badge>
      </div>

      <Card.Body>
        {/* ================= TITLE + INFO ================= */}
        <div className="d-flex justify-content-between align-items-start gap-3">
          {/* LEFT */}
          <div>
            <h4 className="fw-semibold mb-2">{event.name}</h4>

            <div className="text-muted small d-flex gap-2 mb-1 align-items-center">
              <CalendarDays size={14} />
              {formatDate(event.event_date)} · {formatTime(event.start_time)}
            </div>

            <div className="text-muted small d-flex gap-2 align-items-center">
              <MapPin size={14} />
              {event.venue?.name}, {event.venue?.city}

              <button
                type="button"
                className="btn btn-link ms-2 small text-primary-100 text-decoration-none border rounded-pill px-3 py-0"
                onClick={() => setShowMap(true)}
              >
                Show Map
              </button>
            </div>
          </div>

          {/* RIGHT (DESKTOP) */}
          <div className="d-none d-sm-flex flex-column align-items-end gap-3">
            <div className="d-flex gap-2">
              <button
                className={`icon-btn bookmark-btn ${bookmarked ? "active" : ""}`}
                onClick={handleBookmark}
              >
                <Bookmark size={18} />
              </button>


              <IconButton
                icon={Share2}
                size={30}
                iconSize={16}
                onClick={handleShare}
              />

            </div>

            <div className="d-flex gap-5 text-end">
              <div>
                <div className="text-muted small mb-1">Tickets Sold</div>
                <div className="fw-semibold fs-4">
                  {sold.toLocaleString()}
                  <span className="text-muted fs-6 fw-normal">
                    /{totalCapacity.toLocaleString()}
                  </span>
                </div>
              </div>

              <div>
                <div className="text-muted small mb-1">Starts from</div>
                <div className="fw-bold fs-3 text-primary-100">
                  ${minPrice}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= MOBILE STATS ================= */}
        <div className="d-sm-none mt-3">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex gap-4">
              <div>
                <div className="text-muted small">Tickets Sold</div>
                <div className="fw-semibold">
                  {sold.toLocaleString()}
                  <span className="text-muted fw-normal">
                    /{totalCapacity.toLocaleString()}
                  </span>
                </div>
              </div>

              <div>
                <div className="text-muted small">Starts from</div>
                <div className="fw-bold text-primary-100">
                  ${minPrice}
                </div>
              </div>
            </div>

            <div className="d-flex gap-2">
              <button
                className={`icon-btn bookmark-btn ${bookmarked ? "active" : ""}`}
                onClick={handleBookmark}
              >
                <Bookmark size={18} />
              </button>


              <IconButton
                icon={Share2}
                size={30}
                iconSize={16}
                onClick={handleShare}
              />
            </div>
          </div>
        </div>

        <hr className="my-3" />

        {/* ================= ABOUT ================= */}
        <div>
          <h6 className="fw-semibold mb-1">About Event</h6>
          <p className="text-muted small mb-0">
            {event.description || "No description available."}
          </p>
        </div>
      </Card.Body>

      {/* ================= MAP MODAL ================= */}
      <EventMapModal
        show={showMap}
        onHide={() => setShowMap(false)}
        location={{
          venue_name: event.venue?.name,
          city: event.venue?.city,
          state: event.venue?.state,
          full_address: event.venue?.address,
          map: { map_link: event.venue?.map_link },
          getting_there: event.getting_there,
        }}
      />
    </Card>
  );
}

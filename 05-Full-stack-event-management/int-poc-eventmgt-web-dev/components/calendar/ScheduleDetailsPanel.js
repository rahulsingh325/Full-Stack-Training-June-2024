"use client";

import { Card, Button, Badge } from "react-bootstrap";
import { X, MapPin, Trash2, Calendar } from "lucide-react";
import { formatDate, formatTime } from "@/utils/dateTime";
import { toast } from "react-toastify";

export default function ScheduleDetailsPanel({
  agenda,
  onClose,
  onEdit,
  onDelete,
}) {
  if (!agenda) return null;

  const isPastAgenda = (() => {
    if (!agenda?.agenda_date) return false;

    const agendaDate = new Date(agenda.agenda_date);
    const today = new Date();

    agendaDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return agendaDate < today;
  })();


  const handleDeleteClick = () => {
    if (isPastAgenda) {
      toast.info("Past agendas cannot be deleted");
      return;
    }

    onDelete(agenda);
  };

  const handleEditClick = () => {
    if (isPastAgenda) {
      toast.info("Past agendas cannot be edited");
      return;
    }

    onEdit?.(agenda);
  };


  const {
    title,
    agenda_type,
    agenda_date,
    start_time,
    location,
    notes,

    pic_name,
    pic_role,
    pic_phone,
    pic_email,

    event_name,
    banner_image_url,
  } = agenda;

  return (
    <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden">

      {/* ================= HEADER ================= */}
      <Card.Header className="d-flex border-0 justify-content-between align-items-center bg-white">
        <strong>Schedule Details</strong>

        <div className="d-flex gap-2">
          <div className="d-flex gap-2">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={handleEditClick}
              title={
                isPastAgenda
                  ? "Past agendas cannot be edited"
                  : "Edit agenda"
              }
            >
              Edit
            </Button>
          </div>



          <Button
            variant="danger"
            onClick={handleDeleteClick}
          >
            <Trash2 size={16} />
          </Button>



          <Button
            variant="outline-danger"
            size="sm"
            onClick={onClose}
          >
            <X size={16} />
          </Button>


        </div>
      </Card.Header>

      {/* ================= BANNER ================= */}
      {banner_image_url  && banner_image_url !== ""  ?  (
        <Card.Img
          src={banner_image_url}
          alt={event_name || title}
          style={{
            height: 160,
            objectFit: "cover",
          }}
        />
      ) : (
        <div
          className="bg-grey-40 rounded-top-4 d-flex align-items-center justify-content-center text-grey-100"
          style={{ height: 160 }}
        >
          No Event Image
        </div>
      )}

      <Card.Body>

        {/* ================= TITLE ================= */}
        <h5 className="fw-semibold mb-1">
          {title || "Untitled Agenda"}
        </h5>

        {/* ================= TYPE ================= */}
        {agenda_type && (
          <Badge bg="secondary" className="mb-3 bg-primary-40 text-capitalize text-grey-100 fs-11 fw-regular">
            {agenda_type}
          </Badge>
        )}

        {/* ================= DATE & TIME ================= */}
        {(agenda_date || start_time) && (
          <div className="d-flex align-items-center fs-11 gap-2 text-grey-100 mb-2">
            <Calendar size={16} />

            <span className="fw-medium">
              {formatDate(agenda_date)}
              {start_time && ` - ${formatTime(start_time)}`}
            </span>
          </div>
        )}

        {/* ================= LOCATION ================= */}
        {location && (
          <div className="d-flex fs-11 align-items-center gap-2 text-grey-100 mb-3">
            <MapPin size={14} />
            <span>{location}</span>
          </div>
        )}

        {/* ================= PERSON IN CHARGE ================= */}
        {(pic_name || pic_role || pic_phone || pic_email) && (
          <>
            <h6 className="mb-2 text-grey-70 fs-11 fw-medium">PIC</h6>

            <div className="d-flex bg-grey-20 rounded-4 p-3 gap-3 align-items-start">


              <div className="pic-avatar"></div>


              <div className="flex-grow-1">
                {pic_name && (
                  <div className="fw-regular text-grey-100 fs-11">{pic_name}</div>
                )}

                {pic_role && (
                  <div className="text-grey-70 fs-10 mb-2">{pic_role}</div>
                )}

                <hr className="my-2 text-grey-30" />

                {pic_phone && (
                  <div className="fs-10 text-grey-100">{pic_phone}</div>
                )}

                {pic_email && (
                  <div className="fs-10 text-grey-100">{pic_email}</div>
                )}
              </div>
            </div>
          </>
        )}



        <div className="mt-4">
          <p className="text-grey-70 fw-medium mb-1 fs-11">Team</p>
          <div className="d-flex align-items-center gap-1">
            <div className="team-circle"></div>
            <div className="team-circle"></div>
            <div className="team-circle"></div>
            <div className="team-circle"></div>
          </div>

        </div>


        {/* ================= NOTES ================= */}
        {notes && (
          <>
            <h6 className="mb-2 mt-4 fs-11 fw-medium text-grey-70">Note</h6>
            <Card className="bg-grey-20">
              <ul className="text-grey-90 ps-3 mb-1">
                {notes
                  .split("\n")
                  .filter(line => line.trim() !== "")
                  .map((line, idx) => (
                    <li key={idx} className="mb-1 text-grey-90 m-3">
                      {line.replace(/^•\s*/, "")}
                    </li>
                  ))}
              </ul>
            </Card>
          </>
        )}

      </Card.Body>
    </Card>
  );
}

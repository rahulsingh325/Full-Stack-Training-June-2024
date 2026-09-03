import { Button, Modal } from "react-bootstrap";
import api from "@/helper/api";
import { toast } from "react-toastify";

export default function ActivateEventModal({
  show,
  onHide,
  eventId,
  onActivated,
}) {
  const handleActivate = async () => {
    try {
      const res = await api.post(`/events/${eventId}/activate`);

      // console.log("ACTIVATE RESPONSE:", res.data);

      toast.success("Event activated successfully");

      onHide();        //  modal close
      onActivated();   //  list refresh (parent se)

    } catch (err) {
      toast.error(err.response?.data?.message || "Activation failed");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Activate Event</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Are you sure you want to activate this event?
        <br />
        <small className="text-muted">
          Once activated, it will be visible to users.
        </small>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleActivate}>
          Yes, Activate
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

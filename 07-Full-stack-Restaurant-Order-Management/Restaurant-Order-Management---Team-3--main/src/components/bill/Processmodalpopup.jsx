import React, { useState, useEffect } from "react";
import { Modal, Button, ProgressBar } from "react-bootstrap";

const ProcessModalPopup = ({ show, handleClose, onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!show) return;
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          if (onComplete) onComplete();
          return 100;
        }
        return prev + 5;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [show, onComplete]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className="text-center p-8">
        <div className="d-flex align-items-center gap-2 mb-3 ps-2">
          <span className="text-brand-500  bg-brand-50 rounded-pill d-inline-block">
            <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.6001 10.5239C4.39953 10.5491 4.1995 10.5759 4 10.6044M4.6001 10.5239C6.04131 10.3431 7.50978 10.25 9 10.25C10.4902 10.25 11.9587 10.3431 13.3999 10.5239M4.6001 10.5239L4.28409 14M13.3999 10.5239C13.6005 10.5491 13.8005 10.5759 14 10.6044M13.3999 10.5239L13.7159 14M13.7159 14L13.9071 16.1026C13.957 16.6516 13.5247 17.125 12.9734 17.125H5.02659C4.47531 17.125 4.04303 16.6516 4.09294 16.1026L4.28409 14M13.7159 14H14.625C15.6605 14 16.5 13.1605 16.5 12.125V6.87974C16.5 5.97896 15.8601 5.20068 14.9692 5.06738C14.4411 4.98837 13.9096 4.91967 13.375 4.86151M4.28409 14H3.375C2.33947 14 1.5 13.1605 1.5 12.125V6.87974C1.5 5.97896 2.13992 5.20068 3.03078 5.06738C3.55889 4.98837 4.09036 4.91967 4.625 4.86151M13.375 4.86151C11.9381 4.70521 10.4784 4.625 9 4.625C7.52156 4.625 6.06186 4.70521 4.625 4.86151M13.375 4.86151V1.8125C13.375 1.29473 12.9553 0.875 12.4375 0.875H5.5625C5.04473 0.875 4.625 1.29473 4.625 1.8125V4.86151M14 7.75H14.0063V7.75625H14V7.75ZM11.5 7.75H11.5063V7.75625H11.5V7.75Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

          </span>
          <h3 className="mb-0 fw-semibold text-neutral-800 ps-3">Process print bills</h3>
        </div>

        <p className="text-neutral-400 text-start py-4 fw-medium">
          Bills are currently being processed for printing. Please wait for completion. Thank you for your patience.
        </p>

        <ProgressBar now={progress} className="my-3" />

        <div className="d-flex justify-content-center gap-2 mt-3">
          <Button className="w-100" variant="outline-neutral-700" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProcessModalPopup;

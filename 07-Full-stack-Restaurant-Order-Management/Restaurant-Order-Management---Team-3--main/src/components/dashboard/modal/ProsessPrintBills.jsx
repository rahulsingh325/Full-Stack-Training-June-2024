import React, { useState, useEffect } from "react";
import { Modal, Button, ProgressBar } from "react-bootstrap";
import printIcon from "../../../assets/image/icon/Vector.svg";

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
                    <div>
                        <div className="  d-flex align-items-center outline-3 outline-brand-50 rounded-circle justify-content-center w-40 square bg-brand-50 ">
                            <img src={printIcon} alt="success" className="w-24 square" />
                        </div>
                    </div>
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

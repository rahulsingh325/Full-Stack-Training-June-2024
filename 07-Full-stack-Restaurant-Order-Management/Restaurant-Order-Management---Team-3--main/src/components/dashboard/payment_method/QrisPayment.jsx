import React, { useEffect, useRef, useState } from "react";
import qr from "../../../assets/image/icon/qr.svg";
import scanner from "../../../assets/image/women/scanner.png";
import PaymentFailedModal from "../modal/PaymentFailedModal";

const QrisPayment = () => {
    const initialTime = 20; // seconds
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const [showFailed, setShowFailed] = useState(false);
    const requestRef = useRef(null);
    const startTimeRef = useRef(null);

    useEffect(() => {
        const update = (timestamp) => {
            if (!startTimeRef.current) startTimeRef.current = timestamp;
            const elapsed = (timestamp - startTimeRef.current) / 1000; 
            const remaining = Math.max(initialTime - elapsed, 0);

            setTimeLeft(remaining);

            if (remaining > 0) {
                requestRef.current = requestAnimationFrame(update);
            } else {
                setShowFailed(true);
            }
        };

        requestRef.current = requestAnimationFrame(update);

        return () => cancelAnimationFrame(requestRef.current);
    }, []);

    const progressPercentage = ((initialTime - timeLeft) / initialTime) * 100;

    return (
        <>
            <div className="mb-2 fw-semibold">Input Amount</div>
            <div className="text-center">
                <img src={qr} alt="QR" />
                <div className="d-flex flex-column align-items-center mt-lg-4">
                    <div
                        className="border rounded-3 d-flex align-items-center justify-content-center"
                        style={{ width: 220, height: 220 }}
                    >
                        <img src={scanner} alt="" />
                    </div>
                    <div className="text-muted small mt-3">
                        Waiting for transaction confirmation
                    </div>

                    {/* Smooth Progress Circle */}
                    <div className="mt-3 position-relative d-inline-flex align-items-center justify-content-center">
                        <div
                            className="rounded-circle d-flex align-items-center justify-content-center"
                            style={{
                                width: "80px",
                                height: "80px",
                                background: `conic-gradient(#007bff ${progressPercentage}%, #e9ecef ${progressPercentage}%)`,
                                transition: "background 0.05s linear" 
                            }}
                        >
                            <div
                                className="bg-white rounded-circle d-flex align-items-center justify-content-center"
                                style={{ width: "60px", height: "60px" }}
                            >
                                <span className="fw-bold text-primary fs-5">
                                    {Math.ceil(timeLeft)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="text-muted small mt-2">
                        E-Wallet transactions cannot be refunded
                    </div>
                </div>
            </div>

            {/* Failed Modal */}
            {showFailed && (
                <PaymentFailedModal
                    show={showFailed}
                    onHide={() => setShowFailed(false)}
                />
            )}
        </>
    );
};

export default QrisPayment;

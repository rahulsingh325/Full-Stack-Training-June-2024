import React, { useState } from "react";
import { Offcanvas, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PaymentTabs from "./payment_method/PaymentTabs";
import PaymentSuccessModal from "./modal/PaymentSuccessModal";
import PrintBillModal from "../dashboard/modal/printingBills";
import ProcessModalPopup from "../dashboard/modal/ProsessPrintBills";
import PrintSucesspopup from "../dashboard/modal/successfulPrint";

const PaymentOffcanvas = ({ show, onHide, subtotal, tax, total, onNewOrder }) => {
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Print flow states
    const [showPrintConfirm, setShowPrintConfirm] = useState(false);
    const [showPrintProcess, setShowPrintProcess] = useState(false);
    const [showPrintSuccess, setShowPrintSuccess] = useState(false);

    const navigate = useNavigate();


    const handlePayment = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setShowSuccess(true);
            onHide();
        }, 5000);
    };

    // Close Success Modal and reset
    const onSuccessHide = () => {
        setShowSuccess(false);
        onHide();
    };

    // Print Flow Functions
    const handlePrintFlow = () => {
        setShowSuccess(false);       // Close Payment Success modal before opening print confirm
        setShowPrintConfirm(true);   // Show confirmation modal
    };

    const handleConfirmPrint = () => {
        setShowPrintConfirm(false);
        setShowPrintProcess(true);
    };

    const handleProcessComplete = () => {
        setShowPrintProcess(false);
        setShowPrintSuccess(true);
    };

    // Redirect to dashboard on New Order AND clear cart via parent
    const handleNewOrder = () => {
        setShowPrintSuccess(false);
        onNewOrder?.();              // tell Dashboard to clear orders
        navigate("/");      // optional navigation
    };

    return (
        <>
            <Offcanvas show={show} onHide={onHide} placement="end" backdrop scroll>
                <Offcanvas.Header closeButton className="py-3">
                    <div className="d-flex flex-column mb-4">
                        <span className="fw-semibold fs-title mb-2 " >
                            Order Payment
                        </span>
                        <span className="text-muted fs-title text-neutral-400">
                            Order #12345
                        </span>
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body className="px-3 border-top  " style={{ overflowY: "auto" }}>
                    {/* Order Summary */}
                    <div className=" bg-brand-50 rounded-3 p-5 mt-6 mb-8">
                        <div className="d-flex justify-content-between mb-3">
                            <span className="text-muted">Subtotal</span>
                            <span className="fw-semibold">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                            <span className="text-muted">Tax (10%)</span>
                            <span className="fw-semibold">${tax.toFixed(2)}</span>
                        </div>
                        <div className="d-flex justify-content-between ">
                            <strong>Total</strong>
                            <strong className="text-primary fs-h5">${total.toFixed(2)}</strong>
                        </div>
                    </div>

                    {/* Payment Method Tabs */}
                    <PaymentTabs total={total} />

                    {/* Payment Button */}
                    <Button
                        variant="primary"
                        className="w-100 fw-bold py-3 rounded-pill mt-4"
                        onClick={handlePayment}
                        disabled={loading}
                        aria-label="Close"
                    >
                        {loading ? "Processing..." : "Payment"}
                    </Button>
                </Offcanvas.Body>
            </Offcanvas>

            {/* Payment Success Modal */}
            <PaymentSuccessModal
                show={showSuccess}
                onHide={onSuccessHide}
                orderId="12345"
                total={total}
                onPrint={handlePrintFlow}
                onNewOrder={() => {
                    setShowSuccess(false);   // close modal
                    onNewOrder?.();          // clear cart in Dashboard
                    navigate("/");  // optional navigate
                }}
            />

            {/* Print Confirmation Modal */}
            <PrintBillModal
                show={showPrintConfirm}
                onClose={() => setShowPrintConfirm(false)}
                onConfirm={handleConfirmPrint}
            />

            {/* Process Printing Modal */}
            <ProcessModalPopup
                show={showPrintProcess}
                handleClose={() => setShowPrintProcess(false)}
                onComplete={handleProcessComplete}
            />

            {/* Print Success Modal */}
            <PrintSucesspopup
                show={showPrintSuccess}
                handleClose={handleNewOrder}
            />
        </>
    );
};

export default PaymentOffcanvas;

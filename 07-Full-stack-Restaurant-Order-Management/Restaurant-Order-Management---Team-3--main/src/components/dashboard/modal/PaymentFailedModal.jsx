import React from "react";
import { Modal, Button } from "react-bootstrap";
import failedIcon from "../../../assets/image/icon/faild.svg";


const PaymentFailedModal = ({ show, onHide, orderId = `   1234`, total = 520, paymentMethod = 'upi' }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Body className="text-center p-8">
                <div className="d-flex align-items-center gap-6  mb-6 mx-auto ">
                    <div>
                        <div className="  rounded-circle p-5  w-80 square bg-error-100 outline-12 outline-error-50 d-inline-flex align-items-center justify-content-center">
                            <img src={failedIcon} alt="success" className="img-fluid " />
                        </div>
                    </div>
                    <div className="text-start">
                        <h5 className="mb-2 fs-h3 fw-semibold text-neutral-800">Payment failed!</h5>
                        <h3 className="fw-bold fs-h4 text-error-400 ">${total?.toFixed(2)}</h3>
                    </div>
                </div>
                <p className=" text-start text-neutral-400 fs-title  mb-5">
                    Please check your payment information and try again.
                </p>

                <div className="d-flex justify-content-between border-top pt-5 mb-5 ">
                    <span className="text-neutral-400 fs-title">Order Id</span>
                    <span className="text-neutral-700 fs-title">#{orderId}</span>
                </div>
                <div className="d-flex justify-content-between mb-5">
                    <span className="text-neutral-400 fs-title">Payment Method</span>
                    <span className="text-neutral-700 fs-title">{paymentMethod}</span>
                </div>
                <div className="d-flex justify-content-between mb-6">
                    <span className="text-neutral-400 fs-title">Payment Time</span>
                    <span className="text-neutral-700 fs-title">{new Date().toLocaleString()}</span>
                </div>

                <Button variant="primary" className="w-100 mt-4 fs-title py-3 rounded-pill" onClick={onHide}>
                    Back to Transaction
                </Button>
            </Modal.Body>
        </Modal>
    );
};

export default PaymentFailedModal;

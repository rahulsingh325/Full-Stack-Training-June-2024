import React from "react";
import { Modal, Button } from "react-bootstrap";
import successIcon from "../../../assets/image/icon/sucessfull.svg";


const PaymentSuccessModal = ({ show, onHide, orderId = `1234`, total = 520, paymentMethod = 'upi', onPrint }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Body className="text-center p-8">
                {/* Header Section */}
                <div className="d-flex align-items-center gap-6  mb-6 mx-auto ">
                    <div>
                        <div className="  rounded-circle p-5  w-80 square bg-brand-50 outline-3 outline-brand-50 d-inline-flex align-items-center justify-content-center">
                            <img src={successIcon} alt="success" className="img-fluid " />
                        </div>
                    </div>
                    <div className="text-start">
                        <h5 className="mb-2 fs-h3 fw-semibold text-neutral-800">Payment successful!</h5>
                        <h3 className="fw-bold fs-h4 text-brand-300 ">${total?.toFixed(2)}</h3>
                    </div>
                </div>

                {/* Message */}
                <p className="text-start text-neutral-400 fs-title  mb-5">
                    Your transaction has been successfully processed. Thank you for your purchase!
                </p>

                {/* Details Section */}
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

                {/* Action Buttons */}
                <Button className="w-100  fw-title py-3 rounded-pill" onClick={onHide}>
                    New Order
                </Button>
                <Button variant="white" className="w-100 mt-2  py-3 border  text-dark rounded-pill  d-flex align-items-center justify-content-center" onClick={onPrint}>
                    <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.6001 10.5239C4.39953 10.5491 4.1995 10.5759 4 10.6044M4.6001 10.5239C6.04131 10.3431 7.50978 10.25 9 10.25C10.4902 10.25 11.9587 10.3431 13.3999 10.5239M4.6001 10.5239L4.28409 14M13.3999 10.5239C13.6005 10.5491 13.8005 10.5759 14 10.6044M13.3999 10.5239L13.7159 14M13.7159 14L13.9071 16.1026C13.957 16.6516 13.5247 17.125 12.9734 17.125H5.02659C4.47531 17.125 4.04303 16.6516 4.09294 16.1026L4.28409 14M13.7159 14H14.625C15.6605 14 16.5 13.1605 16.5 12.125V6.87974C16.5 5.97896 15.8601 5.20068 14.9692 5.06738C14.4411 4.98837 13.9096 4.91967 13.375 4.86151M4.28409 14H3.375C2.33947 14 1.5 13.1605 1.5 12.125V6.87974C1.5 5.97896 2.13992 5.20068 3.03078 5.06738C3.55889 4.98837 4.09036 4.91967 4.625 4.86151M13.375 4.86151C11.9381 4.70521 10.4784 4.625 9 4.625C7.52156 4.625 6.06186 4.70521 4.625 4.86151M13.375 4.86151V1.8125C13.375 1.29473 12.9553 0.875 12.4375 0.875H5.5625C5.04473 0.875 4.625 1.29473 4.625 1.8125V4.86151M14 7.75H14.0063V7.75625H14V7.75ZM11.5 7.75H11.5063V7.75625H11.5V7.75Z" stroke="currentColor" strokewidth="1.5" strokelinecap="round" strokelinejoin="round" />
                    </svg>
                    <div className="ms-2">
                        Print Bill
                    </div>

                </Button>
            </Modal.Body>
        </Modal>
    );
};

export default PaymentSuccessModal;

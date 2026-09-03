import React from "react";
import { Modal, Button } from "react-bootstrap";
import printIcon from "../../../assets/image/icon/Vector.svg";
import "../../../assets/scss/modules/_dashboard.scss";


const PrintBillModal = ({ show, onClose, onConfirm }) => {
    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Body className="text-center p-8 ">
                <div className="d-flex align-items-center gap-4 ps-2 pe-4">
                    <div >
                        <div className="  d-flex align-items-center outline-3 outline-brand-50 rounded-circle justify-content-center w-40 square bg-brand-50 ">
                            <img src={printIcon} alt="success" className="w-24 square"/>
                        </div>
                    </div>
                    <h3 className="mb-0 fw-semibold text-neutral-700">Print bills?</h3>
                </div>
                <p className="text-neutral-400 text-start pt-6 fw-medium">
                    Would you like to print bills now? Please confirm to proceed with the
                    printing process.
                </p>

                <div className="d-flex flex-column gap-2 ">
                    <Button
                        variant="primary"
                        onClick={onConfirm}
                        className="w-100 mx-auto rounded-pill"
                    >
                        Confirm
                    </Button>
                    <Button
                        variant="outline-neutral-200"
                        onClick={onClose}
                        className="w-100 mx-auto text-neutral-700 rounded-pill"
                    >
                        Cancel
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default PrintBillModal;

import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import successIcon from "../../../assets/image/icon/sucessfull.svg";

const PrintSucesspopup = ({ show, handleClose }) => {
    const navigate = useNavigate();


    const handleNewOrder = () => {
        handleClose();
        navigate("/");
    };

    return (
        <Modal show={show} onHide={handleClose} centered dialogClassName="custom-modal">
            <Modal.Body className="text-center p-8">
                <div className="d-flex align-items-center gap-4 ps-2 pe-4 mb-5">
                    <div>
                        <div className=" me-6 d-flex align-items-center outline-3 outline-brand-50 rounded-circle justify-content-center w-80 square bg-brand-50 ">
                            <img src={successIcon} alt="success" className="w-40 square"/>
                        </div>

                    </div>
                    <h3 className=" fw-semibold text-neutral-700">Printing successful!</h3>
                </div>


                <p className="text-neutral-400 text-start mb-6  fw-medium">
                    Your document has been successfully printed. Thank you for using our service.
                </p>

                <div className="d-flex justify-content-center mt-2 mb-2">
                    <Button
                        variant="primary"
                        onClick={handleNewOrder}
                        className="w-100 rounded-pill"
                    >
                        New Order
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default PrintSucesspopup;

import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import HandThumbsUp from "../../assets/image/icon/hello.svg";
import "../../assets/scss/modules/_onboarding.scss";

const CongratsStep = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/"); // Redirect to root
    };

    return (
        <div className="d-flex justify-content-center align-items-center h-100 w-100">
            <div className="congrats-step text-center">
                <div className=" mx-auto rounded-circle bg-brand-50  mb-8 h-120 square outline-3 outline-neutral-50 d-flex align-items-center justify-content-center ">
                    <img src={HandThumbsUp} alt="success" className="img-fluid" />
                </div>
                <h3 className="fw-bold mb-4">Congratulations!</h3>
                <p className="text-muted mb-2">
                    Your password has been successfully updated. <br />
                    Thank you for choosing our service.
                </p>
                <Button
                    variant="primary"
                    className="mt-8 w-100 py-2 rounded-pill"
                    onClick={handleLogin}
                >
                    Login
                </Button>
            </div>
        </div>
    );
};

export default CongratsStep;

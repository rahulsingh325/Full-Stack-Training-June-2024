import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import OTPInput from "react-otp-input";
import "../../assets/scss/modules/_onboarding.scss";
import { verifyOtp } from "../../services/auth";
import toast from "react-hot-toast";

const OtpVerification = ({ onNext, email }) => {
    const [otpValue, setOtpValue] = useState("");

    const handleOtpChange = (otp) => {
        setOtpValue(otp);
    };

    const handleSend = async () => {
        const result = await verifyOtp({email , otp : otpValue})
        if (result.success) {
            toast.success(result.data)
            onNext();
        } else {
            toast.error(result.message)
        }
    };

    return (
        <div className="d-flex flex-column w-100">
            <h2 className="fw-bold mb-3">Enter otp Verification</h2>
            <p className="text-muted mb-4">
                Kindly input the OTP code sent to your registered email/phone <br />
                for account verification.
            </p>
            <Form className="text-center">
                <OTPInput
                    value={otpValue}
                    onChange={handleOtpChange}
                    numInputs={7}
                    inputType="text"
                    className="otp-inputs"
                    containerStyle={{ gap: "24px" }}
                    renderInput={(props) => (
                        <input
                            {...props}
                            className="otp-input  form-control text-center bg-neutral-50 border rounded border-neutral-300 fs-h4 text-neutral-700"
                            style={{
                                maxWidth: "5rem",
                                height: "5rem",
                            }}
                        />
                    )}
                />
                <Button
                    type="button"
                    onClick={handleSend}
                    className="rounded-pill w-100 mt-4"
                    disabled={otpValue.length !== 7}
                >
                    Send
                </Button>
                <div className="mt-3">
                    <small>
                        Not my phone number?{" "}
                        <a href="#" className="text-decoration-none">Change</a>
                    </small>
                </div>
            </Form>
        </div>
    );
};

export default OtpVerification;

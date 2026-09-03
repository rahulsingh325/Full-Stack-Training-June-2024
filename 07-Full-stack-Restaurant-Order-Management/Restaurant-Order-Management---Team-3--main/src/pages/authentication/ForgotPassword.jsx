import React, { useState } from "react";
import { Container, Row, Col, Button, ProgressBar } from "react-bootstrap";
import logo from "../../assets/image/icon/logo.svg";
import icForgot from "../../assets/image/icon/key.svg";
import icVerify from "../../assets/image/icon/email.svg";
import icNewPass from "../../assets/image/icon/creatpassword.svg";
import icWelcome from "../../assets/image/icon/welcomeapp.svg";
import ArrowIcon from "../../assets/image/icon/arrowright.svg";
import ForgotPasswordStep from "../../components/onboarding/ForgotPasswordStep";
import OtpVerification from "../../components/onboarding/OtpVerification";
import CreateNewPassword from "../../components/onboarding/NewPassword";
import CongratsStep from "../../components/onboarding/CongratsStep";
import "../../assets/scss/modules/_onboarding.scss";
import { Toaster } from "react-hot-toast";

const ForgotPasswordFlow = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [email , setEmail] = useState(null);

  const steps = [
    {
      id: 1,
      title: "Forget Password",
      desc: "Provide an email to change your password",
      icon: icForgot,
    },
    {
      id: 2,
      title: "Verify your email",
      desc: "Enter your otp verification",
      icon: icVerify,
    },
    {
      id: 3,
      title: "Create a new password",
      desc: "Create your new password",
      icon: icNewPass,
    },
    {
      id: 4,
      title: "Welcome to Kopang app",
      desc: "Get up and running in 3 minutes",
      icon: icWelcome,
    },
  ];

  const handleNext = () => {
    if (activeStep < steps.length) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 1) {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };

  const renderStep = () => {
    switch (activeStep) {
      case 1:
        return <ForgotPasswordStep setEmail={setEmail} onNext={handleNext} />;
      case 2:
        return <OtpVerification email={email} onNext={handleNext} />;
      case 3:
        return <CreateNewPassword email={email} onNext={handleNext} />;
      case 4:
        return <CongratsStep />;
      default:
        return null;
    }
  };

  return (
    <Container fluid className="forgot-password-container ">
      <Row className="min-vh-100">
        <Col
          md={5}
          className="steps-sidebar text-center text-lg-start bg-neutral-50 border-end border-neutral-200 p-2 d-none d-md-flex flex-column p-md-8 "
        >
          <h5 className="fw-semibold mb-2 pt-4 pt-md-8">Step for change your password</h5>
          <p className="text-muted fs-body">
            Instructions for secure password modification. Follow simple steps <br />
            for password change.
          </p>

          <div className="pt-4 pt-md-8 text-start flex-grow-1">
            <ul className="steps-list list-unstyled  position-relative pl-8  m-0 ">
              {steps.map((step) => (
                <li
                  key={step.id}
                  className={`step-item  position-relative  d-flex align-items-center gap-4 py-4 z-2   ${activeStep === step.id ? "active" : ""} ${activeStep > step.id ? "completed" : ""}`}
                >
                  <div className="step-circle d-flex align-items-center justify-content-center flex-shrink-0 p-5 rounded-circle bg-neutral " aria-hidden>
                    <img src={step.icon} alt={`${step.title} icon`} />
                  </div>
                  <div className="step-content">
                    <h6 className="step-title fs-title fw-semibold text-neutral-700 ">{step.title}</h6>
                    <p className="step-desc fs-body text-neutral-400">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto d-flex justify-content-between">
            <Button
              className="nav-button text-decoration-none text-dark"
              variant="link"
              onClick={handleBack}
              disabled={activeStep === 1}
            >
              <img src={ArrowIcon} alt="Back" className="me-2 rotate-180" /> Back
            </Button>
            <Button
              className="nav-button text-decoration-none text-dark"
              variant="link"
              onClick={handleNext}
              disabled={activeStep === steps.length}
            >
              Next <img src={ArrowIcon} alt="Next" className="ms-2" />
            </Button>
          </div>
        </Col>

        <Col md={7} className="right-content d-flex flex-column p-md-8 p-4">
          <div className="logo-container mb-4">
            <img src={logo} alt="logo" height={40} />
          </div>

          <div className="flex-grow-1 d-flex align-items-start justify-content-start">
            {renderStep()}
          </div>

          <div className="progress-bar-container w-100 w-md-75 mx-auto pt-4 pb-4 d-flex gap-2">
            {steps.map((step) => (
              <ProgressBar
                key={step.id}
                className="flex-grow-1"
                now={activeStep === step.id ? 100 : 0}
                style={{ height: "8px" }}
              />
            ))}
          </div>
        </Col>
      </Row>
      < Toaster/>
    </Container>
  );
};

export default ForgotPasswordFlow;

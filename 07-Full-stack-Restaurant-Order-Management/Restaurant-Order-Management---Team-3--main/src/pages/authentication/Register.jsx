// pages/auth/Register.jsx
import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Spinner, InputGroup, Alert } from "react-bootstrap";
import registerImage from "../../assets/image/women/women3.jpg";
import logo from "../../assets/image/icon/logo.svg";
import google from "../../assets/image/icon/google.svg";
import facebook from "../../assets/image/icon/facebook.svg";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { register as registerService } from "../../services/auth";
import toast, { Toaster } from "react-hot-toast";

const schema = yup.object().shape({
  name: yup.string().required("Name is required").min(2, "Name must be at least 2 characters"),
  email: yup.string().email("Please enter a valid email address").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [hiddenConfirm, setHiddenConfirm] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { confirmPassword, ...payload } = data;
      const result = await registerService(payload);
      if (result.success) {
        toast.success("Registered successfully")
        reset({ name: "", email: "", password: "", confirmPassword: "" });
        navigate("/login")
        setLoading(false)
      } else {
        toast.error(result.message)
        setLoading(false)
      }
    } catch {
      toast.error("Something went wrong")
      setLoading(false)
    }
  };

  return (
    <Container fluid className="p-5">
      <Row className="align-items-stretch g-0">
        <Col lg={6} className="d-none d-lg-block p-0" style={{ minHeight: "100vh" }}>
          <img
            src={registerImage}
            alt="register"
            className="img-fluid rounded h-100 w-100"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </Col>

        <Col xs={12} md={8} lg={6} className="mx-auto p-8 d-flex flex-column justify-content-center" style={{ minHeight: "100vh" }}>
          <div className="p-5 w-100 d-flex flex-column">
            <div>
              <img src={logo} alt="logo" className="mb-8 img-fluid" />
            </div>

            <h2 className="fs-h1 fw-bold mb-2">Register</h2>
            <p className="text-muted mb-5">Create an account to start using the platform securely and easily.</p>


            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" {...register("name")} isInvalid={!!errors.name} placeholder="Enter your full name" />
                <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" {...register("email")} isInvalid={!!errors.email} placeholder="you@example.com" />
                <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={hiddenPassword ? "password" : "text"}
                    {...register("password")}
                    isInvalid={!!errors.password}
                    placeholder="Enter your password"
                    className="border-end-0"
                  />
                  <InputGroup.Text
                    className="bg-white border-start-0"
                    onClick={() => setHiddenPassword((v) => !v)}
                    style={{ cursor: "pointer" }}
                    aria-label={hiddenPassword ? "Show password" : "Hide password"}
                  >
                    {hiddenPassword ? <BsEyeSlash /> : <BsEye />}
                  </InputGroup.Text>
                </InputGroup>
                <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Confirm Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={hiddenConfirm ? "password" : "text"}
                    {...register("confirmPassword")}
                    isInvalid={!!errors.confirmPassword}
                    placeholder="Confirm your password"
                    className="border-end-0"
                  />
                  <InputGroup.Text
                    className="bg-white border-start-0"
                    onClick={() => setHiddenConfirm((v) => !v)}
                    style={{ cursor: "pointer" }}
                    aria-label={hiddenConfirm ? "Show confirm password" : "Hide confirm password"}
                  >
                    {hiddenConfirm ? <BsEyeSlash /> : <BsEye />}
                  </InputGroup.Text>
                </InputGroup>
                <Form.Control.Feedback type="invalid">{errors.confirmPassword?.message}</Form.Control.Feedback>
                <div className="text-muted d-block mt-3">
                  • At least 8 characters<br />• Includes numbers and letters
                </div>
              </Form.Group>

              <Button type="submit" variant="primary" className="rounded-pill w-100 mb-4" disabled={loading}>
                {loading ? (<><Spinner animation="border" size="sm" className="me-2" />Creating account...</>) : ("Continue")}
              </Button>

              <div className="d-flex align-items-center mb-4">
                <hr className="flex-grow-1" />
                <span className="px-5 fw-medium">Or</span>
                <hr className="flex-grow-1" />
              </div>

              <div className="d-grid gap-2 mb-4">
                <Button variant="light" className="d-flex align-items-center border rounded-pill justify-content-center mb-2">
                  <span className="me-2"><img src={google} alt="Google" /></span>
                  Log in with Google
                </Button>
                <Button variant="light" className="d-flex align-items-center border rounded-pill justify-content-center">
                  <span className="me-2"><img src={facebook} alt="Facebook" /></span>
                  Log in with Facebook
                </Button>
              </div>

              <div className="text-center">
                <span className="text-muted">Already have an account? </span>
                <Link to="/login" className="text-decoration-none">Login</Link>
              </div>
            </Form>

            <div className="text-center mt-4">
              <div className="text-muted">
                By sign up, agree to the <a href="#" className="text-decoration-none">Terms of Service</a> and <a href="#" className="text-decoration-none">Privacy Policy</a>.
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Toaster/>
    </Container>
  );
};

export default Register;

// pages/auth/Login.jsx
import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Spinner, InputGroup, Alert } from "react-bootstrap";
import loginImage from "../../assets/image/women/women1.jpg";
import logo from "../../assets/image/icon/logo.svg";
import google from "../../assets/image/icon/google.svg";
import facebook from "../../assets/image/icon/facebook.svg";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../services/auth";
import { loginSuccess } from "../../store/authSlice";
import toast, { Toaster } from "react-hot-toast";

const schema = yup.object().shape({
  email: yup.string().email("Please enter a valid email address").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(14, "Password cannot be more than 14 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [hidden, setHidden] = useState(true);
  const {isAuthenticated} = useSelector(state => state.auth)

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      console.log(data)
      const result = await login(data);
      if (result.success) {
        dispatch(loginSuccess(result.data));
        toast.success("login success")
        setLoading(false)
        navigate("/");
      } else {
        toast.error(JSON.stringify(result.message))
        setLoading(false)
      }
    } catch {
      toast.error("something went wrong")
      setLoading(false)
    }
  };

  if(isAuthenticated){
    return <Navigate to={"/"}/>
  }
  return (
    <Container fluid className="p-5">
      <Row className="align-items-stretch">
        <Col className="col-lg-6 col-12 d-none d-lg-block">
          <div className="h-100 overflow-hidden">
            <img
              src={loginImage}
              alt="login"
              className="rounded h-100 w-100"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
        </Col>

        <Col xs={12} md={8} lg={6} xl={6} className="mx-auto p-8 h-100">
          <div className="p-5 h-100 d-flex flex-column">
            <div>
              <img src={logo} alt="logo" className="mb-8 img-fluid" />
            </div>

            <h2 className="fs-h1 fw-bold mb-2">Welcome Back!</h2>
            <p className="text-muted fs-title mb-4">
              Enter your email and password to access your account securely.
            </p>


            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  {...register("email")}
                  isInvalid={!!errors.email}
                  placeholder="you@example.com"
                />
                <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Link to="/forgot-password" className="float-end text-decoration-none">
                  Forgot Password?
                </Link>
                <InputGroup>
                  <Form.Control
                    type={hidden ? "password" : "text"}
                    {...register("password")}
                    isInvalid={!!errors.password}
                    placeholder="Enter your password"
                    className="border-end-0"
                  />
                  <InputGroup.Text
                    className="bg-white border-start-0"
                    onClick={() => setHidden((v) => !v)}
                    style={{ cursor: "pointer" }}
                    aria-label={hidden ? "Show password" : "Hide password"}
                  >
                    {hidden ? <BsEyeSlash /> : <BsEye />}
                  </InputGroup.Text>
                </InputGroup>
                <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
              </Form.Group>

              <Button
                type="submit"
                variant="primary"
                className="rounded-pill w-100 mb-4 fs-title fw-semibold"
                disabled={loading}
              >
                {loading ? (<><Spinner animation="border" size="sm" className="me-2" />Logging in...</>) : ("Log in")}
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
                <span className="text-muted">Don't have an account? </span>
                <Link to="/register" className="text-decoration-none">Register</Link>
              </div>
            </Form>

            <div className="text-center mt-4">
              <div className="text-muted">
                By log in, agree to the <a href="#" className="text-decoration-none">Terms of Service</a> and{" "}
                <a href="#" className="text-decoration-none">Privacy Policy</a>.
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Toaster />
    </Container>
  );
};

export default Login;

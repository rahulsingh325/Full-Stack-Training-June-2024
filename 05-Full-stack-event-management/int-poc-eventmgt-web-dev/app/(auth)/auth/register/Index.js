"use client";

import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { toast } from "react-toastify";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";

// direct axios instance
import api from "@/helper/api";

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  /* ================= VALIDATION ================= */
  const schema = yup.object({
    name: yup.string().required("Full name is required"),
    email: yup
      .string()
      .required("Email address is required")
      .email("Enter a valid email"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm your password"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  /* ================= SUBMIT (DIRECT API) ================= */
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await api.post("/authentication/signup", {
        email: data.email,
        password: data.password,
      });

      toast.success("Signup successful! Please login.");
      router.push("/auth/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="signin-page mx-0">
      <Row className="min-vh-100 w-100 align-items-center">

        {/* RIGHT IMAGE */}
        <Col lg={6} className="d-none d-lg-flex">
          <div className="signin-bg w-100 min-vh-100 rounded-4 position-relative text-light">
            <div className="position-absolute bottom-0 start-0 p-5">
              <div className="fw-bold display-6">
                <span className="text-primary-100">Event</span>ify
              </div>

              <div className="small text-grey-10 mt-2">
                Create your Eventify account and start managing events, bookings, and payments effortlessly.
              </div>

            </div>
          </div>
        </Col>


        <Col lg={6} className="mx-auto px-10">
          <div className="login-form-wrapper mx-auto">

            <div className="auth-header text-center mb-4">
              <h4 className="fw-bold mb-1">Create Your Account</h4>

              <p className="text-muted text-center">
                Get started with Eventify and manage your events effortlessly
              </p>
            </div>


            <Form onSubmit={handleSubmit(onSubmit)}>

              {/* NAME (UI only) */}
              <Form.Group className="mb-4">
                <Form.Label>Name</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    placeholder="Enter your full name"
                    {...register("name")}
                  />
                  <User className="input-icon" />
                </div>
                <small className="text-danger">
                  {errors.name?.message}
                </small>
              </Form.Group>

              {/* EMAIL */}
              <Form.Group className="mb-4">
                <Form.Label>Email</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    {...register("email")}
                  />
                  <Mail className="input-icon" />
                </div>
                <small className="text-danger">
                  {errors.email?.message}
                </small>
              </Form.Group>

              {/* PASSWORD */}
              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...register("password")}
                  />
                  <Lock className="input-icon" />
                  <span
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Eye /> : <EyeOff />}
                  </span>
                </div>
                <small className="text-danger">
                  {errors.password?.message}
                </small>
              </Form.Group>

              {/* CONFIRM PASSWORD */}
              <Form.Group className="mb-4">
                <Form.Label>Confirm Password</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    {...register("confirmPassword")}
                  />
                  <Lock className="input-icon" />
                </div>
                <small className="text-danger">
                  {errors.confirmPassword?.message}
                </small>
              </Form.Group>

              <Button
                type="submit" variant=""
                className="w-100 mt-3 bg-primary-100 text-grey-10"
                disabled={loading}
              >
                {loading ? "Loading..." : "Sign Up"}
              </Button>

              <div className="text-center mt-4">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-decoration-none">Sign in here</Link>
              </div>

            </Form>
          </div>
        </Col>

      </Row>
    </Container>
  );
};

export default Register;

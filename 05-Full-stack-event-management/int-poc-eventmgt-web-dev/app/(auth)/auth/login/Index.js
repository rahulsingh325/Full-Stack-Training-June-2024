"use client";

import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { toast } from "react-toastify";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";
import { setUserEmail } from "@/store/authSlice";

// axios
import api from "@/helper/api";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  /* ================= VALIDATION ================= */
  const schema = yup.object({
    email: yup
      .string()
      .required("Email address is required")
      .email("Enter a valid email"),
    password: yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  /* ================= SUBMIT ================= */
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await api.post("/authentication/login", {
        email: data.email,
        password: data.password,
      });

      const token = res.data.access_token;

      if (!token) {
        throw new Error("Token not received");
      }

      // TOKEN (auth ke liye)
      localStorage.setItem("token", token);

      // EMAIL (sirf UI ke liye)
      localStorage.setItem("user_email", data.email);
      dispatch(setUserEmail(data.email));

      toast.success("Login successful!");
      router.push("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="signin-page">
      <Row className="min-vh-100 align-items-center w-100">


        <Col lg={6} className="d-none d-lg-flex ">
          <div className="signin-bg w-100 min-vh-100 rounded-4 position-relative text-light">
            <div className="position-absolute bottom-0 start-0 p-5">
              {/* <div className="signin-overlay-top"> */}
              <div className="fw-bold display-6">
                <span className="text-primary-100">Event</span>ify
              </div>

              <div className="small text-grey-10 mt-2">
                Manage events, bookings, payments, and insights — all from one powerful dashboard.
              </div>

            </div>
          </div>
        </Col>

        <Col lg={6} className="my-10 mx-auto">
          <div className="login-form-wrapper mx-auto">
            <div className="auth-header mb-4">
              {/* <div className="auth-icon mb-2"></div> */}

              <h4 className="fw-bold text-center mb-1">Welcome Back</h4>

              <p className="text-muted text-center mb-6 px-6">
                Log in to continue managing your events with Eventify
              </p>
            </div>

            <Form onSubmit={handleSubmit(onSubmit)}>
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

              {/* <div className="text-end mb-3">
              <Link
                href="/forgot-password"
                className="text-secondary-100 text-decoration-none fw-semibold"
              >
                Forgot password?
              </Link>
            </div> */}

              <Button type="submit" variant="" className="w-100 text-grey-10 bg-primary-100 mt-2" disabled={loading}>
                {loading ? "Loading..." : "Login"}
              </Button>

              <div className="text-center mt-4">
                Don’t have an account?{" "}
                <Link href="/auth/register" className="text-decoration-none">
                  Sign up here
                </Link>
              </div>
            </Form>
          </div>
        </Col>

      </Row>
    </Container>
  );
};

export default Login;

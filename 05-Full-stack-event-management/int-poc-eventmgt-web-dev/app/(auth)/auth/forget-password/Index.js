"use client";

import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Link from "next/link";
import { useState } from "react";
import { Mail } from "lucide-react";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // UI only (no API)
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    toast.success("Password reset link sent to your email (UI only)");
  };

  return (
    <Container className="signin-page">
      <Row className="min-vh-100 w-100 align-items-center justify-content-center">
        <Col xs={12} lg={5} className="mx-auto px-4">

          <h1 className="fw-bold mb-2">Forgot Password</h1>
          <p className="text-muted mb-4">
            Enter your email to reset your password
          </p>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <div className="position-relative">
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Mail className="input-icon" />
              </div>
            </Form.Group>

            <Button type="submit" className="w-100 mt-3">
              Send Reset Link
            </Button>

            <div className="text-center mt-4">
              Remember your password?{" "}
              <Link href="/auth/login">Back to Login</Link>
            </div>
          </Form>

        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;

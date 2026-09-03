import React, { useState } from 'react';
import { registerUser } from '../api/Services';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = {};
        if (!form.name.trim()) {
            errors.name = 'Name is required.';
        }
        if (!form.email.trim()) {
            errors.email = 'Email is required.';
        } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
            errors.email = 'Enter a valid email address.';
        }
        if (!form.password) {
            errors.password = 'Password is required.';
        } else if (form.password.length < 6) {
            errors.password = 'Password must be at least 6 characters.';
        }
        if (!form.confirmPassword) {
            errors.confirmPassword = 'Confirm your password.';
        } else if (form.password !== form.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match.';
        }
        setFieldErrors(errors);
        if (Object.keys(errors).length > 0) {
            setError('Please fix the errors below.');
            return;
        }
        setError('');
        setFieldErrors({});
        // Store signup user using MockAPI
        registerUser({
            name: form.name,
            email: form.email,
            password: form.password
        })
        .then(() => {
            navigate('/');
        })
        .catch((err) => {
            setError('Signup failed: ' + (err.message || 'Unknown error'));
        });
    };

    return (
        <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <Row className="w-100 justify-content-center">
                <Col xs={12} sm={8} md={6} lg={4}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <h2 className="text-center mb-4 text-success fw-bold">Sign Up</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        isInvalid={!!fieldErrors.name}
                                    />
                                    {fieldErrors.name && <Form.Text className="text-danger">{fieldErrors.name}</Form.Text>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        isInvalid={!!fieldErrors.email}
                                    />
                                    {fieldErrors.email && <Form.Text className="text-danger">{fieldErrors.email}</Form.Text>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        isInvalid={!!fieldErrors.password}
                                    />
                                    {fieldErrors.password && <Form.Text className="text-danger">{fieldErrors.password}</Form.Text>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formConfirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="confirmPassword"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm your password"
                                        isInvalid={!!fieldErrors.confirmPassword}
                                    />
                                    {fieldErrors.confirmPassword && <Form.Text className="text-danger">{fieldErrors.confirmPassword}</Form.Text>}
                                </Form.Group>
                                {error && <Alert variant="danger" className="text-center">{error}</Alert>}
                                <Button variant="success" type="submit" className="w-100 fw-semibold">
                                    Sign Up
                                </Button>
                            </Form>
                            <div className="mt-3 text-center text-secondary">
                                Already have an account? <a href="/login" className="text-success fw-semibold text-decoration-underline">Login</a>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Signup;

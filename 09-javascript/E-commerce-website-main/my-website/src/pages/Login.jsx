import React, { useState } from 'react';
import { mockApiInstance } from '../api/Services';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/slice/AuthSlice';

const Login = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.password) {
            setError('Please fill in all fields.');
            return;
        }
        try {
            // Fetch all users from MockAPI
            const response = await mockApiInstance.get('/users');
            const users = response.data;
            const user = users.find(
                (u) =>
                    u.email === form.email &&
                    u.password === form.password &&
                    u.name === form.name
            );
            if (user) {
                setError('');
                dispatch(login(user));
                navigate('/');
            } else {
                setError('Invalid credentials.');
            }
        } catch (err) {
            setError('Login failed: ' + (err.message || 'Unknown error'));
        }
    };

    return (
        <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <Row className="w-100 justify-content-center">
                <Col xs={12} sm={8} md={6} lg={4}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <h2 className="text-center mb-4 text-primary fw-bold">Login</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                    />
                                </Form.Group>
                                {error && <Alert variant="danger" className="text-center">{error}</Alert>}
                                <Button variant="primary" type="submit" className="w-100 fw-semibold">
                                    Login
                                </Button>
                            </Form>
                            <div className="mt-3 text-center text-secondary">
                                Don't have an account? <a href="/signup" className="text-primary fw-semibold text-decoration-underline">Sign up</a>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;

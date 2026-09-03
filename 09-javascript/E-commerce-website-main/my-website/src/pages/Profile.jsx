import React, { useState, useEffect } from 'react';
import { mockApiInstance } from '../api/Services';
import { Card, Container, Row, Col, Button, Form, ListGroup, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logout, login } from '../store/slice/AuthSlice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    const { wishlistItems } = useSelector((state) => state.wishlist);

    const [form, setForm] = useState({
        name: user?.name || '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    if (!user) return null;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!form.name) {
            setError('Name cannot be empty.');
            setSuccess('');
            return;
        }
        try {
            const updatedUser = { ...user, name: form.name };
            if (form.password) {
                updatedUser.password = form.password;
            }
            // Update user in MockAPI
            const response = await mockApiInstance.put(`/users/${user.id}`, updatedUser);
            dispatch(login(response.data));
            setSuccess('Profile updated successfully!');
            setError('');
        } catch (err) {
            setError('Failed to update profile: ' + (err.message || 'Unknown error'));
            setSuccess('');
        }
    };

    return (
        <Container className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <Row className="w-100 justify-content-center">
                <Col xs={12} sm={10} md={8} lg={6}>
                    <Card className="shadow-lg rounded-4 mb-4">
                        <Card.Body className="text-center">
                            <div className="mb-4">
                                <span style={{ fontSize: '4rem' }}>👤</span>
                            </div>
                            <h2 className="mb-3 fw-bold text-primary">Profile</h2>
                            <div className="mb-3">
                                <strong>Name:</strong>
                                <div className="text-secondary fs-5">{user.name}</div>
                            </div>
                            <div className="mb-3">
                                <strong>Email:</strong>
                                <div className="text-secondary fs-5">{user.email}</div>
                            </div>
                            <Form onSubmit={handleUpdate} className="mb-3">
                                <Form.Group className="mb-2" controlId="updateName">
                                    <Form.Label>Update Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Enter new name"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="updatePassword">
                                    <Form.Label>Update Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder="Enter new password"
                                    />
                                </Form.Group>
                                {error && <Alert variant="danger" className="text-center">{error}</Alert>}
                                {success && <Alert variant="success" className="text-center">{success}</Alert>}
                                <Button variant="primary" type="submit" className="w-100 fw-semibold mb-2">
                                    Update Profile
                                </Button>
                            </Form>
                            <Button variant="outline-danger" className="w-100 fw-semibold" onClick={() => dispatch(logout())}>
                                Logout
                            </Button>
                        </Card.Body>
                    </Card>

                </Col>
                <Col xs={12} sm={10} md={8} lg={6}>
                    <Card className="shadow-lg rounded-4 mb-4">
                        <Card.Body>
                            <h4 className="fw-bold text-success mb-3">Cart Items</h4>
                            {cartItems.length === 0 ? (
                                <div className="text-muted">No items in cart.</div>
                            ) : (
                                <ListGroup>
                                    {cartItems.map((item) => (
                                        <ListGroup.Item key={item.productID ?? item.id}>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span>{item.title}</span>
                                                <span className="fw-bold text-primary">₹{item.price}</span>
                                            </div>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </Card.Body>
                    </Card>
                    <Card className="shadow-lg rounded-4">
                        <Card.Body>
                            <h4 className="fw-bold text-info mb-3">Wishlist Items</h4>
                            {wishlistItems.length === 0 ? (
                                <div className="text-muted">No items in wishlist.</div>
                            ) : (
                                <ListGroup>
                                    {wishlistItems.map((item) => (
                                        <ListGroup.Item key={item.productID ?? item.id}>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span>{item.title}</span>
                                                <span className="fw-bold text-primary">₹{item.price}</span>
                                            </div>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;

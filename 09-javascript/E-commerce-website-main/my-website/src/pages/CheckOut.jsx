import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CheckOut = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => navigate('/'), 3000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <Container className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <Row className="w-100 justify-content-center">
                <Col xs={12} sm={8} md={6} lg={5}>
                    <Card className="shadow-lg rounded-4 text-center p-4">
                        <Card.Body>
                            <div className="mb-4">
                                <span style={{ fontSize: '4rem' }}><svg  xmlns="http://www.w3.org/2000/svg"  width="100"  height="100"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-truck-delivery"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" /><path d="M3 9l4 0" /></svg></span>
                            </div>
                            <h2 className="fw-bold text-success mb-3">Order Placed!</h2>
                            <p className="lead mb-4">Thank you for shopping with us. Your order has been placed successfully.</p>
                            <p className="text-muted">Redirecting to home page...</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CheckOut;

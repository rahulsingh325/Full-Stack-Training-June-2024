import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Card, Button, ListGroup, Image, Form, InputGroup } from "react-bootstrap";
import { removeItemFromCart, increaseQuantity, decreaseQuantity, clearCart } from "../store/slice/CartSlice";
import { applyCoupon, removeCoupon } from "../store/slice/CouponSlice";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
    const { cartItems } = useSelector(s => s.cart);
    const { appliedCoupon, discount } = useSelector(s => s.coupon);
    const { isAuthenticated } = useSelector(s => s.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [coupon, setCoupon] = useState("");

    if (!isAuthenticated) return <Navigate to="/login" />;

    const totalItems = cartItems.reduce((t, i) => t + i.quantity, 0);
    const totalPrice = cartItems.reduce((t, i) => t + i.price * i.quantity, 0);
    const finalPrice = discount ? totalPrice - (totalPrice * discount) / 100 : totalPrice;
    const fmt = n => n.toFixed(2);

    return (
        <Container className="my-4">
            <Row className="align-items-center mb-3">
                <Col><h2>Shopping Cart</h2></Col>
                <Col className="text-end">
                    {cartItems.length > 0 && <Button variant="outline-danger" onClick={() => dispatch(clearCart())}>Clear Cart</Button>}
                </Col>
            </Row>

            <Row>
                {/* Cart Items */}
                <Col md={8}>
                    {cartItems.length === 0 ? (
                        <div className="d-flex flex-column align-items-center py-5 text-center">
                            <div className="display-1 text-muted mb-3">🛒</div>
                            <h4>Your cart is empty</h4>
                            <p className="text-muted">Looks like you haven’t added anything yet.</p>
                            <Button variant="primary" href="/products">Add Products</Button>
                        </div>
                    ) : cartItems.map(item => (
                        <Card key={item.id} className="mb-3 shadow-sm rounded-3">
                            <Card.Body className="d-flex align-items-start">
                                <Image src={item.thumbnail} alt={item.title} className="me-3 rounded bg-light p-2" width={100} height={100} style={{ objectFit: "contain" }} />
                                <div className="flex-grow-1">
                                    <h5>{item.title}</h5>
                                    {item.description && <p className="text-muted small">{item.description.slice(0, 110)}...</p>}
                                    <div className="fw-bold text-primary">₹{fmt(item.price)}</div>
                                </div>
                                <div className="ms-3 d-flex flex-column align-items-end">
                                    <div className="d-flex align-items-center mb-2">
                                        <Button size="sm" variant="light" onClick={() => dispatch(decreaseQuantity(item))} disabled={item.quantity <= 1}>−</Button>
                                        <Form.Control value={item.quantity} readOnly className="text-center mx-2" style={{ width: 56 }} />
                                        <Button size="sm" variant="light" onClick={() => dispatch(increaseQuantity(item))}>+</Button>
                                    </div>
                                    <Button variant="outline-danger" size="sm" className="w-100" onClick={() => dispatch(removeItemFromCart(item))}>Remove</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                </Col>

                {/* Order Summary */}
                <Col md={4}>
                    <Card className="shadow-sm rounded-3">
                        <Card.Header className="fw-bold">Order Summary</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item className="d-flex justify-content-between">
                                <span>Subtotal ({totalItems} items):</span><span className="fw-bold">₹{fmt(totalPrice)}</span>
                            </ListGroup.Item>
                            <ListGroup.Item className="d-flex justify-content-between"><span>Shipping:</span><span className="text-success">Free</span></ListGroup.Item>
                            <ListGroup.Item>
                                {!appliedCoupon ? (
                                    <InputGroup>
                                        <Form.Control placeholder="Enter coupon code" value={coupon} onChange={e => setCoupon(e.target.value)} />
                                        <Button variant="success" onClick={() => { if (coupon.trim()) { dispatch(applyCoupon({ code: coupon })); setCoupon(""); } }}>Apply</Button>
                                    </InputGroup>
                                ) : (
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span>Coupon <b>{appliedCoupon}</b> applied! ({discount}% off)</span>
                                        <Button variant="outline-danger" size="sm" onClick={() => dispatch(removeCoupon())} className="p-1"><FaTrash size={14} /></Button>
                                    </div>
                                )}
                            </ListGroup.Item>
                            <ListGroup.Item className="d-flex justify-content-between"><strong>Total:</strong><strong className="text-primary">₹{fmt(finalPrice)}</strong></ListGroup.Item>
                        </ListGroup>
                        <Card.Body>
                            <Button variant="primary" className="w-100 mb-2" disabled={!cartItems.length} onClick={() => { dispatch(clearCart()); navigate("/checkout"); }}>Proceed to Checkout</Button>
                            <Button variant="btn btn-warning text-dark" href="/products" className="w-100">Continue Shopping</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Cart;

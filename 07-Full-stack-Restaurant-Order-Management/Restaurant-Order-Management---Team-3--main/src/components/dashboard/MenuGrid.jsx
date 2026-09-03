import React, { useMemo, useEffect, useState } from "react";
import { Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { BsDash, BsPlus } from "react-icons/bs";

const MenuGrid = ({ data = [], getQty, onAdd, onRemove }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);



    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center py-5">
                <Spinner animation="border" variant="primary" />
                <span className="ms-2">Loading menu items...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-5">
                <p className="text-danger">{error}</p>
                <Button variant="outline-primary" onClick={() => window.location.reload()}>
                    Retry
                </Button>
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="text-center py-5">
                <p className="text-muted">No menu items found for this category.</p>
            </div>
        );
    }

    return (
        <Row className="row-gap-3">
            {data.map((item) => {
                const count = getQty ? getQty(item.id) : 0;

                return (
                    <Col key={item.id} md={6} xl={4}>
                        <Card className="border-0 shadow-sm rounded p-3 h-100" style={{ minWidth: 0 }}>
                            <div className="d-flex">
                                <Card.Img
                                    src={item.image}
                                    alt={item.title}
                                    className="rounded-3 me-3"
                                    style={{ width: 84, height: 84, objectFit: "cover", flex: "0 0 auto" }}
                                />
                                <div className="flex-grow-1" style={{ minWidth: 0 }}>
                                    <h6 className="fw-semibold mb-1">{item.title}</h6>
                                    <p className="fs-body text-neutral-300 mb-8" style={{ lineHeight: 1.3 }}>
                                        {item.description}
                                    </p>
                                    <div className="fs-body text-neutral-400">
                                        {item.stock} Available • {item.sold} Sold
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex align-items-center justify-content-between mt-3">
                                <h6 className="fw-bold mb-0">${item.price.toFixed(2)}</h6>

                                <div className="d-flex align-items-center">
                                    <Button
                                        variant="light"
                                        className="rounded-circle d-flex align-items-center justify-content-center p-3"
                                        onClick={() => onRemove?.(item.id)}
                                        disabled={count === 0}
                                    >
                                        <BsDash />
                                    </Button>
                                    <span className="fw-bold mx-3" style={{ minWidth: 12, textAlign: "center" }}>
                                        {count}
                                    </span>
                                    <Button
                                        variant={count > 0 ? "primary" : "light"}
                                        className={`d-flex align-items-center justify-content-center rounded-circle p-3 ${count === 0 ? "border" : ""}`}
                                        onClick={() => onAdd?.(item)}
                                    >
                                        <BsPlus />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </Col>
                );
            })}
        </Row>
    );
};

export default MenuGrid;

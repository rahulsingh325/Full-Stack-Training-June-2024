import React from "react";
import { Button, Form } from "react-bootstrap";

const CardPayment = () => {
    return (
        <>
            <div className="mb-5 fs-title text-neutral-700 fw-semibold">Input Amount</div>
            <Form.Group className="mb-3 ">
                <Form.Label className="fs-title text-neutral-700 mb-2">Bank</Form.Label>
                <Form.Control className="p-3" placeholder="Slied your card" />
            </Form.Group>

            <Form.Group className="mb-3 ">
                <Form.Label className="fs-title text-neutral-700 mb-2">Card number</Form.Label>
                <Form.Control className="p-3" type="password" placeholder="•••• •••• •••• ••••" />
            </Form.Group>
        </>
    );
};

export default CardPayment;

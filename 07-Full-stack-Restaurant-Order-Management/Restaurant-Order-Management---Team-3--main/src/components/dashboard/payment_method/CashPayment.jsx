import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const CashPayment = ({ total }) => {
    const [amount, setAmount] = useState(total.toString());

    const handleClick = (key) => {
        if (key === "⌫") {
            // remove last digit
            setAmount(amount.slice(0, -1) || "0");
        } else {
            // add digit (replace 0 with first digit)
            setAmount(amount === "0" ? key.toString() : amount + key);
        }
    };

    return (
        <>
            <div className="mb-2 fw-semibold">Input Amount</div>

            <div className="input-group mb-3">
                <span className="input-group-text bg-white border-end-0">$</span>
                <Form.Control
                    className="text-end fw-semibold border-start-0"
                    value={amount}
                    readOnly
                />
            </div>

            <div
                className="d-grid gap-2"
                style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
            >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, "00", 0, "⌫"].map((k) => (
                    <Button
                        key={k}
                        variant="light"
                        className={`p-5 fs-h4 fw-semibold rounded-pill ${k == '⌫' ? 'bg-error-50 text-error-300' : 'text-neutral-700 bg-neutral-50 '}`}
                        onClick={() => handleClick(k)}
                    >
                        {k}
                    </Button>
                ))}
            </div>
        </>
    );
};

export default CashPayment;

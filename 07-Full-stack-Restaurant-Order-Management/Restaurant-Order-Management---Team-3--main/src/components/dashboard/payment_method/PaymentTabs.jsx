import React, { useState } from "react";
import cashIcon from "../../../assets/image/icon/cash.svg";
import qrisIcon from "../../../assets/image/icon/qr.svg";
import cardIcon from "../../../assets/image/icon/cradetcard.svg";

// import the per-method views
import CashPayment from "./CashPayment";
import QrisPayment from "./QrisPayment";
import CardPayment from "./CardPayment";

const methods = [
    { key: "cash", label: "Cash", icon: cashIcon, view: CashPayment },
    { key: "qris", label: "Qris", icon: qrisIcon, view: QrisPayment },
    { key: "card", label: "Debit/Credit Card", icon: cardIcon, view: CardPayment },
];

const PaymentTabs = ({ total }) => {
    const [active, setActive] = useState("cash");

    const ActiveView = (methods.find(m => m.key === active) || methods[0]).view;

    return (
        <>
            <div className="mb-5 fw-semibold">Payment Method</div>

            <div className="d-flex gap-3 mb-4">
                {methods.map((m) => {
                    const isActive = active === m.key;
                    return (
                        <div
                            key={m.key}
                            role="button"
                            onClick={() => setActive(m.key)}
                            className="flex-fill text-center p-0"
                            style={{ minWidth: 0 }}
                        >
                            <div
                                className="d-flex align-items-center justify-content-center mx-auto "
                                style={{
                                    width: 120,
                                    height: 78,
                                    borderRadius: 12,
                                    border: isActive ? "2px solid #2F6FED" : "1px solid #E6E9EF",
                                    background: "#fff",
                                    transition: "border-color .15s ease"
                                }}
                            >
                                <img
                                    src={m.icon}
                                    alt={m.label}
                                    style={{ maxWidth: 56, maxHeight: 36, objectFit: "contain" }}
                                />
                            </div>
                            <div className="mt-2  " style={{ fontSize: 12, color: "#5B667A" }}>
                                {m.label}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Render the active method component here */}
            <ActiveView total={total} />
        </>
    );
};

export default PaymentTabs;

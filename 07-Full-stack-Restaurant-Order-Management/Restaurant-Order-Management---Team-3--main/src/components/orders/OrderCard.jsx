import React, { useState } from "react";
import { Card, Button, Table } from "react-bootstrap";
import OrderLabel from "./OrderLabel";
import OrderDetailsModal from "./OrderDetailsModal";
import "../../assets/scss/modules/_orders.scss";

// Avatar background style based on order status
const statusStyles = {
  waiting: { icon: "bg-warning text-dark" },
  canceled: { icon: "bg-error-200 text-white" },
  completed: { icon: "bg-brand-300 text-white" },
  "ready to serve": { icon: "bg-success-300 text-white" },
};

// Avatar Component
const Avatar = ({ status }) => {
  const normalizedStatus = status?.toLowerCase();

  return (
    <div
      className={`user-icon d-flex align-items-center justify-content-center 
        ${statusStyles[normalizedStatus]?.icon || "bg-primary text-white"} avatar-style`}
    >
      <span className="avatar-text">
        CA
      </span>
    </div>
  );
};

// Main Card Component
const OrderCard = ({ order }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <Card className="shadow-sm rounded-4 border-0 mb-4 p-5 h-100 d-flex flex-column">
        {/* Header */}
        <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <Avatar status={order.status} customer={order.customer} />
            <div className="ms-3">
              <h3 className="mb-0 fs-title text-neutral-500">{order.customer}</h3>
              <p className="mb-0 text-muted fw-medium fs-body">
                Order #{order.id} / {order.orderType}
              </p>
            </div>
          </div>
          <OrderLabel status={order.status} />
        </Card.Header>

        {/* Body */}
        <Card.Body className="pt-4 flex-grow-1">
          <div className="d-flex justify-content-between fs-body text-neutral-500 mb-4">
            <div>{order.date}</div>
            <div>{order.time}</div>
          </div>

          <hr className="my-4 border-top border-neutral-200" />

          <div className="table-responsive mb-4">
            <Table borderless size="sm" className="mb-0 fs-body text-neutral-500 align-items-center">
              <thead>
                <tr>
                  <th className="text-neutral-300">Item</th>
                  <th className="text-neutral-300">Qty</th>
                  <th className="text-end text-neutral-300">Price</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="fw-medium text-neutral-500">{item.title}</td>
                    <td className="ps-3 text-neutral-500">{item.quantity}</td>
                    <td className="text-end text-neutral-500">${item.price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <hr className="my-4 border-top border-neutral-200" />

          <div className="d-flex justify-content-between align-items-center mb-4">
            <h6 className="mb-0 fs-title text-neutral-700">Total</h6>
            <h6 className="mb-0 fs-title text-neutral-700 fw-bold">
              ${order.totalPayable}
            </h6>
          </div>
        </Card.Body>

        {/* Footer Buttons */}
        <Card.Footer className="bg-white border-0 d-flex justify-content-between">
          <Button
            className="btn w-100 btn-brand-soft rounded-pill fw-medium bg-brand-50 text-brand-300 p-3 border-0"
            onClick={() => setShowDetails(true)}
          >
            See Detail
          </Button>
          <Button className="ms-3 btn w-100 btn-brand-filled rounded-pill fw-medium text-white p-3">
            Pay Bills
          </Button>
        </Card.Footer>
      </Card>

      {/* Modal Component */}
      <OrderDetailsModal
        show={showDetails}
        handleClose={() => setShowDetails(false)}
        order={order}
      />
    </>
  );
};

export default OrderCard;

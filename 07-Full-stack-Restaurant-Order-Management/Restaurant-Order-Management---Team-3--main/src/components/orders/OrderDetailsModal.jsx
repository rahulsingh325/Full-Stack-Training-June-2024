import React from "react";
import { Modal, Image } from "react-bootstrap";
import OrderLabel from "./OrderLabel";
import "../../assets/scss/modules/_orders.scss";


const Avatar = ({ status }) => {
  const statusStyles = {
    waiting: "bg-warning text-dark",
    canceled: "bg-error-200 text-white",
    completed: "bg-brand-300 text-white",
    "ready to serve": "bg-success text-white",
  };
  const normalizedStatus = status?.toLowerCase();
//   const initials = customer?.slice(0, 2).toUpperCase();

  return (
    <div
      className={`avatar-style avatar-text user-icon d-flex align-items-center justify-content-center ${statusStyles[normalizedStatus] || "bg-primary text-white"}`}
    >
        CA
      {/* {initials} */}
    </div>
  );
};

const OrderDetailsModal = ({ show, handleClose, order }) => {
  if (!order) return null;

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop={true}
      className=""
      dialogClassName=""
      contentClassName="border-0"
      centered={false}
      scrollable
    >
      <Modal.Body className="p-8 hide-scrollbar">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div className="d-flex align-items-center">
            <Avatar status={order.status} customer={order.customer} />
            <div className="ms-3">
              <h4 className="mb-0 fs-h5 fw-medium">{order.customer}</h4>
              <p className="mb-0 text-neutral-300 fs-body">
                Order #{order.id} / {order.orderType}
              </p>
            </div>
          </div>
          <OrderLabel status={order.status} />
        </div>

        {/* Date / Time */}
        <div className="d-flex justify-content-between text-neutral-100 fs-body mb-4">
          <div>{order.date}</div>
          <div>{order.time}</div>
        </div>

        {/* Items List */}
        <h5 className="mb-4">Order List</h5>
        <div className="mb-4">
          {order.items.map((item, idx) => (
            <div
              key={idx}
              className="d-flex justify-content-between align-items-center mb-4"
            >
              <div className="d-flex align-items-center">
                <Image
                  src={item.image}
                  height={64}
                  width={64}
                  rounded
                  className="me-3 object-fit-cover"
                />
                <div>
                  <h6 className="mb-1">{item.title}</h6>
                  <span className="text-muted small">
                    {item.quantity} x ${item.price}
                  </span>
                </div>
              </div>
              <div className="fw-semibold fs-6">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <hr />

        {/* Totals */}
        <div className="mb-3 d-flex justify-content-between text-muted">
          <span>Subtotal</span>
          <span>${order.subTotal.toFixed(2)}</span>
        </div>
        <div className="mb-3 d-flex justify-content-between text-muted">
          <span>Tax (10%)</span>
          <span>${order.taxAmount.toFixed(2)}</span>
        </div>
        <div className="mb-3 d-flex justify-content-between text-muted">
          <span>Discount</span>
          <span>-${order.discountAmount.toFixed(2)}</span>
        </div>

        <hr />

        {/* Total */}
        <div className="d-flex justify-content-between align-items-center fs-5 fw-bold">
          <span>Total</span>
          <span className="text-primary">${order.totalPayable.toFixed(2)}</span>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default OrderDetailsModal;
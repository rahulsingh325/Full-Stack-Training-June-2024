import React, { useEffect, useState } from 'react';
import { ListGroup, Button, Card, Row, Col, Form, InputGroup } from 'react-bootstrap';
import PrintIcon from "../../assets/image/icon/Vector.svg";
import "../../assets/scss/modules/_orders.scss";

// Importing Modals
import Printbillmodal from "../../components/bill/Printbillmodal";
import PrintSucesspopup from "../../components/bill/Printsucesspopup";
import Processmodalpopul from "../../components/bill/Processmodalpopup";
import { getOrderData } from '../../services/orderdata';

const OrderDetails = ({ orderId }) => {
  const [ordersData, setOrdersData] = useState([]);
  const order = ordersData.find(order => order.id === orderId);
  const [showPrint, setShowPrint] = useState(false);
  const [showProcess, setShowProcess] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const result = await getOrderData();
      if (result.success) {
        setOrdersData(result.data);
      } else {
        console.error(result.message);
      }
      setLoading(false);
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <p>History data details is Loading...</p>
      </div>
    );
  }

  if (!order) return <div>Order not found</div>;

  const {
    customer,
    table,
    orderType,
    time,
    // date,
    items,
    subTotal,
    taxPercent,
    taxAmount,
    // discountAmount,
    totalPayable,
  } = order;

  // Filter items by search term
  const filteredItems = items.filter(item =>
    // item.title.toLowerCase().includes(searchTerm.toLowerCase())
    item.title.toLowerCase().includes('')
  );

  return (
    <div className="d-flex flex-column h-100 bg-white p-8">
      {/* Scrollable Content Area */}
      <div className="flex-grow-1 overflow-auto hide-scrollbar">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold fs-h5 text-neutral-700 mb-0">Detail history</h5>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-0">
          <span className="text-neutral-400 fs-body">Order Number #{orderId}</span>
          <span className="text-neutral-400 fs-body">{time}</span>
        </div>

        <hr className="border border-2 border-neutral-200 my-4" />

        {/* Customer Info Boxes */}
        <div>
          <div className="p-2 mb-2 border border-neutral-200 rounded bg-white">{customer}</div>
          <div className="p-2 mb-2 border border-neutral-200 rounded bg-white">Table {table}</div>
          <div className="p-2 border border-neutral-200 rounded bg-white">{orderType}</div>
        </div>

        <hr className="border border-2 border-neutral-200 my-4" />

        {/* Order List */}
        <h5 className="fw-semibold text-neutral-700 mb-6">Order List</h5>
        <ListGroup variant="flush">
          {filteredItems.map((item, index) => (
            <ListGroup.Item key={index} className="border-0 px-0 bg-neutral-00">
              <div className="d-flex">
                <img
                  src={item.image}
                  alt={item.title}
                  className="me-3 order-item-image"
                />

                <div className="flex-grow-1 d-flex flex-column justify-content-between">
                  <div>
                    <div className="fw-semibold fs-tittle fw-medium">{item.title}</div>
                    <div className="text-neutral-400 fs-body fw-medium">{item.quantity} Dish</div>
                    <div className="text-brand-200 fs-body fw-medium">{item.flavorProfile}</div>
                  </div>

                  <div className="fw-bold fs-tittle text-neutral-700">${item.price.toFixed(2)}</div>
                </div>
              </div>

              {index < filteredItems.length - 1 && <hr className="border border-2 border-neutral-200 my-3" />}
            </ListGroup.Item>
          ))}
        </ListGroup>

        <hr className="border border-2 border-neutral-200 my-4" />

        {/* Order Summary */}
        <h6 className="fw-bold fs-5 text-neutral-700 mb-5">Order summary</h6>

        <Card className="bg-neutral-100 rounded-4 p-5 border-0 position-relative overflow-hidden history">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <span className="fs-body fw-medium text-neutral-400">Subtotal</span>
            <span className="fs-tittle fw-medium text-neutral-700">${subTotal.toFixed(2)}</span>
          </div>

          <div className="d-flex align-items-center justify-content-between mb-3">
            <span className="fs-body fw-medium text-neutral-400">Tax ({taxPercent}%)</span>
            <span className="fs-tittle fw-medium text-neutral-700">${taxAmount.toFixed(2)}</span>
          </div>

          <div className="position-relative my-3 border-top border-2 border-dashed custom-divider"></div>

          <div className="d-flex align-items-center justify-content-between">
            <span className="fs-tittle fw-medium text-neutral-700">Total</span>
            <span className="fs-h5 fw-medium text-success-500">${totalPayable.toFixed(2)}</span>
          </div>
        </Card>
      </div>

      {/* Fixed Bottom Button */}
      <div className="bg-neutral-00 pt-8 border-top border-neutral-200">
        <Button
          className="btn-brand-filled ms-3 rounded-pill fw-medium w-100 text-white bg-brand-300"
          onClick={() => {
            // setSelectedBill(order);
            setShowPrint(true);
          }}
        >
          <img className="me-2 print-icon" src={PrintIcon} alt="Print Invoice" />
          Print Invoice
        </Button>
      </div>

      <Printbillmodal
        show={showPrint}
        onConfirm={() => { setShowProcess(true); setShowPrint(false) }}
        onClose={() => setShowPrint(false)}
      />
      <Processmodalpopul
        show={showProcess}
        onComplete={() => { setShowSuccess(true); setShowProcess(false) }}
        handleClose={() => setShowProcess(false)}
      />
      <PrintSucesspopup
        show={showSuccess}
        handleClose={() => setShowSuccess(false)}
      />
    </div>
  );
};

export default OrderDetails;

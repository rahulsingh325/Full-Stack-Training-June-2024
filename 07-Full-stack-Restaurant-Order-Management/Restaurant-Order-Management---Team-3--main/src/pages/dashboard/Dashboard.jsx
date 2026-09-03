import React, { useMemo, useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import "../../assets/scss/modules/_dashboard.scss";
import { BsDash, BsPlus } from "react-icons/bs";
import noteIcon from "../../assets/image/icon/addnote.svg";
import rightArrow from "../../assets/image/icon/arrowright.svg";

import HorizontalScrollContainer from '../../components/dashboard/HorizontalScrollContainer';
import { OrdersDetail } from '../../components/dashboard/OrderCard';
import MenuGrid from "../../components/dashboard/MenuGrid";
import AddNoteModal from "../../components/dashboard/modal/AddNoteModal";
import PaymentOffcanvas from "../../components/dashboard/PaymentOffcanvas";
import TablePage from '../../components/dashboard/table/TablePage';
import { getMenuByCategory, getMenuCategories } from '../../services/menu';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { checkAuth } from '../../services/auth';
import { loginSuccess, logout } from '../../store/authSlice';


const Dashboard = () => {
  const [showTablePage, setShowTablePage] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("main-course");
  const [orderType, setOrderType] = useState("Dine in");
  const [selectedTables, setSelectedTables] = useState([])
  const [menuCount, setMenuCount] = useState(0);
  const [menuCategories, setMenuCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  
  // cart state
  const [orders, setOrders] = useState([]);

  // loading 
  const [loading, setLoading] = useState(false);

  const {isAuthenticated} = useSelector(state => state.auth)

  // payment offcanvas
  const [showPayment, setShowPayment] = useState(false);
  const openPayment = () => setShowPayment(true);
  const closePayment = () => setShowPayment(false);

  // note modal
  const [showNote, setShowNote] = useState(false);
  const [orderNote, setOrderNote] = useState("");
  const openNote = () => setShowNote(true);
  const closeNote = () => setShowNote(false);
  const addNoteToOrder = () => {
    closeNote();
  };


  // Fetch menu count when category changes
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const result = await getMenuByCategory({ category: selectedCategory });
        if (result.success) {
          setMenuItems(result.data);
          setMenuCount(result.total);
        }
      } catch (error) {
        setMenuCount(0);
        setMenuItems([]);
      }
    };

    fetchMenuItems();
  }, [selectedCategory]);

  useEffect(() => {
    const fetchMenuCategories = async () => {
      const result = await getMenuCategories();
      if (result.success) {
        setMenuCategories(result.data);
      }
    };
    fetchMenuCategories();
  }, []);



  const getQty = (id) => orders.find((o) => o.id === id)?.quantity || 0;

  const addItem = (item) => {
    setOrders((prev) => {
      const found = prev.find((o) => o.id === item.id);
      if (found) {
        return prev.map((o) =>
          o.id === item.id ? { ...o, quantity: o.quantity + 1 } : o
        );
      }
      return [
        ...prev,
        {
          id: item.id,
          title: item.title,
          image: item.image,
          price: item.price,
          quantity: 1,
        },
      ];
    });
  };

  const removeItem = (id) => {
    setOrders((prev) =>
      prev
        .map((o) => (o.id === id ? { ...o, quantity: o.quantity - 1 } : o))
        .filter((o) => o.quantity > 0)
    );
  };

  const subtotal = useMemo(
    () => orders.reduce((acc, o) => acc + o.price * o.quantity, 0),
    [orders]
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  // NEW: reset for a fresh order
  const handleNewOrder = () => {
    setOrders([]);            // clear Order Details
    setOrderNote("");         // optional: clear note
    setSelectedCategory("Main course"); // optional reset
    setShowPayment(false);    // ensure Offcanvas is closed
  };

  if(!isAuthenticated){
    return <Navigate to={"/login"}/>
  }

  // 👉 If showTablePage is true, render only TablePage fullscreen
  if (showTablePage) {
    return <TablePage onBack={() => setShowTablePage(false)} selectedTables={selectedTables} setSelectedTables={setSelectedTables} />;
  }

  return (
    <Container fluid className='h-100 dashboard-page'>
      <Row className="h-100 row-gap-4 align-items-stretch overflow-y-auto hide-scrollbar">
        {/* Left side */}
        <Col lg={8} xl={9} className="pe-lg-0 py-8 ps-0 h-100  overflow-y-auto hide-scrollbar">
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4 px-lg-8">
              <h5 className="fw-semibold text-dark">Order List</h5>
              <Button
                variant="link"
                className="p-0 text-primary text-decoration-none fs-caption"
              >
                See All
              </Button>
            </div>

            <div className="d-flex flex-nowrap overflow-auto pb-2 hide-scrollbar ps-lg-8">
              <HorizontalScrollContainer>
                <OrdersDetail />
              </HorizontalScrollContainer>
            </div>
            <div className="px-lg-8 mb-lg-6 mb-4">
              <div className="bg-neutral-100 d-flex rounded-pill overflow-x-auto hide-scrollbar p-1 w-100">
                
                {menuCategories.map(
                  (category) => (
                    <button
                      key={category.slug}
                      className={`btn rounded-pill fs-title text-neutral-300 text-nowrap flex-grow-1 py-2 ${selectedCategory === category.slug
                        ? "bg-white text-neutral-700 shadow-sm"
                        : "text-neutral-300"
                        }`}
                      onClick={() => setSelectedCategory(category.slug)}
                    >
                      {category.name}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="px-lg-8 pb-lg-0 overflow-y-auto hide-scrollbar">
            <div className="d-flex justify-content-between align-items-center my-4">
              <h6 className="fw-semibold mb-0">Menu</h6>
              <span className="text-muted small">Showing {menuCount} Items</span>
            </div>

            <div className="menu-scroll hide-scrollbar">
              <MenuGrid
                data={menuItems}
                getQty={getQty}
                onAdd={addItem}
                onRemove={removeItem}
              />
            </div>
          </div>
        </Col>

        {/* Right side */}
        <Col lg={4} xl={3} className=" px-0  bg-white h-100 overflow-y-auto hide-scrollbar">
          <Row>
            <Col md={8} lg={12} className='mx-auto'>
              <div className='p-lg-8 p-4'>
                <div>
                  <div className="bg-neutral-200 d-flex justify-content-between rounded-pill d-inline-flex w-100  mb-6">
                    {["Dine in", "Take Away"].map((type) => (
                      <button
                        key={type}
                        className={`btn rounded-pill fw-medium flex-grow-1 py-2 ${orderType === type
                          ? "bg-white text-dark border border-2 border-neutral-200"
                          : "text-muted"
                          }`}
                        onClick={() => setOrderType(type)}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  <div className="mb-5 fw-semibold fs-h5 text-dark">
                    Customer Information
                  </div>
                  <div className="mb-2">
                    <Form.Control
                      className="mb-2 p-lg-3 rounded-3 border"
                      type="text"
                      placeholder="Customer name"
                    />
                    {/* ✅ Button to show TablePage fullscreen */}
                    <Button
                      className="form-control bg-white p-lg-3 mb-6 rounded-3 border text-neutral-400 d-flex justify-content-between"
                      onClick={() => setShowTablePage(true)}
                    >
                      {selectedTables.length ? <div className='d-flex gap-2'>{selectedTables.map(t => <span className='text-neutral-700 fs-title'>{t.tableNumber}</span>)}</div> : <span className='text-neutral-700 fs-title'>Select table</span>}
                      <img src={rightArrow} alt="Select Table" />
                    </Button>
                  </div>

                  <Button
                    className="w-100 p-lg-3 mb-6 rounded-pill bg-brand-50 border-0 fs-title text-primary"
                    onClick={openNote}
                  >
                    <img src={noteIcon} alt="Add Note" className="me-2" />
                    Add note
                  </Button>
                  <hr className="mt-3 mb-6" />
                </div>

                <div>
                  <h6 className="mb-3 fs-h5">Order Details</h6>
                  <div
                    className="hide-scrollbar"
                    style={{
                      maxHeight: "28vh",
                      overflowY: "auto",
                      overflowX: "hidden",
                    }}
                  >
                    {orders.length === 0 ? (
                      <p className="text-muted">No items selected</p>
                    ) : (
                      orders.map((item, idx) => (
                        <div key={item.id} className="mb-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                              <img
                                src={item.image}
                                alt={item.title}
                                style={{ width: 94, height: 94, objectFit: "cover" }}
                                className="rounded-3 me-2"
                              />
                              <div>
                                <p className="mb-1 fw-medium">{item.title}</p>
                                <div className="d-flex align-items-center">
                                  <Button
                                    variant="light"
                                    className="rounded-circle p-1 d-flex justify-content-center align-items-center"
                                    onClick={() => removeItem(item.id)}
                                    disabled={item.quantity === 0}
                                  >
                                    <BsDash/>
                                  </Button>
                                  <span className="mx-2">{item.quantity}</span>
                                  <Button
                                    variant={item.quantity > 0 ? "primary" : "light"}
                                    className={`rounded-circle p-1 d-flex justify-content-center align-items-center ${item.quantity === 0 ? "border" : ""
                                      }`}
                                    onClick={() => addItem(item)}
                                    aria-label="Increase quantity"
                                  >
                                    <BsPlus/>
                                  </Button>
                                </div>
                              </div>
                            </div>
                            <span className="fw-semibold">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>

                          {idx < orders.length - 1 && <hr className="my-3" />}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              <div className=" border px-4 py-6 px-lg-8">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-muted fs-body">Subtotal</span>
                  <span className="fw-bold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted fs-body">Tax (10%)</span>
                  <span className="fw-bold">${tax.toFixed(2)}</span>
                </div>
                <hr className="dashed-line mt-3 mb-lg-6" />
                <div className="d-flex justify-content-between align-items-center mb-lg-5">
                  <strong>Total</strong>
                  <strong className="fs-5">${total.toFixed(2)}</strong>
                </div>
                <Button
                  variant="primary"
                  className="w-100 fw-bold py-2 rounded-pill"
                  onClick={openPayment}
                >
                  Process Transaction
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Payment Offcanvas */}
      <PaymentOffcanvas
        show={showPayment}
        onHide={closePayment}
        subtotal={subtotal}
        tax={tax}
        total={total}
        onNewOrder={handleNewOrder}   // pass reset callback
      />

      {/* Add Note Modal */}
      <AddNoteModal
        show={showNote}
        onHide={closeNote}
        note={orderNote}
        setNote={setOrderNote}
        onSubmit={addNoteToOrder}
      />
    </Container>
  );
};

export default Dashboard;
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import OrderCard from "../components/orders/OrderCard";
import "../assets/scss/theme.scss";
import arrowRightIcon from "../assets/image/icon/arrowright.svg";
import searchIcon from "../assets/image/icon/search.svg";
import ReactPaginate from "react-paginate";
import { getOrderData } from "../services/orderdata";

const Order = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 6;

  useEffect(() => {
    const fetchOrders = async () => {
      const result = await getOrderData();
      if (result.success) {
        setOrders(result.data);
      } else {
        console.error(result.message);
      }
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const normalize = (str) => str.trim().toLowerCase();

  const filteredOrders = orders.filter((order) => {
    const statusNorm = normalize(order.status);
    const filterNorm = normalize(filter);

    const matchStatus = filter === "All" || statusNorm === filterNorm;
    const matchSearch =
      search === "" ||
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toString().includes(search);

    return matchStatus && matchSearch;
  });

  const pageCount = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredOrders.slice(startIndex, endIndex);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <Container fluid className="p-8 bg-neutral-50 h-100 overflow-y-auto order">
      {/* Header Row */}
      <Row className="align-items-center mb-4 g-3">
        <Col xs={12} md={5}>
          <h5 className="fw-bold mb-0">Order List</h5>
        </Col>
        <Col
          xs={12}
          md={7}
          className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-3 gap-md-5"
        >
          <InputGroup className="shadow-sm rounded-12 w-md-140">
            <InputGroup.Text className="bg-white border-0 p-3">
              <img src={searchIcon} alt="Search" />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(0);
              }}
              className="border-0 shadow-none text-neutral-300"
            />
          </InputGroup>

          <span className="fw-semibold mt-2 mt-md-0">Date</span>

          <InputGroup className="shadow-sm rounded-12 overflow-hidden w-sixty w-sm-100">
            <Form.Control
              type="text"
              value="22/02/2024"
              readOnly
              className="border-0 text-neutral-700 fs-tittle fw-medium fw-semibold p-3"
            />
            <InputGroup.Text className="bg-white border-0">
              <img src={arrowRightIcon} alt="Arrow Right" />
            </InputGroup.Text>
          </InputGroup>
        </Col>
      </Row>

      {/* Filter Tabs */}
      <Row className="py-8">
        <Col>
          <ButtonGroup className="d-flex justify-content-between bg-neutral-100 p-1 rounded-pill overflow-x-auto hide-scrollbar">
            {["All", "Waiting", "Completed", "Ready to Serve", "Canceled"].map((status) => (
              <Button
                key={status}
                variant="light"
                className={`fw-semibold border-0 rounded-pill flex-grow-1 text-nowrap ${
                  filter === status ? "bg-white shadow-sm" : "bg-transparent text-muted"
                }`}
                onClick={() => {
                  setFilter(status);
                  setCurrentPage(0);
                }}
              >
                {status}
              </Button>
            ))}
          </ButtonGroup>
        </Col>
      </Row>

      {/* Customer List Header */}
      <Row className="align-items-center mb-3">
        <Col>
          <h5 className="fw-semibold text-neutral-700">Customer List</h5>
        </Col>
        <Col xs="auto" className="fs-body fw-medium text-neutral-400">
          Showing {filteredOrders.length === 0 ? 0 : startIndex + 1} to{" "}
          {Math.min(endIndex, filteredOrders.length)} of {filteredOrders.length} items
        </Col>
      </Row>

      {/* Orders Grid */}
      <Row>
        {loading ? (
          <Col>
            <p className="text-center text-muted">Loading orders...</p>
          </Col>
        ) : currentItems.length > 0 ? (
          currentItems.map((order) => (
            <Col md={6} lg={4} className="mb-4" key={order.id}>
              <OrderCard order={order} />
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center text-muted">No orders found</p>
          </Col>
        )}
      </Row>

      {/* Pagination */}
      {pageCount > 1 && (
        <Row className="mt-4 paginate">
          <Col className="d-flex justify-content-center justify-content-sm-end">
            <ReactPaginate
              previousLabel="«"
              nextLabel="»"
              breakLabel="..."
              pageCount={pageCount}
              onPageChange={handlePageChange}
              forcePage={currentPage}
              containerClassName="pagination gap-2 align-items-center"
              pageClassName="page-item"
              pageLinkClassName="page-link rounded-circle neutral-pagination d-flex align-items-center justify-content-center fw-medium p-0"
              previousLinkClassName="page-link rounded-circle arrow-pagination d-flex align-items-center justify-content-center fw-medium p-0"
              nextLinkClassName="page-link rounded-circle arrow-pagination d-flex align-items-center justify-content-center fw-medium p-0"
              activeClassName="active"
            />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Order;
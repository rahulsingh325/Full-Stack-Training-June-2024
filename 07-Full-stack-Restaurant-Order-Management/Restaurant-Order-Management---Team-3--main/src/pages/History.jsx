import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import OrderDetails from "../components/orders/OrderDetails";
import ReactPaginate from "react-paginate";
import { getOrderData } from "../services/orderdata";

const History = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [filter, setFilter] = useState("All");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);

  const sidebarRef = useRef(null);
  const itemsPerPage = 7;

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

  const normalize = (str) => str.trim().toLowerCase();

  const filteredOrders = ordersData.filter((order) => {
    const statusNorm = normalize(order.status);
    const filterNorm = normalize(filter);
    return filter === "All" || statusNorm === filterNorm;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let valA = a[sortConfig.key];
    let valB = b[sortConfig.key];

    if (sortConfig.key === "id") {
      valA = Number(valA);
      valB = Number(valB);
    }

    if (sortConfig.key === "time") {
      const parseTime = (timeStr) => {
        const [time, modifier] = timeStr.split(" ");
        let [hours, minutes] = time.split(":").map(Number);
        if (modifier === "PM" && hours !== 12) hours += 12;
        if (modifier === "AM" && hours === 12) hours = 0;
        return hours * 60 + minutes;
      };
      valA = parseTime(valA);
      valB = parseTime(valB);
    }

    if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
    if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const pageCount = Math.ceil(sortedOrders.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = sortedOrders.slice(startIndex, endIndex);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  const handleRowClick = (order) => {
    if (selectedRow === order.id) {
      // agar already select hai → deselect kar do
      setSelectedRow(null);
      setShowDetails(false);
    } else {
      // naya row select karo
      setSelectedRow(order.id);
      setShowDetails(true);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <p>History data is Loading...</p>
      </div>
    );
  }


  return (
    <Container fluid className="bg-neutral-50 h-100 overflow-y-auto hide-scrollbar history">
      <Row className="h-100">
        {/* Main Content */}
        <Col lg={showDetails ? 9 : 12} className="p-4 p-lg-8 h-100 overflow-y-auto hide-scrollbar">
          {/* Page Header */}
          <Row className="align-items-center mb-8">
            <Col>
              <h4 className="fw-semibold text-neutral-700 mb-0">History</h4>
            </Col>
            <Col xs="auto" className="text-neutral-400 fs-body fw-medium">
              Showing {filteredOrders.length === 0 ? 0 : startIndex + 1} to{" "}
              {Math.min(endIndex, filteredOrders.length)} items
            </Col>
          </Row>

          {/* Filter Tabs */}
          <div className="mb-8">
            <div className="d-flex bg-neutral-100 p-1 rounded-pill overflow-x-auto hide-scrollbar">
              {["All", "Waiting", "Completed", "Ready to Serve", "Canceled"].map((status) => (
                <Button
                  key={status}
                  variant="light"
                  className={`fw-semibold border-0 rounded-pill flex-grow-1 text-nowrap ${filter === status ? "bg-white shadow-sm" : "bg-transparent text-muted"
                    }`}
                  onClick={() => setFilter(status)}
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>

          {/* Card Wrapper */}
          <div className="rounded overflow-hidden border border-neutral-200 bg-white">
            {/* Card Header */}
            <div className="d-flex justify-content-between align-items-center px-5 border-bottom bg-white card-header-height">
              <div className="d-flex align-items-center gap-2">
                <h6 className="fw-semibold mb-0">History</h6>
                <span className="badge bg-primary bg-opacity-10 text-primary fs-body fw-semibold">
                  {filteredOrders.length}
                </span>
              </div>
              <span className="text-neutral-400">&#8942;</span>
            </div>

            {/* Orders Table */}
            <Table hover responsive className="align-middle mb-0 px-3">
              <thead>
                <tr className="table-row-height">
                  <th
                    className="fs-body fw-medium bg-neutral-50 text-neutral-600 cursor-pointer text-start ps-5"
                    onClick={() => handleSort("id")}
                  >
                    Order Number
                  </th>
                  <th
                    className="fs-body fw-medium bg-neutral-50 text-neutral-600 cursor-pointer text-center"
                    onClick={() => handleSort("time")}
                  >
                    Date/Time
                  </th>
                  <th className="fs-body fw-medium bg-neutral-50 text-neutral-600 text-center">
                    Payment Status
                  </th>
                  <th className="fs-body fw-medium bg-neutral-50 text-neutral-600 text-end pe-5">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((order) => (
                    <tr
                      key={order.id}
                      onClick={() => handleRowClick(order)}
                      className={`table-row-height cursor-pointer ${selectedRow === order.id ? "table-primary" : ""
                        }`}
                    >
                      <td
                        className={`ps-5 text-start ${selectedRow === order.id ? "text-neutral-700" : "text-neutral-400"
                          }`}
                      >
                        #{String(order.id).padStart(4, "0")}
                      </td>
                      <td
                        className={`text-center ${selectedRow === order.id ? "text-neutral-700" : "text-neutral-400"
                          }`}
                      >
                        {order.time}
                      </td>
                      <td className="text-brand-300 text-center">{order.paymentStatus}</td>
                      <td
                        className={`text-end pe-5 ${selectedRow === order.id ? "text-neutral-700" : "text-neutral-400"
                          }`}
                      >
                        ${order.totalPayable.toFixed(2)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="table-row-height">
                    <td colSpan="4" className="text-center text-muted">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>


            {/* Pagination */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3 px-3 pagination-height gap-2 mb-3 paginate">
              <div className="text-neutral-400 fs-tittle fw-regular">
                Page {currentPage + 1} of {pageCount}
              </div>

              <ReactPaginate
                previousLabel="«"
                nextLabel="»"
                breakLabel="..."
                pageCount={pageCount}
                onPageChange={({ selected }) => setCurrentPage(selected)}
                forcePage={currentPage}
                containerClassName="pagination gap-2 align-items-center m-0"
                pageClassName="page-item"
                pageLinkClassName="page-link rounded-circle neutral-pagination d-flex align-items-center justify-content-center fw-medium p-0"
                previousClassName="page-item"
                previousLinkClassName="page-link rounded-circle arrow-pagination d-flex align-items-center justify-content-center fw-medium p-0"
                nextClassName="page-item"
                nextLinkClassName="page-link rounded-circle arrow-pagination d-flex align-items-center justify-content-center fw-medium p-0"
                activeClassName="active"
              />
            </div>
          </div>
        </Col>

        {/* Sidebar */}
        {showDetails && selectedRow && (
          <Col
            lg={3}
            ref={sidebarRef}
            className="d-flex flex-column h-100 hide-scrollbar bg-neutral-00 shadow-sm overflow-y-auto sidebar-transition"
          >
            <OrderDetails orderId={selectedRow} isSidebarView />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default History;

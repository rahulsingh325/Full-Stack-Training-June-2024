import React, { useState } from "react";
import Deletpopup from "../components/bill/Deletpopup";
import PrintBillModal from "../components/bill/Printbillmodal";
import PrintSucesspopup from "../components/bill/Printsucesspopup";
import ProcessModalPopup from "../components/bill/Processmodalpopup";
import SearchIcon from "../assets/image/icon/search.svg";
import ArrowRight from "../assets/image/icon/arrowright.svg";
import BillsList from "../data/bills/BillsData";
import "../assets/scss/modules/_bill.scss"
import { Form, InputGroup, Col, Row, Button, Container } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";

const Bills = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBill, setSelectedBill] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [showPrint, setShowPrint] = useState(false);
  const [showProcess, setShowProcess] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const filteredBills = BillsList.filter((bill) => {
    const customer = bill.customerName?.toLowerCase() || "";
    const order = bill.orderId?.toString().toLowerCase() || "";
    const search = searchTerm.toLowerCase();
    return customer.includes(search) || order.includes(search);
  });

  const [currentPage, setCurrentPage] = useState(1);
  const billsPerPage = 6;
  const indexOfLast = currentPage * billsPerPage;
  const indexOfFirst = indexOfLast - billsPerPage;
  const currentBills = filteredBills.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredBills.length / billsPerPage);


  return (
    <Container  fluid className=" h-100 overflow-y-auto hide-scrollbar p-4 bill-page">
      <Row>
        <Col className="col-12 py-4">

          <Row className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
            <Col lg={6}>
              <h4 className="fw-semibold fs-h4 text-neutral-700 mb-0">Bills</h4>
            </Col>

            <Col lg={6} className="d-flex  align-items-center gap-2 ">
              <div className="d-flex flex-grow-1">

                <InputGroup className="rounded-sm">
                  <InputGroup.Text className=" rounded-lg border-end-0 bg-white">
                    <img src={SearchIcon} alt="" />
                  </InputGroup.Text>
                  <Form.Control className="border-start-0"
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} />
                </InputGroup>

                <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-neutral-400 pe-none"  >
                </span>
              </div>


              <h6 className="fw-small fs-h6 text-neutral-700 mb-1">Date</h6>
              <div className="position-relative w-160" >
                <InputGroup className="rounded-0">

                  <Form.Control
                    className="border-end-0"
                    type="text"
                    placeholder="12/09/2025"
                  />

                  <InputGroup.Text className="bg-white rounded-lg border-start-0">
                    <img src={ArrowRight} alt="" />
                  </InputGroup.Text>

                </InputGroup>

              </div>
            </Col>
          </Row>

          <div className="card rounded-2 border-neutral-50 flex-column">
            <div className="table-responsive flex-fill">
              <table className="table  align-middle mb-0 border border-neutral-50  ">
                <thead>
                  <tr>
                    <th colSpan="5" className="p-0">
                      <div className="d-flex justify-content-between align-items-center px-3 py-2 ">
                        <h5 className="fw-semibold mb-0">
                          Bills <span className="ms-3 text-primary bg-brand-50 rounded">{filteredBills.length}</span>
                        </h5>
                        <button className="btn btn-light border-0 p-1">
                          <BsThreeDotsVertical />
                        </button>
                      </div>
                    </th>
                  </tr>
                  <tr className="fw-medium text-neutral-300 ">
                    <th className="p-3 w-20" >Customer Name</th>
                    <th className="p-3 w-15">Table</th>
                    <th className="p-3 w-20">Order Number</th>
                    <th className="p-3 w-15">Status</th>
                    <th className="text-end pe-8 p-3  w-15">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {currentBills.length > 0 ? (
                    currentBills.map((bill) => (
                      <tr key={bill.id}>
                        <td>
                          <div className=" fw-medium ">{bill.customerName}</div>
                          <small className=" text-neutral-300 fw-medium d-block d-md-inline">
                            {bill.itemsCount} items • Table {bill.numberOfBookedTable}
                          </small>
                        </td>
                        <td className="p-3 text-neutral-400 ">{bill.tableNumber}</td>
                        <td className=" p-3 text-neutral-400">#{bill.orderId}</td>
                        <td>
                          <span className="badge bg-brand-50 text-brand-300 fw-medium">
                            {bill.status || "N/A"}
                          </span>
                        </td>
                        <td className="text-end pe-8">
                          <div className=" d-flex gap-1 align-items-center justify-content-end">
                            <Button variant='outline-primary' className='d-flex align-items-center justify-content-center w-36 square p-2  border-neutral-200 text-neutral-400 rounded-2 hover-text-white'
                              onClick={() => {
                                setSelectedBill(bill);
                                setShowPrint(true);
                              }}
                            >
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.6001 11.5239C5.39953 11.5491 5.1995 11.5759 5 11.6044M5.6001 11.5239C7.04131 11.3431 8.50978 11.25 10 11.25C11.4902 11.25 12.9587 11.3431 14.3999 11.5239M5.6001 11.5239L5.28409 15M14.3999 11.5239C14.6005 11.5491 14.8005 11.5759 15 11.6044M14.3999 11.5239L14.7159 15M14.7159 15L14.9071 17.1026C14.957 17.6516 14.5247 18.125 13.9734 18.125H6.02659C5.47531 18.125 5.04303 17.6516 5.09294 17.1026L5.28409 15M14.7159 15H15.625C16.6605 15 17.5 14.1605 17.5 13.125V7.87974C17.5 6.97896 16.8601 6.20068 15.9692 6.06738C15.4411 5.98837 14.9096 5.91967 14.375 5.86151M5.28409 15H4.375C3.33947 15 2.5 14.1605 2.5 13.125V7.87974C2.5 6.97896 3.13992 6.20068 4.03078 6.06738C4.55889 5.98837 5.09036 5.91967 5.625 5.86151M14.375 5.86151C12.9381 5.70521 11.4784 5.625 10 5.625C8.52156 5.625 7.06186 5.70521 5.625 5.86151M14.375 5.86151V2.8125C14.375 2.29473 13.9553 1.875 13.4375 1.875H6.5625C6.04473 1.875 5.625 2.29473 5.625 2.8125V5.86151M15 8.75H15.0063V8.75625H15V8.75ZM12.5 8.75H12.5063V8.75625H12.5V8.75Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                              </svg>
                            </Button>

                            <Button variant='outline-danger' className='d-flex align-items-center justify-content-center w-36 square p-2 border-neutral-200 text-neutral-400 hover-text-white hover-bg-error-200 rounded-2'

                              onClick={() => {
                                setSelectedBill(bill);
                                setShowDelete(true);
                              }}
                            >
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.2837 7.5L11.9952 15M8.00481 15L7.71635 7.5M16.023 4.82547C16.308 4.86851 16.592 4.91456 16.875 4.96358M16.023 4.82547L15.1332 16.3938C15.058 17.3707 14.2434 18.125 13.2637 18.125H6.73631C5.75655 18.125 4.94198 17.3707 4.86683 16.3938L3.97696 4.82547M16.023 4.82547C15.0677 4.6812 14.1013 4.57071 13.125 4.49527M3.125 4.96358C3.40798 4.91456 3.69198 4.86851 3.97696 4.82547M3.97696 4.82547C4.93231 4.6812 5.89874 4.57071 6.875 4.49527M13.125 4.49527V3.73182C13.125 2.74902 12.3661 1.92853 11.3838 1.8971C10.9244 1.8824 10.463 1.875 10 1.875C9.53696 1.875 9.07565 1.8824 8.61618 1.8971C7.63388 1.92853 6.875 2.74902 6.875 3.73182V4.49527M13.125 4.49527C12.0938 4.41558 11.0516 4.375 10 4.375C8.94836 4.375 7.9062 4.41558 6.875 4.49527" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                              </svg>

                            </Button>
                          </div>

                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center text-muted p-3">
                        No bills found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>




              <div className="d-flex flex-column flex-md-row justify-content-between align-items-center px-3 py-2 gap-2">
                <small className="text-neutral-300">
                  Page <span className="text-neutral-300">{currentPage}</span> of {totalPages}
                </small>

                <ul className="pagination mb-0 gap-2">
                  <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button
                      className="page-link rounded-circle"

                      onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                    >
                      &laquo;
                    </button>
                  </li>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <li
                      key={i}
                      className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                    >
                      <button
                        className={`page-link rounded-circle ${currentPage === i + 1 ? "text-white bg-brand-300" : ""
                          }`}

                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}

                  <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                    <button
                      className="page-link rounded-circle"

                      onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                    >
                      &raquo;
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </Col>

        {showDelete && (
          <Deletpopup
            show={showDelete}
            handleClose={() => setShowDelete(false)}
            handleConfirm={() => {
              if (selectedBill) {
                console.log("Deleted bill:", selectedBill);

              }
              setShowDelete(false);
            }}
          />
        )}

        {showPrint && (
          <PrintBillModal
            show={showPrint}
            onClose={() => setShowPrint(false)}
            onConfirm={() => {
              setShowPrint(false);
              setShowProcess(true);
            }}
            bill={selectedBill}
          />
        )}

        {showProcess && (
          <ProcessModalPopup
            show={showProcess}
            handleClose={() => setShowProcess(false)}
            onComplete={() => {
              setShowProcess(false);
              setShowSuccess(true);
            }}
          />
        )}


        {showSuccess && (
          <PrintSucesspopup
            show={showSuccess}
            handleClose={() => setShowSuccess(false)}
            bill={selectedBill}
          />
        )}
      </Row>
    </Container>
  );
};

export default Bills;

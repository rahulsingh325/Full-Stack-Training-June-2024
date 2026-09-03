import {
  Button,
  Col,
  Form,
  Image,
  InputGroup,
  Spinner,
  Table,
} from "react-bootstrap";
import ReactPaginate from "react-paginate";
import downArrow from "../../assets/image/icon/downarrow.svg";
import { useEffect, useState } from "react";
import { getReports } from "../../services/reports";
import toast, { Toaster } from "react-hot-toast";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";

const Reports = () => {
  const limit = 9;
  const [totalPage, setTotalPage] = useState(0);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const handlePageClick = async (e) => {
    setLoading(true);
    const response = await getReports({ limit, skip: e.selected });
    if (response.success) {
      setReports(response.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await getReports({ limit });
      if (response.success) {
        setTotalPage(Math.ceil(response.total / limit));
        setReports(response.data);
        setLoading(false);
      } else {
        toast.error(response.message);
        setLoading(false);
      }
    })();
  }, []);

  const handleDownload = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(16);
    doc.text("Reports", 14, 15);

    // Table columns
    const headers = [["Date/Time", "Payment Method", "Total Collected"]];

    // Table rows (data)
    const data = reports.map((item) => {
      const data = [item.date, item.paymentMethod, item.totalCollection];
      return data;
    });

    // AutoTable
    autoTable(doc, {
      startY: 25,
      head: headers,
      body: data,
      theme: "grid",
      styles: { halign: "center" },
      headStyles: { fillColor: [22, 160, 133] }, // teal header
    });

    // Save file
    doc.save("Report.pdf");
  };

  return (
    <div className="p-lg-8 p-4 h-100 overflow-auto hide-scrollbar">
      <div className="d-flex flex-column flex-md-row align-items-lg-center mb-8">
        <Col lg={4}>
          <h4 className="fs-h4 fw-semibold text-neutral  text-center text-lg-start">
            Report
          </h4>
        </Col>
        <div className="d-flex flex-grow-1">
          <InputGroup className="px-3 ms-md-auto">
            <InputGroup.Text className="text-neutral-400 py-3 border-end-0 bg-white">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.58268 17.4998C13.9549 17.4998 17.4993 13.9554 17.4993 9.58317C17.4993 5.21092 13.9549 1.6665 9.58268 1.6665C5.21043 1.6665 1.66602 5.21092 1.66602 9.58317C1.66602 13.9554 5.21043 17.4998 9.58268 17.4998Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.3327 18.3332L16.666 16.6665"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </InputGroup.Text>
            <Form.Control
              placeholder="Search"
              className="border-start-0 py-3 bg-white"
            />
          </InputGroup>
          <Button
            onClick={handleDownload}
            className="d-inline-flex align-items-center border-0 ms-5 gap-2 p-3 rounded-pill bg-brand-50 text-brand-300 fw-medium fs-title"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 16.5V18.75C3 19.9926 4.00736 21 5.25 21H18.75C19.9926 21 21 19.9926 21 18.75V16.5M16.5 12L12 16.5M12 16.5L7.5 12M12 16.5V3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="d-none d-sm-inline">Download</span>
          </Button>
        </div>
      </div>
      <div className="border rounded-3  w-100 table-responsive">
        <div className="d-flex justify-content-between bg-white rounded-3 align-items-center p-3">
          <h5 className="fs-h5 fw-semibold text-black">Report</h5>
          <Form.Select className="w-auto">
            <option value="Daily">Daily</option>
          </Form.Select>
        </div>

        <Table borderless hover>
          <thead className="border-top bg-primary">
            <tr className="table-light">
              <th className="text-neutral-600 fw-medium py-xl-5 ps-5 text-nowrap">
                <div className="d-flex align-items-center gap-2">
                  <span>Date/Time</span>
                  <div className="d-flex flex-column gap-1">
                    <Image src={downArrow} alt="" className="rotate-180" />
                    <Image src={downArrow} alt="" />
                  </div>
                </div>
              </th>
              <th className="text-neutral-600 fw-medium py-xl-5 text-nowrap">
                Payment method
              </th>
              <th className="text-neutral-600 fw-medium py-xxl-5 pe-5 text-end text-nowrap">
                Total collected
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3}>
                  <div className="d-flex justify-content-center w-100 p-8 align-items-center gap-5">
                    <Spinner animation="border" size="" />{" "}
                    <span>Loading...</span>
                  </div>
                </td>
              </tr>
            ) : reports.length ? (
              <>
                {reports.map((row, idx) => (
                  <tr key={idx} className="border-top">
                    <td className="ps-5 py-5 text-nowrap">{row.date}</td>
                    <td className="py-5 text-nowrap">{row.paymentMethod}</td>
                    <td className="fs-title  py-5 fw-medium text-brand-300 text-end pe-5 text-nowrap">
                      ${row.totalCollection}
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td colSpan={3}>
                  <div className="d-flex justify-content-center w-100 p-8 align-items-center gap-5">
                    No record found.
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <div className="d-flex justify-content-center justify-content-md-end border-top p-3">
          <ReactPaginate
            previousLabel="«"
            nextLabel="»"
            pageCount={totalPage}
            onPageChange={handlePageClick}
            containerClassName="pagination gap-2 align-items-center mb-0"
            pageClassName=""
            pageLinkClassName="page-link rounded-pill w-34 h-34 d-flex align-items-center justify-content-center"
            previousClassName="page-item rounded-pill"
            previousLinkClassName="page-link d-flex h-34 w-34 rounded-pill align-items-center justify-content-center"
            nextClassName="page-item rounded-pill"
            nextLinkClassName="page-link h-34 w-34 rounded-pill d-flex align-items-center justify-content-center       "
            activeClassName="active"
            pageRangeDisplayed={3} // shows 3 page numbers
            marginPagesDisplayed={0} // pages at the start/end (set 0 to hide)
          />
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default Reports;

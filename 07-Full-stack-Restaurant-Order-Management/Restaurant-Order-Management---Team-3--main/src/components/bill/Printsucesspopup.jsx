import React, { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import successIcon from "../../assets/image/icon/sucessfull.svg";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const PrintSuccessPopup = ({ show, handleClose, reports }) => {
  
  const handleDownload = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Reports", 14, 15);

    const headers = [["Date/Time", "Payment Method", "Total Collected"]];

    const data = Array.isArray(reports)
      ? reports.map((item) => [
        item.date,
        item.paymentMethod,
        item.totalCollection,
      ])
      : [];

    autoTable(doc, {
      startY: 25,
      head: headers,
      body: data,
      theme: "grid",
      styles: { halign: "center" },
      headStyles: { fillColor: [22, 160, 133] },
    });
    
    doc.save("Bill.pdf");
  };


  useEffect(() => {
    if (show) {
      handleDownload();
    }
  }, [show]);

  return (
    <Modal show={show} onHide={handleClose} centered dialogClassName="custom-modal">
      <Modal.Body className="text-center p-8">
        <div className="d-flex align-items-center justify-content-center gap-8 mb-8 mt-6">
          <div className="bg-brand-50 rounded-circle p-4">
            <img src={successIcon} alt="success" width={40} height={40} />
          </div>
          <h3 className="fw-semibold text-neutral-700">Bill Printed Successfully!</h3>
        </div>

        <p className="text-neutral-400 text-start pb-6 fw-medium">
          Your document has been successfully printed. Thank you for using our printing services.
        </p>

        <div className="d-flex justify-content-center mt-2 mb-2">
          <Button variant="primary" onClick={handleClose} className="w-100 rounded-pill">
            Back to history
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PrintSuccessPopup;

import React, { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import PrintBillModal from "./Printbillmodal";
import ProcessModalPopup from "./Processmodalpopup";
import PrintSuccessPopup from "./Printsucesspopup";

// Dummy data to simulate report
const reports = [
  { date: "2025-10-08", paymentMethod: "Credit Card", totalCollection: "$120.00" },
  { date: "2025-10-09", paymentMethod: "Cash", totalCollection: "$80.00" },
];

const PrintFlowContainer = () => {
  const [showBillModal, setShowBillModal] = useState(true);
  const [showProcessModal, setShowProcessModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleConfirmPrint = () => {
    setShowBillModal(false);
    setShowProcessModal(true);
  };

  const handleProcessComplete = () => {
    setShowProcessModal(false);
    setShowSuccessModal(true);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Reports", 14, 15);

    const headers = [["Date/Time", "Payment Method", "Total Collected"]];
    const data = reports.map(item => [
      item.date,
      item.paymentMethod,
      item.totalCollection,
    ]);

    autoTable(doc, {
      startY: 25,
      head: headers,
      body: data,
      theme: "grid",
      styles: { halign: "center" },
      headStyles: { fillColor: [22, 160, 133] },
    });

    doc.save("Report.pdf");
  };

  return (
    <>
      <PrintBillModal
        show={showBillModal}
        onClose={() => setShowBillModal(false)}
        onConfirm={handleConfirmPrint}
      />

      <ProcessModalPopup
        show={showProcessModal}
        handleClose={() => setShowProcessModal(false)}
        onComplete={handleProcessComplete}
      />

      <PrintSuccessPopup
        show={showSuccessModal}
        handleClose={() => setShowSuccessModal(false)}
        onDownload={handleDownloadPDF}
      />
    </>
  );
};

export default PrintFlowContainer;

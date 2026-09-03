import React from "react";
import { Badge } from "react-bootstrap";
import "../../assets/scss/modules/_orders.scss";

// Individual label components
const WaitingLabel = () => (
  <Badge pill className="bg-warning-50 text-warning-500 d-inline-flex align-items-center justify-content-center fw-medium py-3 px-3 rounded-pill text-capitalize text-nowrap">
    Waiting
  </Badge>
);

const CanceledLabel = () => (
  <Badge pill className="bg-error-50 text-error-500 d-inline-flex align-items-center justify-content-center fw-medium py-3 px-3 rounded-pill text-capitalize text-nowrap">
    Canceled
  </Badge>
);

const CompletedLabel = () => (
  <Badge pill className="bg-brand-50 text-brand-500 d-inline-flex align-items-center justify-content-center fw-medium py-3 px-3 rounded-pill text-capitalize text-nowrap">
    Completed
  </Badge>
);

const ReadyToServeLabel = () => (
  <Badge pill className="bg-success-50 text-success-500 d-inline-flex align-items-center justify-content-center fw-medium py-3 px-3 rounded-pill text-capitalize text-nowrap">
    Ready to Serve
  </Badge>
);

// Mapping status → component
const statusComponents = {
  waiting: WaitingLabel,
  canceled: CanceledLabel,
  completed: CompletedLabel,
  "ready to serve": ReadyToServeLabel, // ✅ Fixed key
};

const OrderLabel = ({ status }) => {
  const normalizedStatus = status?.toLowerCase();
  const LabelComponent = statusComponents[normalizedStatus];

  return LabelComponent ? (
    <LabelComponent />
  ) : (
    <Badge pill className="bg-secondary d-inline-flex align-items-center justify-content-center fw-medium py-3 px-3 rounded-pill text-capitalize text-nowrap">
      {status}
    </Badge>
  );
};

export default OrderLabel;

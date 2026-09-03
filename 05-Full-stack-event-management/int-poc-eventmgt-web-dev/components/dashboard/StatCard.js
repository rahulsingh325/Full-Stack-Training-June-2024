import { Card } from "react-bootstrap";

export default function StatCard({ title, value, icon: Icon }) {
  return (
    <Card className="border-0 shadow-sm rounded-4 p-3 h-100">
      <div className="d-flex flex-column flex-md-row align-items-center align-items-md-center text-center text-md-start gap-2 gap-md-3">

        {/* ICON */}
        <div className="icon-circle bg-primary-100 text-grey-10 d-flex align-items-center justify-content-center mb-1 mb-md-0">
          {Icon && <Icon size={16} />}
        </div>

        {/* TEXT */}
        <div className="flex-grow-1">
          <small className="text-grey-30 d-block">{title}</small>
          <h5 className="fw-bold mb-0 text-secondary-100">
            {value ?? 0}
          </h5>
        </div>

      </div>
    </Card>
  );
}

import React from 'react';
import PropTypes from 'prop-types';
import "../../assets/scss/modules/_dashboard.scss";
import OrdersData from '../../data/dashbord/OrdersData';

const statusStyles = {
    completed: 'bg-brand-50 text-primary',
    waiting: 'bg-warning-50 text-warning',
    canceled: 'bg-error-50 text-danger',
    'ready to serve': 'bg-success-50 text-success',
};

const capitalizeStatus = (status) => {
    if (!status) return "";
    if (status.toLowerCase() === "ready to serve") return "Ready to Serve";
    return status.charAt(0).toUpperCase() + status.slice(1);
};

const OrderCard = ({ customer, table, status, items, id }) => {
    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
    const displayStatus = capitalizeStatus(status);

    return (
        <div
            className="order-card shadow-sm p-4 rounded bg-white me-3 mb-3"
            style={{ minWidth: 200, maxWidth: 220 }}
        >
            <div className="d-flex justify-content-between align-items-center mb-1">
                <div className="fw-semibold text-dark fs-6">{customer}</div>
                <div className="text-muted fs-caption">#{id}</div>
            </div>

            <div className="text-muted fs-caption mb-3">
                {totalItems} Items <span className="mx-1">•</span> Table {table}
            </div>

            <span
                className={`badge rounded-pill px-3 py-1 fw-medium fs-caption ${statusStyles[status.toLowerCase()] || 'bg-light text-muted'
                    }`}
            >
                {displayStatus}
            </span>
        </div>
    );
};

OrderCard.propTypes = {
    customer: PropTypes.string.isRequired,
    table: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    id: PropTypes.number.isRequired,
};

export default OrderCard;

/**
 * OrdersRail: self-contained list that reads OrdersData and renders OrderCard(s).
 * Import and render <OrdersRail /> in the dashboard rail area.
 */
export const OrdersDetail = () => {
    return (
        <>
            {OrdersData.map((order) => (
                <OrderCard
                    key={order.id}
                    id={order.id}
                    customer={order.customer}
                    table={order.table}
                    status={order.status}
                    items={order.items}
                />
            ))}
        </>
    );
};

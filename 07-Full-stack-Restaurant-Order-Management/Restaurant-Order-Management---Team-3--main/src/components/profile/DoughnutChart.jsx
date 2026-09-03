import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({chartData}) => {

    
  const data = {
    // labels: ["Main Course", "Beverage", "Others"],
    labels: chartData?.map(d => d.category),
    datasets: [
      {
        // data: [8000, 5000, 2490], // Example values
        data: chartData?.map(d => d.incomeValue) ,
        backgroundColor: ["#0052CC", "#1A75FF", "#80B3FF"],
        borderWidth: 0,
        cutout: "70%", // Makes donut shape
      },
    ],
  };

  const options = {
    plugins: {
        legend: {
            display: false, // Hide default legend
        },
        tooltip: {
            enabled: false,
        },
    },
  };

  return (
    <div className="d-flex align-items-center justify-content-between flex-column flex-sm-row flex-lg-column flex-xl-row row-gap-3">
        {/* Legend Section */}
        <div className="me-4 order-1 order-sm-0 order-lg-1 order-xl-0 d-flex flex-column align-items-lg-center align-items-xl-start">
            <div className="d-flex align-items-center mb-2">
                <div>
                    <div className="rounded-circle me-2 w-14 p-1 square d-flex align-items-center bg-brand-500 justify-content-center">
                        <span className="rounded-circle bg-white d-inline-block w-100 h-100"></span>
                    </div>
                </div>
                <span className="fs-title text-neutral-700">Main Course</span>
            </div>
            <div className="d-flex align-items-center mb-2">
                <div>
                    <div className="rounded-circle me-2 w-14 p-1 square d-flex align-items-center bg-brand-300 justify-content-center">
                        <span className="rounded-circle bg-white d-inline-block w-100 h-100"></span>
                    </div>
                </div>
                <span className="fs-title text-neutral-700">Beverage</span>
            </div>
            <div className="d-flex align-items-center mb-2">
                <div>
                    <div className="rounded-circle me-2 w-14 p-1 square d-flex align-items-center bg-brand-75 justify-content-center">
                        <span className="rounded-circle bg-white d-inline-block w-100 h-100"></span>
                    </div>
                </div>
                <span className="fs-title text-neutral-700">Others</span>
            </div>
        </div>

        {/* Chart Section */}
        <div className="position-relative w-146 square">
            <Doughnut data={data} options={options} />
            <div className="position-absolute top-50 start-50 translate-middle text-center text-neutral-700 fw-medium fs-h5">
                <div className="text-neutral-400 fs-caption">Total</div>
                <div>${chartData.reduce((acc, d) => acc + d.incomeValue, 0)}</div>
            </div>
        </div>
    </div>
  );
};

export default DoughnutChart;

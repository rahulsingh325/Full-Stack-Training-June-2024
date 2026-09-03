import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Filler);

const LineChart = ({chartData=[]}) => {
  const data = {
    labels: Object.keys(chartData).slice(0,6),
    datasets: [
      {
        label: "Revenue",
        data: Object.values(chartData).slice(0,6), // Example values
        borderColor: "#1A75FF",
        borderWidth: 2,
        tension: 0.4, // smooth curve
        borderCapStyle: "round",
        borderJoinStyle: "round",
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
        //   const gradient = ctx.createLinearGradient(0, 0, 0, context.chart.height);
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, "rgba(26, 117, 255, 0.4)");
          gradient.addColorStop(1, "rgba(26, 117, 255, 0)");
          return gradient;
        },
        pointBackgroundColor: "#fff",
        pointBorderColor: "#1A75FF",
        pointBorderWidth: 3,
        pointRadius: 0,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#2E3347",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 10,
        displayColors: false,
        callbacks: {
          label: function (context) {
            return `$${context.raw.toFixed(2)}   ↑ 16.2%`; // Customize tooltip text
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          drawOnChartArea: false,
          color: "rgba(200,200,200,0.2)",
        },
      },
      y: {
        ticks: {
          stepSize: 500,
        },
        grid: {
          color: "rgba(200,200,200,0.2)",
        },
      },
    },
  };

  const hoverLinePlugin = {
    id: "hoverLine",
    afterDraw: (chart) => {
      if (chart.tooltip?._active?.length) {
        const ctx = chart.ctx;
        const activePoint = chart.tooltip._active[0].element;

        ctx.save();

        // Draw dashed vertical line
        ctx.beginPath();
        ctx.setLineDash([5, 5]);
        ctx.moveTo(activePoint.x, chart.chartArea.top);
        ctx.lineTo(activePoint.x, chart.chartArea.bottom);
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "#8B5CF6"; // purple dashed line
        ctx.stroke();
        ctx.restore();

        // Draw top pointer circle
        ctx.beginPath();
        ctx.arc(activePoint.x, activePoint.y, 6, 0, 2 * Math.PI, false);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#1A75FF";
        ctx.stroke();
        ctx.restore();
      }
    },
  };

  return (
    <div>
      <Line data={data} options={options} height={120}  plugins={[hoverLinePlugin]} />
    </div>
  );
};

export default LineChart;

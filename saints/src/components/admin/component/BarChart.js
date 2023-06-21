import React from "react";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
Chart.register(CategoryScale);

export default function BarChart({data}) {
  const options = {
    title: {
      display: true,
      text: "Bar Chart",
    },
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
            max: 1400,
            stepSize: 200,
          },
        },
      ],
    },
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: "550px", height: "550px", margin: "20px", border: "0px solid gray", borderRadius: "15px", boxShadow: "0 5px 10px 0 rgba(31, 38, 135, 0.37)" }}>
      <Bar data={data.bar} options={options} />
    </div>
  );
}


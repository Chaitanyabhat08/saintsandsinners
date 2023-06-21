import React from "react";
import { Doughnut } from "react-chartjs-2";
import { data } from "./DoughnutData";
export default function DoughnutChart() {
  //using data of bar chart
  const options = {
    title: {
      display: true,
      text: "Product Sale Category Wise",
    },
    legend: {
      display: true,
      position: "top",
    },
    maintainAspectRatio: false,
  };
  return (
    <div>
      <Doughnut data={data.bar} options={options} style={{
        width: "550px", height: "550px", margin: "20px", border: "0px solid gray", borderRadius: "15px", boxShadow: "0 5px 10px 0 rgba(31, 38, 135, 0.37)"
    }} />
    </div>
  );
}

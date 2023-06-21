export const data = {
  bar: {
    title: "Product Sale Category Wise",
    labels: ["WTshirts", "WSweatshirts", "WKurtis", "MSweatshirts", "MShirts", "MTshirts", "MPants"],
    datasets: [
      {
        label: "Products sale per month",
        data: [15,25,30,18,19,21,30],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
      },
    ],
  },

  line: {
    labels: ["WTshirts", "WSweatshirts", "WKurtis", "MSweatshirts", "MShirts", "MTshirts", "MPants"],
    datasets: [
      {
        label: "",
        data: [15, 25, 30, 18, 19, 21, 30],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  },
};

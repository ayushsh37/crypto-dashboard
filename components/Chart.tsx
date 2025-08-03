"use client";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface PriceChartProps {
  data: number[][];
}

export default function PriceChart({ data }: PriceChartProps) {
  const chartData = {
    labels: data.map((d) => new Date(d[0]).toLocaleDateString()),
    datasets: [
      {
        label: "Price (USD)",
        data: data.map((d) => d[1]),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return <Line data={chartData} />;
}

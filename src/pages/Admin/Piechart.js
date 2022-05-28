import "./Charts.css";
import React from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

export default function PieCharts({ title, data, dataKey }) {
  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <PieChart width={400} height={300}>
          <Pie data={data} dataKey={dataKey} cx="50%" cy="50%" outerRadius={60} fill="#8884d8" />
          <Pie data={data} dataKey={dataKey} cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label />
          <Tooltip />
        </PieChart>
</ResponsiveContainer>
    </div>
  );
}

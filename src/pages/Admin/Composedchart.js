import "./Charts.css";
import React from "react";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// const data = [
//   {
//     name: "Product A",

//     pv: 800,
//     amt: 1400,
//   },
//   {
//     name: "Product B",

//     pv: 967,
//     amt: 1506,
//   },
//   {
//     name: "Product C",

//     pv: 1098,
//     amt: 989,
//   },
//   {
//     name: "Product D",

//     pv: 1200,
//     amt: 1228,
//   },
//   {
//     name: "Product E",

//     pv: 1108,
//     amt: 1100,
//   },
//   {
//     name: "Product F",

//     pv: 680,
//     amt: 1700,
//   },
// ];

export default function ComCharts({ title, data, dataKey, nameKey }) {
  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <BarChart
          width={500}
          height={500}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={nameKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={dataKey} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

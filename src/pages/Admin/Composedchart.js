import "./Charts.css";
import React from "react";
import { Area, Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
    {
      name: "Product A",
      uv: 590,
      pv: 800,
      amt: 1400
    },
    {
      name: "Product B",
      uv: 868,
      pv: 967,
      amt: 1506
    },
    {
      name: "Product C",
      uv: 1397,
      pv: 1098,
      amt: 989
    },
    {
      name: "Product D",
      uv: 1480,
      pv: 1200,
      amt: 1228
    },
    {
      name: "Product E",
      uv: 1520,
      pv: 1108,
      amt: 1100
    },
    {
      name: "Product F",
      uv: 1400,
      pv: 680,
      amt: 1700
    }
  ];

export default function ComCharts({ title,
    // dataKey1 , dataKey2 , dataKey3, dataKey4
}) {
  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
      <ComposedChart
          width={800}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" scale="band" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" barSize={20} fill="#413ea0" />
        </ComposedChart>
</ResponsiveContainer>
    </div>
  );
}

import "./Charts.css";
import React from "react";
import { Area, Bar, CartesianGrid, ComposedChart, Legend, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// export default function ComCharts({
//   title,
//   data,
//   dataKey,
//   nameKey,
//   // dataKey1 , dataKey2 , dataKey3, dataKey4
// }) {
//   return (
//     <div className="chart">
//       <h3 className="chartTitle">{title}</h3>
//       <ResponsiveContainer width="100%" aspect={4 / 1}>
//         <ComposedChart
//           width={800}
//           height={400}
//           data={data}
//           margin={{
//             top: 20,
//             right: 20,
//             bottom: 20,
//             left: 20,
//           }}
//         >
//           <CartesianGrid stroke="#f5f5f5" />
//           {/* <XAxis dataKey="name" scale="band" /> */}
//           <XAxis dataKey="name" scale="band" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey={dataKey} barSize={20} fill="#413ea0" />
//           {/* <Bar dataKey="pv" barSize={20} fill="#413ea0" /> */}
//         </ComposedChart>
//       </ResponsiveContainer>
//     </div>
//   );

export default function ComCharts({ title,data,dataKey,dataname}) {
  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataname={dataname} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={dataKey} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

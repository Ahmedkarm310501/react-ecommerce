import "./Chartpage.css";
import Chart from "./Charts";
import PieCharts from "./Piechart";
import "./Home.css";
import { productRows, userData } from "./dummyData";
import { Outlet } from "react-router-dom";
import ComCharts from "./Composedchart";

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
export default function Allcharts() {
  return (
    <div>
      <Chart
        data={userData}
        title="User Analytics"
        grid
        dataKey="Active User"
      />
      <PieCharts 
      title="User Status Analytics"
      data={userData}
      dataKey="Active User"
      />
      <ComCharts
      title="product Status Analytics"
      data={data}
       dataKey="pv"
       dataname="name"
      />
      
      <Outlet />
    </div>
  );
}

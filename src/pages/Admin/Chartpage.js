import "./Chartpage.css";
import Chart from "./Charts";
import PieCharts from "./Piechart";
import "./Home.css";
import { productRows, userData } from "./dummyData";
import { Outlet } from "react-router-dom";
import ComCharts from "./Composedchart";
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
    //   data={productRows}
    //   dataKey="Active User"
      />
      <Outlet />
    </div>
  );
}

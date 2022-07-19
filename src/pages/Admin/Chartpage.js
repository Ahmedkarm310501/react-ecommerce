import "./Chartpage.css";
import Chart from "./Charts";
import PieCharts from "./Piechart";
import "./Home.css";
import { useState, useContext, useEffect } from "react";
import { productRows, userData } from "./dummyData";
import { Outlet } from "react-router-dom";
import ComCharts from "./Composedchart";
import { AuthContext } from "../../store/auth-context";

export default function Allcharts() {
  const [userDataa, setUserData] = useState([]);
  const [userStatus, setUserStatus] = useState([]);
  const [productsSales, setProductsSales] = useState([]);
  const AuthCtx = useContext(AuthContext);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/get_charts", {
      method: "POST",
      body: JSON.stringify({
        token: AuthCtx.token,
      }), 
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        console.log("success");
        res.json().then((data) => {
          if (data.status == 200) {
            console.log(data);
            let newArrayDataOfOjbect = Object.values(data.chart_one);
            newArrayDataOfOjbect.forEach((element) => {
              element.total_price = Number(element.total_price);
            });
            setUserData(newArrayDataOfOjbect);
            setUserStatus(data.chart_two);
            let newArrayDataOfOjbect2 = Object.values(data.chart_three);
            newArrayDataOfOjbect2.forEach((element) => {
              element.NumberOfProductsSales = Number(
                element.NumberOfProductsSales
              );
            });
            let newArrayDataOfOjbect3 = newArrayDataOfOjbect2.filter(
              (element) => element.NumberOfProductsSales !== 0
            );
            setProductsSales(newArrayDataOfOjbect3);
            // console.log(typeof data.chart_three[0].NumberOfProductsSales);
            //setAdd(data.addresses);
          } else {
            console.log("wrong");
          }
        });
      } else {
        res.json().then((data) => {
          console.log(data);
        });
      }
    });
  }, []);

  return (
    <div>
      <Chart
        data={userDataa}
        title="User Analytics"
        grid
        dataKey="total_price"
      />
      <PieCharts
        title="User Status Analytics"
        data={userStatus}
        dataKey="numberOfActiveUsers"
        nameKey="name"
      />
      <ComCharts
        title="product Status Analytics"
        data={productsSales}
        nameKey="name"
        dataKey="NumberOfProductsSales"
      />
    </div>
  );
}

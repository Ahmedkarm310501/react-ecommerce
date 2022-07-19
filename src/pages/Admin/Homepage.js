import Chart from "./Charts";
import FeaturedInfo from "./featuredInfo/FeaturedInfo";
import "./Home.css";
import { userData } from "./dummyData";
import WidgetSm from "./widgetSm/WidgetSm";
import WidgetLg from "./widgetLg/WidgetLg";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../store/auth-context";

export default function Homepage() {
  const AuthCtx = useContext(AuthContext);
  const [pendingPrice, setPendingPrice] = useState(0);
  const [confirmedPrice, setConfirmedPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [lastOrders, setLastOrders] = useState([]);
  const [lastUsers, setLastUsers] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/admin/dashboard", {
      headers: {
        Authorization: AuthCtx.token,
      },
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            console.log(data);
            setPendingPrice(data.pendingPrice);
            setConfirmedPrice(data.confirmedPrice);
            setTotalPrice(data.totalPrice);
            setLastOrders(data.lastOrders);
            setLastUsers(data.lastUsers);
          });
        } else {
          console.log("error");
          res.json().then((data) => {
            console.log(data);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="home m-5">
      <FeaturedInfo
        pendingPrice={pendingPrice}
        confirmedPrice={confirmedPrice}
        totalPrice={totalPrice}
      />
      <div className="homeWidgets">
        <WidgetSm lastUsers={lastUsers}/>
        <WidgetLg lastOrders={lastOrders}/>
      </div>
    </div>
  );
}

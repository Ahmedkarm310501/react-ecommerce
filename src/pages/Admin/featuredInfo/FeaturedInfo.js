import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../store/auth-context";
export default function FeaturedInfo(props) {
  const AuthCtx = useContext(AuthContext);
  // const[total_pending,settotal_pending] = useState(null)
  // const[total_sales,settotal_sales] = useState(null)
  // const[total,settotal] = useState(null)
  // useEffect(()=>{
  //   fetch("http://127.0.0.1:8000/api/get_statistics", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       token:AuthCtx.token
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }).then((res) => {
  //     if (res.ok) {
  //       console.log("success");
  //       res.json().then((data) => {
  //         if (data.status == 200) {
  //           settotal_pending(data.total_pending)
  //           settotal_sales(data.total_sales)
  //           settotal(data.total)
  //         }

  //       });
  //     } else {
  //       res.json().then((data) => {
  //         console.log(data);
  //       });
  //     }
  //   });

  // },[])

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Pending</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${props.pendingPrice}</span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${props.confirmedPrice}</span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Total Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${props.totalPrice}</span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}

import "./widgetLg.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../store/auth-context";
export default function WidgetLg() {
  const AuthCtx = useContext(AuthContext);
  const [add, setAdd] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/get-newOrders", {
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
            // console.log(data.newusers);
            setAdd(data.orders_array);
          }
        });
      } else {
        res.json().then((data) => {
          console.log(data);
        });
      }
    });
  }, []);
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {add.map((order) => {
          return (
            <tr className="widgetLgTr">
              <td className="widgetLgUser">
                <img
                  src={`http://localhost:8000/${order.user_photo}`}
                  alt=""
                  className="widgetLgImg"
                />
                <span className="widgetLgName">{order.name}</span>
              </td>
              <td className="widgetLgDate">{order.date}</td>
              <td className="widgetLgAmount">EGP {+order.total_price}</td>
              <td className="widgetLgStatus">
                {order.status == 1 ? (
                  <Button type="Confirmed" />
                ) : (
                  <Button type="Pending" />
                )}
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

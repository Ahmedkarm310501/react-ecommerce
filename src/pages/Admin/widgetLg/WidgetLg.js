import "./widgetLg.css";
// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../../store/auth-context";
export default function WidgetLg() {
  // const AuthCtx = useContext(AuthContext);
  // const [add, setAdd] = useState([]);

  // useEffect(() => {
  //   fetch("http://127.0.0.1:8000/api/get-newOrders", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       token: AuthCtx.token,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }).then((res) => {
  //     if (res.ok) {
  //       console.log("success");
  //       res.json().then((data) => {
  //         if (data.status == 200) {
  //           console.log(data.newusers);
  //           setAdd(data.newusers);
  //         }
  //       });
  //     } else {
  //       res.json().then((data) => {
  //         console.log(data);
  //       });
  //     }
  //   });
  // }, []);
  // const Button = ({ type }) => {
  //   return <button className={"widgetLgButton " + type}>{type}</button>;
  // };
  return (
    
      
        <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
          {/* {add.map((newusers) => {
            return (
            <table className="widgetLgTable">
              <tr className="widgetLgTr">
                <th className="widgetLgTh">Customer</th>
                <th className="widgetLgTh">Date</th>
                <th className="widgetLgTh">Total price</th>
                <th className="widgetLgTh">Status</th>
              </tr>
                <tr className="widgetLgTr">
              <td className="widgetLgUser">
                <span className="widgetLgName">{newusers.user_id}</span>
              </td>
              <td className="widgetLgDate">{newusers.status}</td>
              <td className="widgetLgAmount">${newusers.total_price}</td>
              <td className="widgetLgStatus">
                <Button type={newusers.status == 1 ? "Approved" : "Declined"} />
              </td>
            </tr>
      </table>
            );
          })} */}
</div>
     
  );
}

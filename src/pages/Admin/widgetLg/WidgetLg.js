import "./widgetLg.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../store/auth-context";
export default function WidgetLg(props) {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <thead>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Customer</th>
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh">Status</th>
          </tr>
        </thead>
        <tbody>
          {props.lastOrders.map((order, index) => {
            return (
              <tr className="widgetLgTr" key={index}>
                <td className="widgetLgUser">
                  <img
                    src={`http://localhost:8000/${order.user.photo}`}
                    alt=""
                    className="widgetLgImg"
                  />
                  <span className="widgetLgName">{order.name}</span>
                </td>
                <td className="widgetLgDate">{order.createdAt}</td>
                <td className="widgetLgAmount">EGP {+order.totalPrice}</td>
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
        </tbody>
      </table>
    </div>
  );
}

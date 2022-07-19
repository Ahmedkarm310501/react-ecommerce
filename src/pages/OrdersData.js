import React, { Fragment, useState, useContext, useEffect } from "react";
import { AuthContext } from "../store/auth-context";

const OrdersData = () => {
  const [orders, setOrders] = useState([]);
  const AuthCtx = useContext(AuthContext);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/user//get-orders", {
      headers: {
        Authorization: AuthCtx.token,
      },
    }).then((res) => {
      if (res.ok) {
        console.log("success");
        res.json().then((data) => {
          if (res.status == 200) {
            console.log(data);
            setOrders(data.orders);
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
    <Fragment>
      <div className="page-haeder  col-12 text-white mt-5">
        <h1>Orders</h1>
        <p>Manage your Orders, view your previous orders</p>
      </div>
      <div className="orders col-12 bg-white mb-5">
        <table className="table table-hover table-bordered text-center  ">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Order ID</th>
              <th scope="col">Order Status</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              return (
                <tr key={index} className="">
                  <td className="d-flex align-items-center justify-content-evenly">
                    <div className="image">
                      <img
                        src={`http://localhost:8000/${order.productPhoto}`}
                        height="100px"
                        alt=""
                      />
                    </div>
                    <p>{order.productName}</p>
                  </td>
                  <td className="">
                    <p>{order.orderId}</p>
                  </td>
                  <td className="">
                    <p>{order.orderStatus == 0 ? "Pending" : "Completed"}</p>
                  </td>
                  <td className="">
                    <p>{order.productQuantity}</p>
                  </td>
                  <td className="">
                    <p>{order.productPrice}</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default OrdersData;

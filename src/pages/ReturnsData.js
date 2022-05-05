import React from "react";
import { Fragment } from "react";
const orders = [
  {
    image:
      "https://eg.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/06/375812/1.jpg?4079",
    id: 1,
    name: "product 1",
    shippedDate: "2/1/2022",
    returnedDate: "5/1/2022",
    price: 50,
  },
  {
    image:
      "https://eg.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/77/375812/1.jpg?4701",
    id: 2,
    name: "product 2",
    shippedDate: "2/1/2022",
    returnedDate: "5/1/2022",
    price: 75,
  },
  {
    image:
      "https://eg.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/87/322481/1.jpg?9812",
    id: 3,
    name: "product 3",
    shippedDate: "2/1/2022",
    returnedDate: "5/1/2022",
    price: 500,
  },
  {
    image:
      "https://eg.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/18/243212/1.jpg?8604",
    id: 4,
    name: "product 4",
    shippedDate: "2/1/2022",
    returnedDate: "5/1/2022",
    price: 48,
  },
];
const ReturnsData = () => {
  return (
    <Fragment>
      <div>
        <div className="page-haeder  col-12 ">
          <h1>Returns</h1>
          <p>Show all your returned orders, and it's status</p>
        </div>
      </div>
      <div className="orders col-12 bg-white mb-5">
        <table className="table table-hover table-bordered text-center  ">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Order ID</th>
              <th scope="col">Shipped Date</th>
              <th scope="col">Returned Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <tr key={order.id} className="">
                  <td className="d-flex align-items-center justify-content-evenly">
                    <div className="image">
                      <img src={order.image} height="100px" alt="" />
                    </div>
                    <p>{order.name}</p>
                  </td>

                  <td className="">
                    <p className="">$ {order.price}</p>
                  </td>
                  <td className="">
                    <p>{order.id}</p>
                  </td>
                  <td className="">
                    <p>{order.shippedDate}</p>
                  </td>
                  <td className="">
                    <p>{order.returnedDate}</p>
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

export default ReturnsData;

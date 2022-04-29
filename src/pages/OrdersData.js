import React, { Fragment } from "react";
const orders = [
  {
    image:
      "https://eg.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/06/375812/1.jpg?4079",
    id: 1,
    name: "product 1",
    status: "Shipped",
    price: 50,
  },
  {
    image:
      "https://eg.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/77/375812/1.jpg?4701",
    id: 2,
    name: "product 2",
    status: "Shipped",
    price: 75,
  },
  {
    image:
      "https://eg.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/87/322481/1.jpg?9812",
    id: 3,
    name: "product 3",
    status: "Shipped",
    price: 500,
  },
  {
    image:
      "https://eg.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/18/243212/1.jpg?8604",
    id: 4,
    name: "product 4",
    status: "Shipped",
    price: 48,
  },
  {
    id: 5,
    name: "product 5",
    status: "Shipped",
    price: 50,
    image:
      "https://eg.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/40/391651/1.jpg?5204",
  },
  {
    id: 6,
    name: "product 6",
    status: "Shipped",
    price: 50,
    image:
      "https://eg.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/74/792102/1.jpg?8947",
  },
];
const OrdersData = () => {
  return (
    <Fragment>
      <div className="page-haeder  col-12 ">
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
              <th scope="col">Prrice</th>
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
                    <p>{order.id}</p>
                  </td>
                  <td className="">
                    <p>{order.status}</p>
                  </td>
                  <td className="">
                    <p>{order.price}</p>
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

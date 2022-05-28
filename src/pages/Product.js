import React, { useState, useEffect } from "react";
import Ads from "../components/layout/Ads";
import Products from "./Products";
import classes from "../components/layout/Cart.module.css";
const listProducts = [
  {
    id: 1,
    brand: "realme",

    name: "9i Dual SIM 4GB RAM 128G ROM 4G LTE Prism Black",
    desc: "product 1 desc",
    price: 5850,
    image:
      "https://eg.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/06/375812/1.jpg?4079",
  },
  {
    id: 2,
    brand: "Samsung",

    name: "product 2",
    desc: "product 2 desc",
    price: 7550,
    image:
      "https://eg.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/77/375812/1.jpg?4701",
  },
  {
    id: 3,
    brand: "Xiaomi",
    name: "product 3",

    desc: "product 3 desc",
    price: 5000,
    image:
      "https://eg.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/87/322481/1.jpg?9812",
  },
  {
    id: 4,
    brand: "realme",
    name: "product 4",

    desc: "product 4 desc",
    price: 4800,
    image:
      "https://eg.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/18/243212/1.jpg?8604",
  },
  {
    id: 5,
    brand: "realme",
    name: "product 5",

    desc: "product 5 desc",
    price: 5800,
    image:
      "https://eg.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/40/391651/1.jpg?5204",
  },
  {
    id: 6,
    brand: "realme",

    name: "product 6",
    desc: "product 6 desc",
    price: 3000,
    image:
      "https://eg.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/74/792102/1.jpg?8947",
  },
];

const Product = () => {
  const [products, setProducts] = useState([]);

  
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/all-products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        console.log("success");
        res.json().then((data) => {
          if (data.status == 200) {
            console.log(data);
            setProducts(data.products);
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
    <div className="container">
      <div className={`${classes.Itemcols}`}>
        <h1>Products</h1>
        <Products list={products} />
      </div>
      <Ads />
    </div>
  );
};

export default Product;

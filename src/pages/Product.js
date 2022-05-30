import React, { useState, useEffect } from "react";
import Ads from "../components/layout/Ads";
import Products from "./Products";
import classes from "../components/layout/Cart.module.css";

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
    <><div className="container">
      <div className={`${classes.Itemcols}`} style={{ boxShadow: "0 4px 20px 8px rgb(10, 128, 202), 0 10px 50px 0 rgb(10, 128, 202)" }}>
        <h1>Products</h1>
        <Products list={products} />
      </div>

    </div><Ads /></>
  );
};

export default Product;

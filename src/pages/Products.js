import React from "react";
import ProductItem from "../components/product/ProductItem";
import classes from "../components/layout/Cart.module.css";
const Products = (props) => {
  return (
    <ul className={classes.productrow}>
      {props.list.map((item) => (
        <ProductItem
          key={item.id}
          id={item.id}
          //brand={item.brand}
          name={item.name}
          photo={`http://localhost:8000/${item.photo}`}
          details={item.details}
          price={item.price}
        />
      ))}
    </ul>
  );
};

export default Products;

import React from "react";
import ProductItem from "../components/product/ProductItem";

const Products = (props) => {
  return (
    <ul className="row g-3">
      {props.list.map((item) => (
        <ProductItem
          key={item.id}
          name={item.name}
          image={item.image}
          desc={item.desc}
          price={item.price}
        />
      ))}
    </ul>
  );
};

export default Products;

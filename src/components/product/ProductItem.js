import React from "react";

const ProductItem = (props) => {
  return (
    <div className="col-sm-12 col-md-6 col-lg-4 ">
      <li className="card">
        <img src={props.image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.desc}</p>
          <p className="card-text">{props.price}</p>
          <a href="#" className="btn btn-primary">
            add to cart
          </a>
        </div>
      </li>
    </div>
  );
};

export default ProductItem;

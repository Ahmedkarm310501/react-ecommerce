import React from "react";
import classes from "./ProductDetials.module.css";
import { useState } from "react";
function ProductDetials() {
  const [image, setimage] = useState(
    "https://eg.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/06/375812/1.jpg?4079"
  );
  function changeImage(event) {
    setimage(event.target.src);
  }
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className={`${classes.content} `}>
            <div className=" col-sm-12 col-md-6 d-md-flex">
              <div className={classes.sideimg}>
                <img
                  src="https://eg.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/06/375812/1.jpg?4079" 
                  onClick={changeImage}
                />
                <img
                  src="https://eg.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/77/375812/1.jpg?4701"
                  onClick={changeImage}
                />
                <img
                  src="https://eg.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/87/322481/1.jpg?9812"
                  onClick={changeImage}
                />
              </div>
              <div className={classes.image}>
                <img src={image} className="img-fluid" />
              </div>
            </div>
            <div className="col-sm-12 col-md-6">
              <div className={classes.discription}>
                <h3> Name: Redmi </h3>
                <hr />
                <div>
                  <label htmlFor="color">
                    <h3>Color: </h3>
                  </label>
                  <select className={classes.colors} name="color">
                    <option>Blue</option>
                    <option>Green</option>
                    <option>Red</option>
                  </select>
                </div>
                <hr />
                <h3> Price: 13000 L.E </h3>
                <p className={classes.para}> was : 14000 L.E </p>
                <hr />
                <div className={classes.details}>
                  <div className={classes.title}>
                    <h3> Discription: </h3>
                  </div>
                  <div className={classes.more}>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat
                    </p>
                  </div>
                </div>
                <hr />
                <div className={classes.info}>
                  <label htmlFor="qty"> Qty: </label>
                  <input
                    type="number"
                    min="0"
                    aria-placeholder="0"
                    className={classes.qty}
                  />
                  <button className={classes.action}>
                    {" "}
                    <i className="fa-solid fa-cart-plus"></i> Add to cart
                  </button>
                  <div className={classes.icons}>
                    Rate:
                    <span>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star-half-stroke"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductDetials;

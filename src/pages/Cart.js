import React from "react";
import Ads from "../components/layout/Ads";
import classes from "../components/layout/Cart.module.css";
import CartItems from "../components/layout/CartItems";
import CheckOut from "../components/layout/CheckOut";
const Cart = ({cartItems}) => {
  return (
    <div className="container">
      <header>
        <div className={classes.block}>
          <h1>My Cart</h1>
        </div>
      </header>
      <div className={classes.row}> 
        <CartItems list={cartItems}></CartItems>
        <CheckOut></CheckOut>
      </div>
      <Ads />
    </div>
  );
};

export default Cart;

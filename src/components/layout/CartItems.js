import React from "react";
import classes from "../layout/Cart.module.css";
function CartItems({ cartItems }) {
  return (
    <div className={classes.Itemcols}>
      <h2>Items</h2>

      <div className={classes.row}>
        <li
          className="card"
          style={{
            margin: "5px",
            width: "18rem",
            "backgroundColor": "#85aeec",
          }}
        >
          <img
            src="https://eg.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/74/792102/1.jpg?8947"
            style={{ width: "100%" }}
            className="imgitem img card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h1 className="card-title">Ice Watch</h1>
            <h4 className="card-text">
              <b>20$</b>
            </h4>
            <h6 className="card-text">
              <del>50$</del>
            </h6>
            <a
              href="#"
              style={{
                margin: "10px",
                width: "40%",
                "backgroundColor": "#d63031",
              }}
              className="btn btn-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-trash3"
                viewBox="0 0 16 16"
              >
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
              </svg>{" "}
              Delete
            </a>
            <a href="#" className="btn btn-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-heart-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                />
              </svg>{" "}
              To Favourite
            </a>
          </div>
        </li>
      </div>
    </div>
  );
}

export default CartItems;

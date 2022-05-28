import React from "react";
import { useContext, useRef, useState } from "react";
import { CartContext } from "../../store/cart-context";
import { FavContex } from "../../store/fav-context";
import Snackbar from "../layout/UI/Snackbar";
import { Link } from "react-router-dom";
import { AuthContext } from "../../store/auth-context";

const ProductItem = (props) => {
  const AuthCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  const favCtx = useContext(FavContex);
  const snackbarRef = useRef(null);
  const [snakbarMessage, setSnakbarMessage] = useState("");

  const addToCart = () => {
    const newItem = {
      id: props.id,
      brand: props.brand,
      name: props.name,
      amount: 1,
      price: props.price,
      image: props.image,
    };
    cartCtx.addItem(newItem);
    setSnakbarMessage("Product Added To Cart !");
    snackbarRef.current.show();
  };
  const addToFavourites = () => {
    favCtx.addItem({
      id: props.id,
      brand: props.brand,
      name: props.name,
      amount: 1,
      price: props.price,
      image: props.image,
    });
    setSnakbarMessage("product Added To Favourites !");
    snackbarRef.current.show();
  };

   const addToCartHandler = () => {
    fetch("http://127.0.0.1:8000/api/add_to_cart", {
      method: "POST",
      body: JSON.stringify({
        token: AuthCtx.token,
        product_id: props.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        console.log("success");
        res.json().then((data) => {
          if (data.status == 200) {
            console.log(data);
            addToCart();
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
  };

  const addToFavouriteHandler = () => {
    fetch("http://127.0.0.1:8000/api/add_to_favourite", {
      method: "POST",
      body: JSON.stringify({
        token: AuthCtx.token,
        product_id: props.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        console.log("success");
        res.json().then((data) => {
          if (data.status == 200) {
            console.log(data);
            addToFavourites();
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
  };

  return (
    <li
      className="card"
      style={{ margin: "5px", width: "17rem", backgroundColor: "#85aeec" }}
    >
      <Link to={`/product-detials/${props.id}`}>
        <img src={props.photo} className="card-img-top" alt="..." />
      </Link>
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <h4 className="card-text">
          <b>{+props.price}$</b>
        </h4>
        {/* <h6 className="card-text">
            <del>{props.price + 20}$</del>
          </h6> */}
        <div className="buttons d-flex flex-between">
          <button
            style={{ backgroundColor: "green" }}
            className=" btn btn-primary"
            onClick={addToCartHandler}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              fill="currentColor"
              className="bi bi-cart-plus"
              viewBox="0 0 16 16"
            >
              <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z" />
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
            </svg>{" "}
            To cart
          </button>
          {
            <Snackbar
              ref={snackbarRef}
              message={snakbarMessage}
              type={"success"}
            />
          }
          <button className="btn btn-primary" onClick={addToFavouriteHandler}>
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
          </button>
        </div>
      </div>
    </li>
  );
};

export default ProductItem;

import React, { Fragment, useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FavContex } from "../store/fav-context";
import { CartContext } from "../store/cart-context";
import Snackbar from "../components/layout/UI/Snackbar";

const FavouritesData = () => {
  const favCtx = useContext(FavContex);
  const cartCtx = useContext(CartContext);
  const snackbarRef = useRef(null);
  const [snakbarMessage, setSnakbarMessage] = useState("");
  const products = favCtx.items;
  const addToCart = (product) => {
    const newItem = {
      id: product.id,
      brand: product.brand,
      name: product.name,
      amount: 1,
      price: product.price,
      image: product.image,
    };
    cartCtx.addItem(newItem);
    setSnakbarMessage("Product Added To Cart !");
    snackbarRef.current.show();
  };
  const removeFromFavourite = (id) => {
    favCtx.removeItem(id);
    setSnakbarMessage("Product Removed From Favourites");
    snackbarRef.current.show();
  };
  return (
    <Fragment>
      {favCtx.items.length > 0 ? (
        <>
          <div className="page-haeder col-12 ">
            <h1>Favourites</h1>
            <p>
              You have items in your wishlist. To buy items from your wishlist,
              move them to your cart.
            </p>
          </div>
          <div className="content bg-white p-3">
            {
              <Snackbar
                ref={snackbarRef}
                message={snakbarMessage}
                type={"success"}
              />
            }
            {products.map((product, index) => {
              return (
                <div className="fav col-12  p-3 mb-3" key={index}>
                  <div className="row bg-white">
                    <div className="image col-3 d-flex flex-column justify-content-center ">
                      <img src={product.image} />
                    </div>
                    <div className="con col-6 d-flex flex-column justify-content-between">
                      <div className="name fs-5">{product.name}</div>
                      <div className="price fs-4 ">${product.price}</div>
                    </div>
                    <div className="btnn col-3 d-flex flex-column justify-content-between">
                      <button
                        className="add secubtn"
                        onClick={() => {
                          addToCart(product);
                        }}
                      >
                        add to cart
                      </button>

                      <button
                        className="remove secubtn btn-danger"
                        onClick={() => {
                          removeFromFavourite(product.id);
                        }}
                      >
                        remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="no-items">
          <div className="photo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="160"
              height="160"
              fill="currentColor"
              className="bi bi-heart-fill"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
              />
            </svg>
          </div>
          <div className="text">Your Have No Favourites </div>
          <Link to="/home">
            <button className="secubtn">Start Shooping</button>
          </Link>
        </div>
      )}
    </Fragment>
  );
};

export default FavouritesData;

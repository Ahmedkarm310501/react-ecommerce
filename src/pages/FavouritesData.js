import React, {
  Fragment,
  useContext,
  useRef,
  useState,
  useEffect,
} from "react";
import { Link } from "react-router-dom";
import { FavContex } from "../store/fav-context";
import { CartContext } from "../store/cart-context";
import Snackbar from "../components/layout/UI/Snackbar";
import { AuthContext } from "../store/auth-context";

const FavouritesData = () => {
  const AuthCtx = useContext(AuthContext);
  const favCtx = useContext(FavContex);
  const cartCtx = useContext(CartContext);
  const snackbarRef = useRef(null);
  const [snakbarMessage, setSnakbarMessage] = useState("");
  const [products, setproducts] = useState([]);
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

  useEffect(() => {
    fetch("http://127.0.0.1:8000/user/get-favourite-items", {
      headers: {
        Authorization: AuthCtx.token,
      },
    }).then((res) => {
      if (res.ok) {
        console.log("success");
        res.json().then((data) => {
          if (res.status == 200) {
            setproducts(data.products);
            console.log(data);
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

  const addToCartHandler = (id) => {
    fetch("http://127.0.0.1:8000/user/add-to-cart", {
      method: "POST",
      body: JSON.stringify({
        token: AuthCtx.token,
        productId: id,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: AuthCtx.token,
      },
    }).then((res) => {
      if (res.ok) {
        console.log("success");
        res.json().then((data) => {
          if (res.status == 200) {
            console.log(data);
            setSnakbarMessage("Product Added To Cart !");
            snackbarRef.current.show();
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

  const removeFavouriteHandler = (id) => {
    fetch("http://127.0.0.1:8000/user/remove-from-favourites", {
      method: "DELETE",
      body: JSON.stringify({
        productId: id,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: AuthCtx.token,
      },
    }).then((res) => {
      if (res.ok) {
        console.log("success");
        res.json().then((data) => {
          if (res.status == 200) {
            console.log(data);
            setSnakbarMessage("Product Removed From Favourites");
            snackbarRef.current.show();
            const newProducts = products.filter((pro) => pro.id !== id);
            setproducts(newProducts);
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
    <Fragment>
      {products.length > 0 ? (
        <>
          <div className="page-haeder col-12 text-white mt-5">
            <h1>Favourites</h1>
            <p>
              You have items in your wishlist. To buy items from your wishlist,
              move them to your cart.
            </p>
          </div>
          <div className="content bg-white p-3 mb-5">
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
                      <img src={`http://localhost:8000/${product.photo}`} />
                    </div>
                    <div className="con col-6 d-flex flex-column justify-content-between">
                      <div className="name fs-5">{product.name}</div>
                      <div className="price fs-4 ">${+product.price}</div>
                    </div>
                    <div className="btnn col-3 d-flex flex-column justify-content-between">
                      <button
                        className="add secubtn"
                        onClick={() => {
                          addToCartHandler(product.id);
                        }}
                      >
                        add to cart
                      </button>

                      <button
                        className="remove secubtn btn-danger"
                        onClick={() => {
                          removeFavouriteHandler(product.id);
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

import React from "react";
import { useContext, useRef, useState, useEffect } from "react";
import { CartContext } from "../store/cart-context";
import { Link } from "react-router-dom";
import Snackbar from "../components/layout/UI/Snackbar";
import { AuthContext } from "../store/auth-context";

const Cart = () => {
  const AuthCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [totalPrice, setTotalPrice] = useState(null);
  //const products = cartCtx.items;
  const snackbarRef = useRef(null);
  const [snakbarMessage, setSnakbarMessage] = useState("");
  const addItem = (product) => {
    cartCtx.addItem({
      id: product.id,
      brand: product.brand,
      name: product.name,
      amount: 1,
      price: product.price,
      image: product.image,
    });
  };

  const removeItem = (id) => {
    cartCtx.removeItem(id);
  };
  const removeAllItem = (id) => {
    cartCtx.removeAllItem(id);
    setSnakbarMessage("Items removed successfully !");
    snackbarRef.current.show();
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/get_cart_total", {
      method: "POST",
      body: JSON.stringify({
        token: AuthCtx.token,
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
            setProducts(data.products);
            let newArrayDataOfOjbect = Object.values(data.cartID);

            setQuantity(newArrayDataOfOjbect);
            setTotalPrice(data.total_price);
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

  const addToCartHandler = (id, index) => {
    fetch("http://127.0.0.1:8000/api/add_to_cart", {
      method: "POST",
      body: JSON.stringify({
        token: AuthCtx.token,
        product_id: id,
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
            const newQuantity = [...quantity, { id: index }];
            newQuantity[index].quantity++;
            const newPrice = +totalPrice + +products[index].price;
            setTotalPrice(newPrice);
            setQuantity(newQuantity);
            console.log(quantity);
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
  const removeToCartHandler = (id, index) => {
    fetch("http://127.0.0.1:8000/api/delete_one_cart", {
      method: "DELETE",
      body: JSON.stringify({
        token: AuthCtx.token,
        product_id: id,
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
            const newQuantity = [...quantity, { id: index }];
            newQuantity[index].quantity--;
            const newPrice = +totalPrice - +products[index].price;
            setTotalPrice(newPrice);
            if (newQuantity[index].quantity == 0) {
              console.log("less zero");
              setQuantity(newQuantity.filter((pro) => pro.id !== id));
              const newProducts = products.filter((pro) => pro.id !== id);
              setProducts(newProducts);
            } else {
              setQuantity(newQuantity);
            }
            console.log(quantity);
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
  const removeAllCartHandler = (id) => {
    fetch("http://127.0.0.1:8000/api/delete_all_cart", {
      method: "DELETE",
      body: JSON.stringify({
        token: AuthCtx.token,
        product_id: id,
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
            const newProducts = products.filter((pro) => pro.id !== id);
            const newCartId = quantity.filter((pro) => pro.id !== id);
            setProducts(newProducts);
            setQuantity(newCartId);
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
    <div className="cart py-5">
      <div className="container">
        <div className="row">
          {products.length > 0 ? (
            <>
              <div className="items order-2 order-lg-1 col-12 col-lg-8 ">
                <div className="con bg-white pb-2">
                  <div className="header fs-3 mx-3 pt-3">
                    Cart ({products.length})
                  </div>
                  <hr />
                  {
                    <Snackbar
                      ref={snackbarRef}
                      message={snakbarMessage}
                      type={"success"}
                    />
                  }
                  {products.map((product, index) => {
                    return (
                      <div className="item mx-3" key={index}>
                        <div className="data mb-2 pb-2 d-flex justify-content-between">
                          <img
                            src={`http://localhost:8000/${product.photo}`}
                            width={"82px"}
                            height={"82px"}
                          />
                          <div className="name ">
                            <span className="fs-4">{product.name}</span>
                          </div>
                          <div className="price fs-4">EGP {+product.price}</div>
                        </div>
                        <div className="buttons d-flex justify-content-between">
                          <button
                            className="remove secubtn btn-danger d-flex justify-content-between align-items-center"
                            onClick={() => {
                              removeAllCartHandler(product.id);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-trash"
                              viewBox="0 0 16 16"
                            >
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                              <path
                                fillRule="evenodd"
                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                              />
                            </svg>
                            REMOVE
                          </button>
                          <div className="buttons-actions d-flex align-items-center justify-content-between">
                            <button
                              className="secubtn "
                              onClick={() => {
                                removeToCartHandler(product.id, index);
                              }}
                            >
                              -
                            </button>
                            <div className="mx-2">
                              {quantity[index].quantity}
                            </div>
                            <button
                              className="secubtn"
                              onClick={() => {
                                addToCartHandler(product.id, index);
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="checkout order-1 order-lg-2 col-12 col-lg-4 mb-4">
                <div className="con bg-white d-flex flex-column">
                  <div>
                    <div className="header fs-3 mx-3 pt-3">CheckOut</div>
                    <hr />
                  </div>
                  <div className="sec d-flex justify-content-between p-3 fs-5 ">
                    <div>Subtotal ({products.length} items)</div>
                    <div>EGP {totalPrice}</div>
                  </div>
                  <div className="sec d-flex justify-content-between p-3 fs-5">
                    <div>Shipping Details</div>
                    <div>Free</div>
                  </div>
                  <hr />
                  <div className="sec d-flex justify-content-between p-3 fs-5">
                    <div>Total</div>
                    <div>EGP {totalPrice}</div>
                  </div>
                  <div className="d-flex justify-content-center p-3 fs-5">
                    <Link to="/checkout" className="w-100">
                      <button className="secubtn" style={{ width: "100%" }}>
                        CHECKOUT
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="no-items">
              <div className="photo">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="170"
                  height="170"
                  fill="currentColor"
                  className="bi bi-cart-x-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7.354 5.646 8.5 6.793l1.146-1.147a.5.5 0 0 1 .708.708L9.207 7.5l1.147 1.146a.5.5 0 0 1-.708.708L8.5 8.207 7.354 9.354a.5.5 0 1 1-.708-.708L7.793 7.5 6.646 6.354a.5.5 0 1 1 .708-.708z" />
                </svg>
              </div>
              <div className="text">Your Cart Is Empty </div>
              <Link to="/home">
                <button className="secubtn">Start Shooping</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;

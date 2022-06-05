import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../pics/logo/logofci.png";
import { CartContext } from "../../store/cart-context";
import { AuthContext } from "../../store/auth-context";

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css"
></link>;

const MainNavigation = () => {
  const cartCtx = useContext(CartContext);
  const navigation = useNavigate();
  const [quantity, setQuantity] = useState(0);

  const AuthCtx = useContext(AuthContext);
  const name = AuthCtx.name;
  const logOutHandler = () => {
    fetch("http://127.0.0.1:8000/api/logout", {
      method: "POST",
      body: JSON.stringify({
        token: AuthCtx.token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          console.log(data);
          AuthCtx.logout();
          navigation("/home", { replace: true });
        });
      } else {
        console.log(res);
      }
    });
  };
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <a
          style={{ fontSize: "2.5rem" }}
          className="brand navbar-brand d-flex align-items-center"
          href="/home"
        >
          <img
            src={logo}
            width="70"
            height="70"
            alt="logo"
            className="d-inline-block align-medium mr-2"
          />
          <span className="ms-2 fs-2">FCI Shop</span>
        </a>
        {/* <form className="d-flex">
          <input
            style={{ width: "auto" }}
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form> */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul
            style={{ fontSize: "1.25rem" }}
            className="navbar-nav ms-auto mb-2 mb-lg-0"
          >
       
            {!AuthCtx.isLoggedIn && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Log In
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Sign up
                  </NavLink>
                </li>
              </>
            )}
                 <li className="nav-item">
              <NavLink className="nav-link" to="/home">
                Home
              </NavLink>
            </li>
            {AuthCtx.isAdmin && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard">
                  Dashboard
                </NavLink>
              </li>
            )}

            {AuthCtx.isLoggedIn && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/profile">
                  {name}
                </NavLink>
              </li>
            )}
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/product">
                Product
              </NavLink>
            </li> */}
            {AuthCtx.isLoggedIn && (
              <li className="nav-item">
                <NavLink className="nav-link cart-icon" to="/cart">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    fill="currentColor"
                    className="bi bi-cart-plus"
                    viewBox="0 0 16 16"
                  >
                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                  </svg>
                </NavLink>
              </li>
            )}
            {AuthCtx.isLoggedIn && (
              <li className="nav-item">
                <div className="nav-link ff" onClick={logOutHandler}>
                  logout
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation;

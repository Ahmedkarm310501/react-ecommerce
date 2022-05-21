import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import CartProvider from "./store/cart-context";
import FavProvider from "./store/fav-context";
import AuthContextProvider from "./store/auth-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <BrowserRouter>
      <CartProvider>
        <FavProvider>
          <App />
        </FavProvider>
      </CartProvider>
    </BrowserRouter>
  </AuthContextProvider>
);

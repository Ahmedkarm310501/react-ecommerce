import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { Fragment } from "react";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import HashLoader from "react-spinners/HashLoader";
import MainNavigation from "./components/layout/MainNavigation";
import Footer from "./components/layout/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Route, Routes, Navigate } from "react-router-dom";
import Profile from "./pages/Profile";
import ProfileData from "./pages/ProfileData";
import OrdersData from "./pages/OrdersData";
import AdressData from "./pages/AdressData";
import FavouritesData from "./pages/FavouritesData";
import AdminPage from "./pages/AdminPage";
function App() {
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setloading(true);
    setTimeout(() => {
      setloading(false);
    }, 500);
  }, []);

  return (
    <div className="all">
      <Fragment>
        {loading ? (
          <div className="loader">
            <HashLoader size={100} color={"#00adb5"} loading={loading} />
          </div>
        ) : (
          <>
            <MainNavigation />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/product" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile/*" element={<Profile />}>
                <Route path="profile" element={<ProfileData />} />
                <Route path="orders" element={<OrdersData />} />
                <Route path="adresses" element={<AdressData />} />
                <Route path="favourites" element={<FavouritesData />} />
                <Route path="" element={<Navigate to="profile" />} />
              </Route>
              <Route path="/admin/*" element={<AdminPage />}>
                <Route path="admin" element={<h1>test</h1>} />

                <Route path="" element={<Navigate to="admin" />} />
              </Route>
            </Routes>
          </>
        )}
        <Footer />
      </Fragment>
    </div>
  );
}

export default App;

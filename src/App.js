import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Fragment, useState, useEffect, useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import HashLoader from "react-spinners/HashLoader";
import MainNavigation from "./components/layout/MainNavigation";
import Footer from "./components/layout/Footer";
import Profile from "./pages/Profile";
import ProfileData from "./pages/ProfileData";
import OrdersData from "./pages/OrdersData";
import AdressData from "./pages/AdressData";
import FavouritesData from "./pages/FavouritesData";
import ProductDetials from "./pages/ProductDetials";
import AdminData from "./pages/Admin/AdminData";
import ProductList from "./pages/Admin/ProductList";
import OrdersList from "./pages/Admin/OrdersList";
import Homepage from "./pages/Admin/Homepage";
import UserList from "./pages/Admin/UserList";
import ReturnsData from "./pages/ReturnsData";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import { AuthContext } from "./store/auth-context";

import Allcharts from "./pages/Admin/Chartpage";
import User from "./pages/Admin/User";
import NewUser from "./pages/Admin/NewUser";
import Prod from "./pages/Admin/Prod";
import NewProduct from "./pages/Admin/NewProduct";

import CheckOut from "./pages/CheckOut";


function App() {
  const AuthCtx = useContext(AuthContext);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setloading(true);
    setTimeout(() => {
      setloading(false);
    }, 600);
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
            <ScrollToTop />
            <MainNavigation />
            <Routes>
              {/*
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/product" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product-detials" element={<ProductDetials />} />
              
              <Route path="/profile/*" element={<Profile />}>
                <Route path="profile" element={<ProfileData />} />
                <Route path="orders" element={<OrdersData />} />
                <Route path="adresses" element={<AdressData />} />
                <Route path="favourites" element={<FavouritesData />} />
                <Route path="" element={<Navigate to="profile" />} />
              </Route>
              
              <Route path="/dashboard/*" element={<AdminData />}>
              <Route path="home" element={<Homepage/>} />
                <Route path="allUsers" element={<UserList />} />
                <Route path="allProducts" element={<ProductList/>} />
                <Route path="allOrders" element={<OrdersList />} />
                <Route path="" element={<Navigate to="home" />} />
        </Route>*/}

              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />

              <Route path="/product" element={<Product />} />
              <Route
                path="/product-detials/:productID"
                element={<ProductDetials />}
              />
              {!AuthCtx.isLoggedIn && (
                <>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </>
              )}
              {AuthCtx.isLoggedIn && (
                <>
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<CheckOut />} />
                  <Route path="/profile/*" element={<Profile />}>
                    <Route path="profile" element={<ProfileData />} />
                    <Route path="orders" element={<OrdersData />} />
                    <Route path="adresses" element={<AdressData />} />
                    <Route path="favourites" element={<FavouritesData />} />
                    <Route path="returns" element={<ReturnsData />} />
                    <Route path="" element={<Navigate to="profile" />} />
                  </Route>
                </>
              )}

              { AuthCtx.isAdmin &&(
                <>
                  <Route path="/dashboard/*" element={<AdminData />}>
                    <Route path="home" element={<Homepage />} />
                    <Route path="allUsers" element={<UserList />} />
                    <Route path="allUsers/user/:userid" element={<User />} />
                    <Route path="allProducts" element={<ProductList />} />
                    <Route path="allProducts/product/:productid" element={<Prod/>} />
                    <Route path="allProducts/product/:productid/newproduct" element={<NewProduct/>} />
                    <Route path="allUsers/user/:userid/newUser" element={<NewUser />} />
                    <Route path="allOrders" element={<OrdersList />} />
                    <Route path="Allcharts" element={<Allcharts />} />
                    <Route path="" element={<Navigate to="home" />} />
                  </Route>
                  {/* <Route path="/admin/*" element={<AdminPage />}>
                    <Route path="admin" element={<h1>test</h1>} />
                    <Route path="" element={<Navigate to="admin" />} />
                  </Route> */}
                </>
              )}
              <Route path="*" element={<Navigate to="home" />} />
            </Routes>
          </>
        )}
        <Footer />
      </Fragment>
    </div>
  );
}
export default App;

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Route, Routes } from "react-router-dom";
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
function App() {

  const [loading, setloading] = useState(false);
  useEffect(() => {
    setloading(true)
    setTimeout(() => {
      setloading(false)
    }, 200)
  }, [])

  return (
    <div className="all" >
    <Fragment>
      {
        loading ? 
        (<div className="loader" ><HashLoader size={100} color={'#00adb5'} loading={loading}/></div>) 
        :
        (
          <><MainNavigation /><Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/product" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
              </Routes></>
        )
      }
    <Footer/>
    </Fragment>
    </div>
  );
}

export default App;

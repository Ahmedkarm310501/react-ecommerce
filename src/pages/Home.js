import React from "react";
import Ads from "../components/layout/Ads";
import Slider from "../components/layout/Slider";
import Product from "./Product";
import Products from "./Products";
const Home = () => {
  return (
    <><Slider/>
    <Ads/>
    <div style={{"width":"100%"}}>
       <Product/> 
    </div></>
  );
};

export default Home;

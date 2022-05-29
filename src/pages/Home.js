import React from "react";
import Ads from "../components/layout/Ads";
import Slider from "../components/layout/Slider";
import Product from "./Product";

const Home = () => {
  return (
    <>
    <div className="container" style={{"alignContent": "center"}}>
    <iframe
          width="500"
          height="500"
          src="https://www.youtube.com/embed/DgvHP3SI3dY?autoplay=1"
          title="YouTube video player"
          frameborder="20"
        ></iframe></div>
      <div className="row">
      <Slider />
      <Ads />
      <div style={{ width: "100%" }}>
        <Product />
        
      </div>
      </div>
    </>
  );
};

export default Home;

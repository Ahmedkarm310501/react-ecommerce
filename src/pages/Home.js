import React from "react";
import Ads from "../components/layout/Ads";
import Slider from "../components/layout/Slider";
import Product from "./Product";
import Video1 from "../components/pics/ads/realme GT - Official Product Video.mp4";
import Video2 from "../components/pics/ads/The New Latitude 9000 Series (2020).mp4";
const Home = () => {
  return (
    <>
      <Slider />
      <div class="row">
        <div class="col-1">col-4</div>
        <div class="col-10">col-8</div>
        <div class="col-1">col-4</div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col">
            <video
              width="100%"
              height="100%"
              controls
              autostart
              autoPlay
              style={{
                boxShadow:
                  "0 4px 20px 8px rgb(10, 128, 202), 0 10px 50px 0 rgb(10, 128, 202)",
              }}
              src={Video1}
              type="video/mp4"
            />
          </div>
          <div class="col">
            <video
              width="100%"
              height="100%"
              controls
              autostart
              autoPlay
              style={{
                boxShadow:
                  "0 4px 20px 8px rgb(10, 128, 202), 0 10px 50px 0 rgb(10, 128, 202)",
              }}
              src={Video2}
              type="video/mp4"
            />
          </div>
        </div>
      </div>
      <Ads />
      <div style={{ width: "100%" }}>
        <Product />
      </div>
    </>
  );
};

export default Home;

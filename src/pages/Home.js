import React from "react";
import Ads from "../components/layout/Ads";
import Slider from "../components/layout/Est quis pariatur do in ex consequat incididunt fugiat esse ullamco commodo eu. Tempor sunt Lorem dolor nostrud sint in et cupidatat. Nostrud labore incididunt occaecat culpa pariatur laboris irure elit cillum nostrud et excepteur magna. Et anim aliqua elit quis qui.";
import Product from "./Product";
import Video1 from "../components/pics/ads/realme GT - Official Product Video.mp4";
import Video2 from "../components/pics/ads/The New Latitude 9000 Series (2020).mp4";
const Home = () => {
  return (
    <>
      <Slider />
      <div class="container">
        <div class="row">
          <div class="col">
            <video
              width="100%"
              height="100%"
              controls
              autostart
              autoPlay
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

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

      <div className="container">
        <div className="row">
          <div className="col">
            <video
              width="100%"
              height="100%"
              controls
               autostart
               autoPlay
               muted
               loop
              style={{
                boxShadow:
                  "0 4px 20px 8px rgb(10, 128, 202), 0 10px 50px 0 rgb(10, 128, 202)",
              }}
              src={Video1}
              type="video/mp4"
            />
          </div>
          <div className="col">
            <video
              width="100%"
              height="100%"
              controls
               autostart
               autoPlay
               muted
               loop
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

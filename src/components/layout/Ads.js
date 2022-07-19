import React from "react";
import classes from "./Ads.module.css";
import pc from "../pics/ads/pc.png";
import women from "../pics/ads/women.png";
export default function Ads() {
  return (
    <div className="container">
      <div className={classes.bannercon}>
        <div className={classes.banner}>
          <div className={classes.pc}>
            <img src={pc} alt="" />
          </div>
          <div className={classes.content}>
            <span>upto</span>
            <h3>50% 0ff</h3>
            <p>offer ends after 5 days</p>
            <a href="#" className={classes.btn}>
              veiw offer
            </a>
          </div>
          <div className={classes.women}>
            <img src={women} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

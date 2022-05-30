import pic1 from "../pics/ads/car1.png";
import pic2 from "../pics/ads/car2.png";
import pic3 from "../pics/ads/car3.png";
import pic4 from "../pics/ads/car4.png";
import React from "react";

export default function Slider() {
  return (
      
    <div className="container my-5" >
      <div
        id="carouselExampleDark"
        className="carousel carousel-dark slide"
        data-bs-ride="carousel"
        
      >
        <div className="carousel-indicators" >
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="3"
            aria-label="Slide 4"
          ></button>
        </div>
        <div className="carousel-inner" >
          <div className="carousel-item active" data-bs-interval="4000">
            <img src={pic1} className="d-block w-100" alt="..."  />
            
          </div>

          <div className="carousel-item" data-bs-interval="3000">
            <img src={pic2} className="d-block w-100" alt="..." />
          </div>

          <div className="carousel-item " data-bs-interval="3000" >
            <img src={pic3} className="d-block w-100" alt="..." />
          </div>

          <div className="carousel-item " data-bs-interval="3000" >
            <img src={pic4} className="d-block w-100" alt="..." />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

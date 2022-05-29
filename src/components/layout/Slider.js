import pic1 from "../pics/1.jpg";
import pic2 from "../pics/2.jpg";
import pic3 from "../pics/3.jpg";
import React from "react";
import { carousel } from "react-bootstrap";
import classes from "../layout/Slider.module.css";
export default function Slider() {
  return (
      
    <div className="container my-5">

      <div
        id="carouselExampleDark"
        className="carousel carousel-dark slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
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
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="2000">
            <img src={pic3} className="d-block w-100" alt="..." />
            <div
              style={{ marginBottom: "10rem" }}
              className="carousel-caption d-none d-md-block"
            >
              <h5
                style={{
                  color: "white",
                  fontSize: "10rem",
                  marginBottom: "50px",
                  textShadow: "2px 2px 4px #000000",
                }}
              >
                Welcome
              </h5>
              <p
                style={{
                  color: "white",
                  fontSize: "8rem",
                  marginBottom: "20px",
                  textShadow: "2px 2px 4px #000000",
                }}
              >
                In FCI SHOP
              </p>
            </div>
          </div>

          <div className="carousel-item" data-bs-interval="4000">
            <img src={pic2} className="d-block w-100" alt="..." />
            <div
              style={{ marginBottom: "10rem" }}
              className="carousel-caption d-none d-md-block"
            >
              <h5
                style={{
                  color: "white",
                  fontSize: "5rem",
                  marginBottom: "50px",
                  textShadow: "4px 4px 10px #000000",
                }}
              >
                Computer ,Laptop , Mobile phones
              </h5>
              <p
                style={{
                  color: "white",
                  fontSize: "4rem",
                  marginBottom: "20px",
                  textShadow: "2px 2px 4px #000000",
                }}
              >
                and Many products{" "}
              </p>
            </div>
          </div>

          <div className="carousel-item ">
            <img src={pic1} className="d-block w-100" alt="..." />
            <div
              style={{ marginBottom: "10rem" }}
              className="carousel-caption d-none d-md-block"
            >
              <h5
                style={{
                  color: "white",
                  fontSize: "5rem",
                  marginBottom: "50px",
                  textShadow: "2px 2px 4px #000000",
                }}
              >
                Let's get deal
              </h5>
              <p
                style={{
                  color: "white",
                  fontSize: "4rem",
                  marginBottom: "20px",
                  textShadow: "2px 2px 4px #000000",
                }}
              >
                Buy and Sell with us
              </p>
            </div>
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

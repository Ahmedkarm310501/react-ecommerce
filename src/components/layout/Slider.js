import pic1 from '../pics/1.jpg';
import pic2 from '../pics/2.jpg';
import pic3 from '../pics/3.jpg';
import React from 'react';
import { carousel } from "react-bootstrap";
import classes from "../layout/Slider.module.css";
export default function Slider() {
    return (
        <div id="carouselExampleDark"  class="carousel carousel-dark slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active" data-bs-interval="2000">
                    <img src={pic3} class="d-block w-100" alt="..."/>
                        <div style={{"margin-bottom": "10rem"}} class="carousel-caption d-none d-md-block">
                            <h5 style={{"color": "white", "fontSize": "10rem","margin-bottom": "50px", "text-shadow": "2px 2px 4px #000000"}} >Welcome</h5>
                            <p style={{"color": "white", "fontSize": "8rem","margin-bottom": "20px", "text-shadow": "2px 2px 4px #000000"}} >In FCI SHOP</p>
                        </div>
                </div>


                <div class="carousel-item" data-bs-interval="4000">
                    <img src={pic2} class="d-block w-100" alt="..."/>
                    <div style={{"margin-bottom": "10rem"}} class="carousel-caption d-none d-md-block">
                            <h5 style={{"color": "white", "fontSize": "5rem","margin-bottom": "50px", "text-shadow": "4px 4px 10px #000000"}} >Computer ,Laptop , Mobile phones</h5>
                            <p style={{"color": "white", "fontSize": "4rem","margin-bottom": "20px", "text-shadow": "2px 2px 4px #000000"}} >and Many products </p>
                        </div>
                </div>

                <div class="carousel-item ">
                    <img src={pic1} class="d-block w-100" alt="..."/>
                    <div style={{"margin-bottom": "10rem"}} class="carousel-caption d-none d-md-block">
                            <h5 style={{"color": "white", "fontSize": "5rem","margin-bottom": "50px", "text-shadow": "2px 2px 4px #000000"}} >Let's get deal</h5>
                            <p style={{"color": "white", "fontSize": "4rem","margin-bottom": "20px", "text-shadow": "2px 2px 4px #000000"}} >Buy and Sell with us</p>
                        </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    );
}

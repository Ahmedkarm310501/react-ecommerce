import React from "react";
import Slider from "../components/layout/Slider";
import Products from "./Products";

const products = [
  {
    id: 1,
    name: "product 1",
    desc: "product 1 desc",
    price: 50,
    image:
      "https://eg.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/06/375812/1.jpg?4079",
  },
  {
    id: 2,
    name: "product 2",
    desc: "product 2 desc",
    price: 75,
    image:
      "https://eg.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/77/375812/1.jpg?4701",
  },
  {
    id: 3,
    name: "product 3",
    desc: "product 3 desc",
    price: 500,
    image:
      "https://eg.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/87/322481/1.jpg?9812",
  },
  {
    id: 4,
    name: "product 4",
    desc: "product 4 desc",
    price: 48,
    image:
      "https://eg.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/18/243212/1.jpg?8604",
  },
  {
    id: 5,
    name: "product 5",
    desc: "product 5 desc",
    price: 50,
    image:
      "https://eg.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/40/391651/1.jpg?5204",
  },
  {
    id: 6,
    name: "product 6",
    desc: "product 6 desc",
    price: 50,
    image:
      "https://eg.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/74/792102/1.jpg?8947",
  },
];
const Home = () => {
  return (
    <><Slider/><div className="container">
      {/* <Products list={products} /> */}
    </div></>
  );
};

export default Home;

import React, { Fragment } from "react";
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
const FavouritesData = () => {
  return (
    <Fragment>
      <div className="page-haeder col-12 ">
        <h1>Favourites</h1>
        <p>
          You have items in your wishlist. To buy items from your wishlist, move
          them to your cart.
        </p>
      </div>
      <div className="content bg-white p-3">
        
          {products.map((product) => {
            return (
              <div className="fav col-12  p-3 mb-3">
                <div className="row bg-white">
                <div className="image col-3 d-flex flex-column justify-content-center ">
                  <img
                    src={product.image}
                    
                  />
                </div>
                <div className="con col-6 d-flex flex-column justify-content-between">
                  <div className="name fs-5">{product.name}</div>
                  <div className="price fs-4 ">${product.price}</div>
                </div>
                <div className="btnn col-3 d-flex flex-column justify-content-between">
                  <button className="add secubtn">add to cart</button>
                  <button className="remove secubtn btn-danger">remove</button>
                </div>
                </div>
              </div>
            );
          })}
        
      </div>
    </Fragment>
  );
};

export default FavouritesData;

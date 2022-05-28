import React from "react";
import classes from "./ProductDetials.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
function ProductDetials() {
  const param = useParams();
  console.log(param.productID);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(null);
  const [desc, setDesc] = useState("");
  const [image, setimage] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/get-product", {
      method: "POST",
      body: JSON.stringify({
        id: param.productID,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        console.log("success");
        res.json().then((data) => {
          if (data.status == 200) {
            console.log(data.products);
            setId(data.products.id);
            setName(data.products.name);
            setDesc(data.products.details);
            setPrice(data.products.price);
            setimage(`http://localhost:8000/${data.products.photo}`);
            //setProducts(data.products);
          } else {
            console.log("wrong");
          }
        });
      } else {
        res.json().then((data) => {
          console.log(data);
        });
      }
    });
  }, []);

  return (
    <div className="product-details bg-white py-5">
      <div className="container">
        <div className="row">
          <div className={`${classes.content} `}>
            <div className=" col-sm-12 col-md-6 d-md-flex">
              <div className={classes.image}>
                <img src={image} className="img-fluid" />
              </div>
            </div>
            <div className="col-sm-12 col-md-6">
              <div className={classes.discription}>
                <p className="fs-2"> Name: {name} </p>
                <hr />

                <p className="fs-2"> Price: {price} L.E </p>

                <hr />
                <div className={classes.details}>
                  <div className={classes.title}>
                    <p className="fs-2"> Discription: </p>
                  </div>
                  <div className={classes.more}>
                    <p className="fs-5">{desc}</p>
                  </div>
                </div>
                <hr />
                <div className={classes.info}>
                  <button className="secubtn w-100">
                    {" "}
                    <i className="fa-solid fa-cart-plus"></i> Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductDetials;

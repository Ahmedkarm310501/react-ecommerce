import "./NewProduct.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useContext, useState, useRef } from "react";
import classes from "../Register.module.css";
import useInput from "../../hooks/use-input";
import { AuthContext } from "../../store/auth-context";
import axios from "axios";
import Snackbar from "../../components/layout/UI/Snackbar";
export default function NewProduct() {
  const AuthCtx = useContext(AuthContext);
  const navigation = useNavigate();
  const snackbarRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const [productImage, setProductImage] = useState(null);
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: NameInputHasError,
    valueChangeHandler: NameChangedHandler,
    inputBlurHandler: NameBlurHandler,
    setValue: setName,
  } = useInput((value) => value.length >= 2);

  const {
    value: enteredDesc,
    isValid: enteredDescIsValid,
    hasError: descInputHasError,
    valueChangeHandler: descChangedHandler,
    inputBlurHandler: descBlurHandler,
    setValue: setDesc,
  } = useInput((value) => value.length >= 20);
  const {
    value: enteredPrice,
    isValid: enteredPriceIsValid,
    hasError: priceInputHasError,
    valueChangeHandler: priceChangedHandler,
    inputBlurHandler: priceBlurHandler,
    setValue: setPrice,
  } = useInput((value) => value >= 50 && value <= 50000);

  const {
    value: enteredQuantity,
    isValid: enteredQuantityIsValid,
    hasError: quantityInputHasError,
    valueChangeHandler: quantityChangedHandler,
    inputBlurHandler: quantityBlurHandler,
    setValue: setQuantity,
  } = useInput((value) => value >= 10);
  const {
    value: enteredCategory,
    isValid: enteredCategoryIsValid,
    hasError: categoryInputHasError,
    valueChangeHandler: categoryChangedHandler,
    inputBlurHandler: categoryBlurHandler,
    setValue: setCategory,
  } = useInput((value) => categories.includes(value));
  const handleImage = (file) => {
    setProductImage(file);
    console.log(file);
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/category_names", {
      method: "POST",
      body: JSON.stringify({
        token: AuthCtx.token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        console.log("success");
        res.json().then((data) => {
          if (data.status == 200) {
            console.log(data);
            setCategories(data.categeries_names);
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

  let formIsValid;
  if (
    enteredNameIsValid &&
    enteredPriceIsValid &&
    enteredQuantityIsValid &&
    enteredQuantityIsValid &&
    enteredDescIsValid &&
    enteredCategoryIsValid &&
    productImage != null
  ) {
    formIsValid = true;
  }

  const addProduct = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      console.log("form not valid");
      return;
    }
    const formDate = new FormData();
    formDate.append("token", AuthCtx.token);
    formDate.append("name", enteredName);
    formDate.append("price", enteredPrice);
    formDate.append("Quantity", enteredQuantity);
    formDate.append("details", enteredDesc);
    formDate.append("category_name", enteredCategory);
    formDate.append("photo", productImage);
    axios
      .post("http://127.0.0.1:8000/api/add-product", formDate)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          console.log(res);
          snackbarRef.current.show();
          setTimeout(() => {
            navigation("/dashboard/allProducts");
          }, 1000);
        } else {
          console.log("eror");
          console.log(res);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="productForm row p-5" onSubmit={addProduct}>
        <div className="col-6">
          <label htmlFor="username">product name</label>
          <input
            title="Minimum 2 characters."
            type="text"
            className={NameInputHasError ? ` ${classes.invalid}` : ``}
            id="username"
            placeholder="Product Name"
            onChange={NameChangedHandler}
            onBlur={NameBlurHandler}
            value={enteredName}
            required
          />
          {NameInputHasError && (
            <div
              id="firstnameHelp"
              className={
                NameInputHasError
                  ? `form-text ${classes["text-inavalid"]}`
                  : `form-text`
              }
            >
              Minimum 2 characters.
            </div>
          )}
        </div>
        <div className="col-6">
          <label htmlFor="username">product description</label>
          <input
            title="Minimum 2 characters."
            type="text"
            className={descInputHasError ? ` ${classes.invalid}` : ``}
            id="username"
            placeholder="Enter product description"
            onChange={descChangedHandler}
            onBlur={descBlurHandler}
            value={enteredDesc}
            required
          />
          {descInputHasError && (
            <div
              id="firstnameHelp"
              className={
                descInputHasError
                  ? `form-text ${classes["text-inavalid"]}`
                  : `form-text`
              }
            >
              Minimum 20 characters.
            </div>
          )}
        </div>
        <div className="col-6">
          <label htmlFor="price">price</label>
          <input
            title="Minimum 2 characters."
            type="number"
            className={priceInputHasError ? ` ${classes.invalid}` : ``}
            id="price"
            placeholder="Enter product price"
            onChange={priceChangedHandler}
            onBlur={priceBlurHandler}
            value={enteredPrice}
            required
          />
          {priceInputHasError && (
            <div
              id="firstnameHelp"
              className={
                priceInputHasError
                  ? `form-text ${classes["text-inavalid"]}`
                  : `form-text`
              }
            >
              Minimum 50 EGP and Maximam is 50000 EGP.
            </div>
          )}
        </div>
        <div className="col-6">
          <label htmlFor="price">Quantity</label>
          <input
            title="Minimum 10 ."
            type="number"
            className={quantityInputHasError ? ` ${classes.invalid}` : ``}
            id="price"
            placeholder="Enter product quantity"
            onChange={quantityChangedHandler}
            onBlur={quantityBlurHandler}
            value={enteredQuantity}
            required
          />
          {quantityInputHasError && (
            <div
              id="firstnameHelp"
              className={
                quantityInputHasError
                  ? `form-text ${classes["text-inavalid"]}`
                  : `form-text`
              }
            >
              Minimum 10 .
            </div>
          )}
        </div>

        <div className="col-6">
          <label htmlFor="type">Category</label>
          <select
            required
            className={categoryInputHasError ? `invalid` : ``}
            onChange={categoryChangedHandler}
            onBlur={categoryBlurHandler}
            value={enteredCategory}
          >
            <option></option>
            {categories.map((cat, index) => {
              return <option key={index}>{cat}</option>;
            })}
          </select>
          {categoryInputHasError && (
            <div
              id="password"
              className={
                categoryInputHasError ? "form-text text-inavalid" : `form-text`
              }
            >
              Must choose on of them.
            </div>
          )}
        </div>
        <div className="col-6">
          <label>Image </label>
          <input type="file" onChange={(e) => handleImage(e.target.files[0])} />
        </div>
        <button className="productButton p-2">submit</button>
      </form>
      {
        <Snackbar
          ref={snackbarRef}
          message="Product added successfully"
          type={"success"}
        />
      }
    </div>
  );
}

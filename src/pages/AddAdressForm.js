import React, { useRef, useContext } from "react";
import Modal from "../components/layout/UI/Modal";
import useInput from "../hooks/use-input";
import { AuthContext } from "../store/auth-context";

const AddAdressForm = (props) => {
  const AuthCtx = useContext(AuthContext);

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.length >= 2);
  const {
    value: enteredPhone,
    isValid: enteredPhoneIsValid,
    hasError: phoneHasError,
    valueChangeHandler: phoneChangedHandler,
    inputBlurHandler: phoneBlurHandler,
    reset: resetPhoneInput,
  } = useInput((value) =>
    value.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
  );
  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    hasError: cityHasError,
    valueChangeHandler: cityChangedHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCityInput,
  } = useInput((value) => value.length >= 2);
  const {
    value: enteredType,
    isValid: enteredTypeIsValid,
    hasError: typeHasError,
    valueChangeHandler: typeChangedHandler,
    inputBlurHandler: typeBlurHandler,
    reset: resetTypeInput,
  } = useInput((value) => value === "HOME" || value === "WORK");

  const {
    value: enteredAddress,
    isValid: enteredAddressIsValid,
    hasError: addressHasError,
    valueChangeHandler: addressChangedHandler,
    inputBlurHandler: addressBlurHandler,
    reset: resetAddressInput,
  } = useInput((value) => value.length >= 15);
  let formIsValid = false;

  if (
    enteredNameIsValid &&
    enteredPhoneIsValid &&
    enteredCityIsValid &&
    enteredAddressIsValid &&
    enteredTypeIsValid
  ) {
    formIsValid = true;
  }
  let new_address = {};

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    new_address = {
      name: enteredName,
      address: enteredAddress,
      city: enteredCity,
      type: enteredType == "HOME" ? 0 : 1,
      phone: enteredPhone,
    };

    fetch("http://127.0.0.1:8000/api/create_address", {
      method: "POST",
      body: JSON.stringify({
        token: AuthCtx.token,
        name: enteredName,
        address: enteredAddress,
        city: enteredCity,
        phone: enteredPhone,
        type: enteredType == "HOME" ? 0 : 1,
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
            props.onAdd(new_address);
            props.onClose();
            // snackbarRef.current.show();
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

    console.log(new_address);
  };

  return (
    <Modal onClose={props.onClose}>
      <form className="container" onSubmit={formSubmissionHandler}>
        <div className="row">
          <h1 className="color">Add Adress</h1>
          <hr />
          <div className="mb-3 col-6">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter name"
              required
              className={nameHasError ? `invalid` : ``}
              onChange={nameChangedHandler}
              onBlur={nameBlurHandler}
              value={enteredName}
            />
            {nameHasError && (
              <div
                id="password"
                className={
                  nameHasError ? "form-text text-inavalid" : `form-text`
                }
              >
                Minimum 2 characters.
              </div>
            )}
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="tel"
              pattern="^01[0-2]\d{1,8}$"
              placeholder="012-222-222-22"
              
              required
              className={phoneHasError ? `invalid` : ``}
              onChange={phoneChangedHandler}
              onBlur={phoneBlurHandler}
              value={enteredPhone}
            />
            {phoneHasError && (
              <div
                id="password"
                className={
                  phoneHasError ? "form-text text-inavalid" : `form-text`
                }
              >
                Enter a avalid number like :- 012-222-222-22.
              </div>
            )}
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              placeholder="Enter Your City"
              required
              className={cityHasError ? `invalid` : ``}
              onChange={cityChangedHandler}
              onBlur={cityBlurHandler}
              value={enteredCity}
            />
            {cityHasError && (
              <div
                id="password"
                className={
                  cityHasError ? "form-text text-inavalid" : `form-text`
                }
              >
                Minimum 2 characters.
              </div>
            )}
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="type">Type</label>
            <select
              required
              className={typeHasError ? `invalid` : ``}
              onChange={typeChangedHandler}
              onBlur={typeBlurHandler}
              value={enteredType}
            >
              <option></option>
              <option>HOME</option>
              <option>WORK</option>
            </select>
            {typeHasError && (
              <div
                id="password"
                className={
                  typeHasError ? "form-text text-inavalid" : `form-text`
                }
              >
                Must choose on of them.
              </div>
            )}
          </div>
          <div className="mb-3 col-12">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              type="text"
              placeholder="Enter Your Address"
              required
              className={addressHasError ? `invalid` : ``}
              onChange={addressChangedHandler}
              onBlur={addressBlurHandler}
              value={enteredAddress}
            />
            {addressHasError && (
              <div
                id="password"
                className={
                  addressHasError ? "form-text text-inavalid" : `form-text`
                }
              >
                Minimum 15 characters.
              </div>
            )}
          </div>
          <div className="buttons d-flex justify-content-between">
            <button className="secubtn col-5 ">submit</button>
            <button
              className="secubtn btn-secondary col-5 "
              onClick={props.onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddAdressForm;

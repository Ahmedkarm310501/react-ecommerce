import React, { useRef } from "react";
import Modal from "../components/layout/UI/Modal";
import useInput from "../hooks/use-input";

const AddAdressForm = (props) => {
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
      Name: enteredName,
      address: enteredAddress,
      city: enteredCity,
      type: enteredType,
      phone: enteredPhone,
    };
    console.log(new_address);
    props.onAdd(new_address);

    props.onClose();
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
              placeholder="Enter Your Phone"
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
                Enter a avalid number.
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

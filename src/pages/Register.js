import React from "react";
import classes from "./Register.module.css";
import useInput from "../hooks/use-input";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigation = useNavigate();
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: NameInputHasError,
    valueChangeHandler: NameChangedHandler,
    inputBlurHandler: NameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.length >= 2);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@") && value.includes("."));
  const {
    value: enteredPass1,
    isValid: enteredPass1IsValid,
    hasError: pass1InputHasError,
    valueChangeHandler: pass1ChangedHandler,
    inputBlurHandler: pass1BlurHandler,
    reset: resetPass1Input,
  } = useInput((value) => value.match(/^(?=.*\d)(?=.*[a-z]).{6,20}$/));
  const {
    value: enteredPass2,
    isValid: enteredPass2IsValid,
    hasError: pass2InputHasError,
    valueChangeHandler: pass2ChangedHandler,
    inputBlurHandler: pass2BlurHandler,
    reset: resetPass2Input,
  } = useInput((value) => value.match(enteredPass1));

  let formIsValid = false;

  if (
    enteredNameIsValid &&
    enteredEmailIsValid &&
    enteredPass1IsValid &&
    enteredPass2IsValid
  ) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    fetch("http://127.0.0.1:8000/api/register", {
      method: "POST",
      body: JSON.stringify({
        name: enteredName,
        email: enteredEmail,
        password: enteredPass1,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        console.log("success");
        res.json().then((data) => {
          console.log(data);
          navigation("/login", { replace: true });
        });
      } else {
        res.json().then((data) => {
          console.log(data);
        });
      }
    });
  };
  return (
    <div className={`container`}>
      <form
        className={`m-auto col-sm-10 col-md-10 col-lg-8 ${classes.form} container bg-white`}
        onSubmit={formSubmissionHandler}
      >
        <div className="row">
          <h1 className="color">Register</h1>
          <p>Please fill in this form to create an account.</p>
          <hr />
          <div className="mb-3 col-sm-12 col-md-6">
            <label htmlFor="firstname">User name</label>
            <input
              title="Minimum 2 characters."
              type="text"
              className={NameInputHasError ? ` ${classes.invalid}` : ``}
              id="firstname"
              placeholder="Enter First Name"
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

          <div className="mb-3 col-sm-12 col-md-6">
            <label htmlFor="Email1">Email address</label>
            <input
              title={`please enter valid email contains "@" and "." `}
              type="email"
              className={emailInputHasError ? `${classes.invalid}` : ``}
              id="Email1"
              aria-describedby="emailHelp"
              onChange={emailChangedHandler}
              onBlur={emailBlurHandler}
              value={enteredEmail}
              placeholder="Eneter Email"
              required
            />

            {emailInputHasError && (
              <div
                id="emailHelp"
                className={
                  emailInputHasError
                    ? `form-text ${classes["text-inavalid"]}`
                    : `form-text`
                }
              >
                please enter valid email contains "@" and "."
              </div>
            )}
          </div>
          <div className="mb-3 col-sm-12 col-md-6">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              id="exampleInputPassword1"
              title="Minimum 8 characters contains capital and small leters and numbers and spechial character"
              className={pass1InputHasError ? `${classes.invalid}` : ``}
              onChange={pass1ChangedHandler}
              onBlur={pass1BlurHandler}
              placeholder="Enter Password"
              value={enteredPass1}
              required
            />
            {pass1InputHasError && (
              <div
                id="password"
                className={
                  pass1InputHasError
                    ? `form-text ${classes["text-inavalid"]}`
                    : `form-text`
                }
              >
                Minimum 6 characters contains leters and numbers
              </div>
            )}
          </div>

          <div className="mb-3 col-sm-12 col-md-6">
            <label htmlFor="exampleInputPassword2">Repeat Password</label>
            <input
              type="password"
              title="reapeat password"
              id="exampleInputPassword2"
              className={pass2InputHasError ? `${classes.invalid}` : ``}
              placeholder="Repeat Password"
              onChange={pass2ChangedHandler}
              onBlur={pass2BlurHandler}
              value={enteredPass2}
              required
            />
            {pass2InputHasError && (
              <div
                id="password"
                className={
                  pass2InputHasError
                    ? `form-text ${classes["text-inavalid"]}`
                    : `form-text`
                }
              >
                Its not the same password
              </div>
            )}
          </div>

          <hr />

          <p>
            By creating an account you agree to our{" "}
            <Link to="#">Terms Privacy</Link>.
          </p>
          <button type="submit" className="registerbtn">
            Register
          </button>
        </div>
        <div className="container signin">
          <p>
            Already have an account? <Link to="/login">Sign in</Link>.
          </p>
        </div>
      </form>
    </div>
  );
};
export default Register;

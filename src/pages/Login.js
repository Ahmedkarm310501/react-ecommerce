import React from "react";
import classes from "./Login.module.css";
import useInput from "../hooks/use-input";
import { useNavigate, Link } from "react-router-dom";
const Login = () => {
  const navigation = useNavigate();
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
  } = useInput((value) =>
    value.match(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
    )
  );
  let formIsValid = false;
  if (enteredEmailIsValid && enteredPass1IsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    resetEmailInput();
    resetPass1Input();

    navigation("/home", { replace: true });
  };

  return (
    <div className={`container`}>
      <div className="row">
        <form
          className={`col-6  ${classes.form} container`}
          onSubmit={formSubmissionHandler}
        >
          <div className="row">
            <div className="mb-3 col-12">
              <h1 className="color">Login</h1>
              <p>Please fill in this form to login to your account.</p>
              <hr />
            </div>
            <div className="mb-3 col-12">
              <label htmlFor="Email1">Email address</label>
              <input
                type="email"
                className={emailInputHasError ? ` ${classes.invalid}` : ``}
                id="Email1"
                aria-describedby="emailHelp"
                placeholder="Enter Email"
                onChange={emailChangedHandler}
                onBlur={emailBlurHandler}
                value={enteredEmail}
                required
              />
              <div
                id="emailHelp"
                className={
                  emailInputHasError
                    ? `form-text ${classes["text-inavalid"]}`
                    : `form-text`
                }
              >
                Enter valid Email.
              </div>
            </div>
            <div className="mb-3 col-12">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                id="exampleInputPassword1"
                placeholder="Enter Password"
                className={pass1InputHasError ? `${classes.invalid}` : ``}
                onChange={pass1ChangedHandler}
                onBlur={pass1BlurHandler}
                value={enteredPass1}
                required
              />
              <div
                id="password"
                className={
                  pass1InputHasError
                    ? `form-text ${classes["text-inavalid"]}`
                    : `form-text`
                }
              >
                Minimum 6 characters
              </div>
            </div>

            <button className="registerbtn">Submit</button>
          </div>
        </form>
        <div
          className={`col-6 ${classes.join} ${classes.form} d-flex flex-column justify-content-between`}
        >
          <div className="">
            <h1 className="color">Join us</h1>
            <hr />
          </div>

          <p>
            Create your E-shop customer account in just a few clicks! You can
            register using your e-mail
          </p>
          <Link to="/register">
            <button className="registerbtn">create an account via email</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

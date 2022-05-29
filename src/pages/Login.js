import React, { useContext, useState, useRef } from "react";
import classes from "./Login.module.css";
import useInput from "../hooks/use-input";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../store/auth-context";
import Snackbar from "../components/layout/UI/Snackbar";

const Login = () => {
  const navigation = useNavigate();
  const [emailOrPasswordError, setEmailOrPasswordError] = useState(false);
  const AuthCtx = useContext(AuthContext);
  const snackbarRef = useRef(null);
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.length >= 2);
  const {
    value: enteredPass1,
    isValid: enteredPass1IsValid,
    hasError: pass1InputHasError,
    valueChangeHandler: pass1ChangedHandler,
    inputBlurHandler: pass1BlurHandler,
    reset: resetPass1Input,
  } = useInput((value) => value.match(/^(?=.*\d)(?=.*[a-z]).{6,20}$/));
  let formIsValid = false;
  if (enteredEmailIsValid && enteredPass1IsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      body: JSON.stringify({
        name: enteredEmail,
        password: enteredPass1,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        console.log("success");
        res.json().then((data) => {
          if (data.status == 403) {
            console.log("Email or password is not correct");
            setEmailOrPasswordError(true);
            return;
          }
          console.log(data);
          AuthCtx.login(data.token);
          AuthCtx.setName(data.username);
          AuthCtx.setIsAdmin(data.isAdmin);
          console.log(data.username);
          if (data.isAdmin === 0) {
            navigation("/home", { replace: true });


          } else {
            navigation("/dashboard", { replace: true });
            snackbarRef.current.show();
            <Snackbar
            ref={snackbarRef}
            message="Welcome Admin!"
            type={"success"}
          />
          

          } if (data.isAdmin === 1) {

          } else if (data.isAdmin === 1) {

            navigation("/dashboard", { replace: true });
          }
        });
      } else {
        res.json().then((data) => {
          console.log(data);
        });
      }
    });

    //navigation("/home", { replace: true });
  };

  return (
    <div className={`container`}>
      <div className="row">
        <form
          className={`col-sm-12 col-md-10 col-lg-6  ${classes.form} container bg-white`}
          onSubmit={formSubmissionHandler}
        >
          <div className="row">
            <div className="mb-3 col-12">
              <h1 className="color">Login</h1>
              <p>Please fill in this form to login to your account.</p>
              <hr />
            </div>
            <div className="mb-3 col-12">
              <label htmlFor="Email1">User name</label>
              <input
                type="text"
                className={emailInputHasError ? ` ${classes.invalid}` : ``}
                id="Email1"
                title={`more than 2 charcter`}
                aria-describedby="emailHelp"
                placeholder="Enter User name"
                onChange={emailChangedHandler}
                onBlur={() => {
                  emailBlurHandler();
                  setEmailOrPasswordError(false);
                }}
                value={enteredEmail}
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
                  more than 2 charcter
                </div>
              )}
            </div>
            <div className="mb-3 col-12">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                id="exampleInputPassword1"
                placeholder="Enter Password"
                title="Minimum 8 characters contains capital and small leters and
                numbers and spechial character"
                className={pass1InputHasError ? `${classes.invalid}` : ``}
                onChange={pass1ChangedHandler}
                onBlur={() => {
                  pass1BlurHandler();
                  setEmailOrPasswordError(false);
                }}
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
              {emailOrPasswordError && (
                <div
                  id="password"
                  className={`form-text ${classes["text-inavalid"]}`}
                >
                  Email or password is not correct
                </div>
              )}
            </div>
            <button className="registerbtn">Submit</button>
          </div>
        </form>
        <div
          className={`m-md-auto m-lg-0 col-sm-12 col-md-10 col-lg-6 ${classes.join} ${classes.form} d-flex flex-column justify-content-between bg-white`}
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

import useInput from "../hooks/use-input";
import classes from "./ForgetPassword.module.css";
import Snackbar from "../components/layout/UI/Snackbar";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const navigation = useNavigate();
  const snackbarRef = useRef(null);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@") && value.includes("."));

  let formIsValid;
  if (enteredEmailIsValid) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    fetch("http://127.0.0.1:8000/api/forget-pasword", {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
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
            snackbarRef.current.show();
            setTimeout(() => {
              navigation("/login", { replace: true });
            }, 1000);
          } else {
            console.log(data);
          }
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
      <div className="row mt-5 mb-5">
        <form
          className={`col-sm-12 col-md-10 col-lg-6  ${classes.form} container bg-white`}
          onSubmit={formSubmissionHandler}
        >
          <div className="row">
            <div className="mb-3 col-12">
              <h1 className="color">Forget Password</h1>
              <p>Please fill in this form to get your account password.</p>
              <hr />
            </div>
          </div>
          <div className="mb-3 col-12">
            <label htmlFor="Email1">Email address</label>
            <input
              type="email"
              className={emailInputHasError ? ` ${classes.invalid}` : ``}
              id="Email1"
              title={`please enter valid email contains "@" and "."`}
              aria-describedby="emailHelp"
              placeholder="Enter Email"
              onChange={emailChangedHandler}
              onBlur={() => {
                emailBlurHandler();
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
                please enter valid email contains "@" and "."
              </div>
            )}
          </div>
          <hr />
          <button className="registerbtn">submit</button>
        </form>
        {
          <Snackbar
            ref={snackbarRef}
            message={"Email sent successfully"}
            type={"success"}
          />
        }
      </div>
    </div>
  );
};

export default ForgetPassword;

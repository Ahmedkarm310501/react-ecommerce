import "./NewUser.css";
import useInput from "../../hooks/use-input";
import classes from "../Register.module.css";
import { AuthContext } from "../../store/auth-context";
import { useState, useContext, useRef } from "react";
import Snackbar from "../../components/layout/UI/Snackbar";
import { useNavigate } from "react-router-dom";
export default function NewUser() {
  const AuthCtx = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(0);
  const [suspended, setSuspended] = useState(0);
  const navigation = useNavigate();
  const snackbarRef = useRef(null);
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: NameInputHasError,
    valueChangeHandler: NameChangedHandler,
    inputBlurHandler: NameBlurHandler,
    reset: resetNameInput,
    setValue: setName,
  } = useInput((value) => value.length >= 2);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
    setValue: setEmail,
  } = useInput((value) => value.includes("@") && value.includes("."));
  const {
    value: enteredPass1,
    isValid: enteredPass1IsValid,
    hasError: pass1InputHasError,
    valueChangeHandler: pass1ChangedHandler,
    inputBlurHandler: pass1BlurHandler,
    reset: resetPass1Input,
    setValue: setPass,
  } = useInput((value) => value.match(/^(?=.*\d)(?=.*[a-z]).{6,20}$/));

  var dateFrom = "01/01/1930";
  var dateTo = "01/01/2005";

  var from = Date.parse(dateFrom);
  var to = Date.parse(dateTo);
  const {
    value: enteredDate,
    isValid: enteredDateIsValid,
    hasError: dateHasError,
    valueChangeHandler: dateChangedHandler,
    inputBlurHandler: dateBlurHandler,
    reset: resetDateInput,
    setValue: setDate,
  } = useInput((value) => Date.parse(value) <= to && Date.parse(value) >= from);
  let formIsValid;
  if (
    enteredNameIsValid &&
    enteredEmailIsValid &&
    enteredPass1IsValid &&
    enteredDateIsValid
  ) {
    formIsValid = true;
  }
  const addUser = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    fetch("http://127.0.0.1:8000/api/add-user", {
      method: "POST",
      body: JSON.stringify({
        token: AuthCtx.token,
        name: enteredName,
        email: enteredEmail,
        date_of_birth: enteredDate,
        status: suspended,
        Is_Admin: isAdmin,
        password: enteredPass1,
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
              navigation("/dashboard/allUsers");
            }, 1000);
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
  };

  return (
    <div className="newUser p-5">
      <h1 className="newUserTitle">New User</h1>
      <div className="container">
        <form
          className="userUpdateForm row "
          autoComplete="false"
          onSubmit={addUser}
        >
          <div className="userUpdateLeft col-6">
            <div className="userUpdateItem mb-3">
              <label htmlFor="username">Username</label>
              <input
                title="Minimum 2 characters."
                type="text"
                className={NameInputHasError ? ` ${classes.invalid}` : ``}
                id="username"
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

            <div className="userUpdateItem mb-3">
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
            <div className="userUpdateItem mb-3">
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
          </div>
          <div className="userUpdateRight col-6">
            <div className="userUpdateItem mb-3">
              <label>Date of birth</label>
              <input
                type="date"
                title="Enter Date"
                id="date"
                className={dateHasError ? `${classes.invalid}` : ``}
                onChange={dateChangedHandler}
                onBlur={dateBlurHandler}
                value={enteredDate}
                required
              />
              {dateHasError && (
                <div
                  id="date"
                  className={
                    dateHasError
                      ? `form-text ${classes["text-inavalid"]}`
                      : `form-text`
                  }
                >
                  Date must be between 1930 and 2004
                </div>
              )}
            </div>
            <div className="userUpdateItem d-flex flex-row mb-3">
              <label>Is Admin</label>
              <input
                type="checkbox"
                className="userUpdateInput text-right"
                onChange={(event) => {
                  event.target.checked ? setIsAdmin(1) : setIsAdmin(0);
                }}
              />
            </div>
            <div className="userUpdateItem d-flex flex-row mb-3">
              <label>Suspended</label>
              <input
                type="checkbox"
                className="userUpdateInput text-right"
                onChange={() => {}}
                onClick={() => {
                  suspended == 0 ? setSuspended(1) : setSuspended(0);
                }}
              />
            </div>
          </div>
          <button className="userUpdateButton col-12 ">submit</button>
        </form>
        {
          <Snackbar
            ref={snackbarRef}
            message="User updated successfully"
            type={"success"}
          />
        }
      </div>
    </div>
  );
}

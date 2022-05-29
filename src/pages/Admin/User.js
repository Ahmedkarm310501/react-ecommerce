import Snackbar from "../../components/layout/UI/Snackbar";

import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState, useRef } from "react";
import "./user.css";
import classes from "../Register.module.css";
import useInput from "../../hooks/use-input";
import { AuthContext } from "../../store/auth-context";
import noPhoto from "../../assets/userImage.png";
export default function User() {
  const AuthCtx = useContext(AuthContext);
  const param = useParams();
  const navigation = useNavigate();
  // const [username, setUserName] = useState(null);
  // const [email, setEmail] = useState(null);
  // const [password, setPassword] = useState(null);
  // const [dateOfBirth, setDateOfBirth] = useState(null);
  const snackbarRef = useRef(null);

  const [photo, setPhoto] = useState(noPhoto);
  const [isAdmin, setIsAdmin] = useState(null);
  const [suspended, setSuspended] = useState(null);
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

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/get-user", {
      method: "POST",
      body: JSON.stringify({
        token: AuthCtx.token,
        id: param.userid,
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
            setName(data.user.name);
            setEmail(data.user.email);
            setDate(data.user.date_of_birth);
            setIsAdmin(data.user.Is_Admin);
            setSuspended(data.user.status);
            if (data.user.profile_photo_path != null) {
              setPhoto(`http://localhost:8000/${data.user.profile_photo_path}`);
            }
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
    enteredEmailIsValid &&
    enteredPass1IsValid &&
    enteredDateIsValid
  ) {
    formIsValid = true;
  }
  const updateUser = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    fetch("http://127.0.0.1:8000/api/update-user", {
      method: "POST",
      body: JSON.stringify({
        token: AuthCtx.token,
        name: enteredName,
        id: param.userid,
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
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="newUser">
          <button className="userAddButton">Create</button>
        </Link> 
      </div>
      <div className="userContainer">
        <div className="userUpdate">
          <div className="userUpdateTitle">Edit</div>
          <form
            className="userUpdateForm row"
            autoComplete="false"
            onSubmit={updateUser}
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
              <div className="userUpdateUpload ms-auto mb-3">
                <img className="userUpdateImg " src={photo} alt="" />
              </div>
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
                  checked={isAdmin == 1}
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
                  checked={suspended == 0}
                  onChange={() => {}}
                  onClick={() => {
                    suspended == 0 ? setSuspended(1) : setSuspended(0);
                  }}
                />
              </div>
            </div>
            <button className="userUpdateButton col-12 ">Update</button>
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
    </div>
  );
}

import React, { useContext, useRef } from "react";
import Modal from "../components/layout/UI/Modal";
import useInput from "../hooks/use-input";
import { AuthContext } from "../store/auth-context";
import Snackbar from "../components/layout/UI/Snackbar";

const ResetPassword = (props) => {
  const AuthCtx = useContext(AuthContext);
  const snackbarRef = useRef(null);
  const {
    value: enteredCur,
    isValid: enteredCurIsValid,
    hasError: curHasError,
    valueChangeHandler: curChangedHandler,
    inputBlurHandler: curBlurHandler,
    reset: resetCurInput,
  } = useInput((value) => value.match(/^(?=.*\d)(?=.*[a-z]).{6,20}$/));

  const {
    value: enteredNew1,
    isValid: enteredNew1IsValid,
    hasError: new1HasError,
    valueChangeHandler: new1ChangedHandler,
    inputBlurHandler: new1BlurHandler,
    reset: resetNew1Input,
  } = useInput((value) => value.match(/^(?=.*\d)(?=.*[a-z]).{6,20}$/));

  const {
    value: enteredNew2,
    isValid: enteredNew2IsValid,
    hasError: new2HasError,
    valueChangeHandler: new2ChangedHandler,
    inputBlurHandler: new2BlurHandler,
    reset: resetNew2Input,
  } = useInput((value) => value.match(enteredNew1));

  let formIsValid = false;

  if (enteredCurIsValid && enteredNew1IsValid && enteredNew2IsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    fetch("http://127.0.0.1:8000/user/update-password", {
      method: "PUT",
      body: JSON.stringify({
        oldPassword: enteredCur,
        newPassword: enteredNew1,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: AuthCtx.token,
      },
    }).then((res) => {
      if (res.ok) {
        console.log("success");
        res.json().then((data) => {
          if (res.status == 200) {
            snackbarRef.current.show();
            props.onClose();
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
    <Modal onClose={props.onClose}>
      <form className="p-3" onSubmit={formSubmissionHandler}>
        <h1 className="color">Reset Password</h1>
        <hr />
        <div className="mb-3">
          <label htmlFor="curpassword">Current Password</label>
          <input
            id="curpassword"
            type="password"
            placeholder="Enter current password"
            className={curHasError ? `invalid` : ``}
            onChange={curChangedHandler}
            onBlur={curBlurHandler}
            value={enteredCur}
            required
          />
          {curHasError && (
            <div
              id="password"
              className={curHasError ? "form-text text-inavalid" : `form-text`}
            >
              Minimum 8 characters contains capital and small leters and numbers
              and spechial character
            </div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="newpassword">New password</label>
          <input
            type="password"
            id="newpassword"
            placeholder="Enter new password"
            className={new1HasError ? `invalid` : ``}
            onChange={new1ChangedHandler}
            onBlur={new1BlurHandler}
            value={enteredNew1}
            required
          />
          {new1HasError && (
            <div
              id="password"
              className={new1HasError ? "form-text text-inavalid" : `form-text`}
            >
              Minimum 8 characters contains capital and small leters and numbers
              and spechial character
            </div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="reapeatpassword">Reapeat password</label>
          <input
            type="password"
            id="reapeatpassword"
            placeholder="Repeat  password"
            className={new2HasError ? `invalid` : ``}
            onChange={new2ChangedHandler}
            onBlur={new2BlurHandler}
            value={enteredNew2}
            required
          />
          {new2HasError && (
            <div
              id="password"
              className={new2HasError ? "form-text text-inavalid" : `form-text`}
            >
              Its not the same password
            </div>
          )}
        </div>
        <button className="secubtn me-4">submit</button>
        <button className="secubtn btn-secondary" onClick={props.onClose}>
          Cancel
        </button>
        {
          <Snackbar
            ref={snackbarRef}
            message="Password Updated  Successfully!"
            type={"success"}
          />
        }
      </form>
    </Modal>
  );
};

export default ResetPassword;

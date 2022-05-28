import React, { useRef, useContext } from "react";
import Modal from "../components/layout/UI/Modal";
import Snackbar from "../components/layout/UI/Snackbar";
import { AuthContext } from "../store/auth-context";
import { useNavigate } from "react-router-dom";
const DeleteAccountModal = (props) => {
  const navigation = useNavigate();
  const AuthCtx = useContext(AuthContext);
  const snackbarRef = useRef(null);
  const deleteAccountHandler = () => {
    fetch("http://127.0.0.1:8000/api/delete-user", {
      method: "DELETE",
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
            snackbarRef.current.show();
            AuthCtx.logout();
            navigation("/login", { replace: true });
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
      <h1 className="color">Delete Account</h1>
      <hr />
      <p>Are you sure ,you want to delete your account</p>
      <button
        className="secubtn btn-danger me-4"
        onClick={deleteAccountHandler}
      >
        Delete
      </button>
      <button className="secubtn btn-secondary" onClick={props.onClose}>
        Cancel
      </button>
      {
        <Snackbar
          ref={snackbarRef}
          message="Data Updated  Successfully!"
          type={"success"}
        />
      }
    </Modal>
  );
};

export default DeleteAccountModal;

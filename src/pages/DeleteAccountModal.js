import React from "react";
import Modal from "../components/layout/UI/Modal";
const DeleteAccountModal = (props) => {
  return (
    <Modal onClose={props.onClose}>
      <h1 className="color">Delete Account</h1>
      <hr />
      <p>Are you sure ,you want to delete your account</p>
      <button className="secubtn btn-danger me-4">Delete</button>
      <button className="secubtn btn-secondary" onClick={props.onClose}>
        Cancel
      </button>
    </Modal>
  );
};

export default DeleteAccountModal;

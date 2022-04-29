import React, { Fragment, useState } from "react";
import ResetPassword from "./ResetPassword";
import DeleteAccountModal from "./DeleteAccountModal";

const ProfileData = () => {
  const [passwordModal, setPasswordModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const showModal = (event) => {
    event.preventDefault();
    setPasswordModal(true);
  };
  const hideModal = () => {
    setPasswordModal(false);
  };

  const showDelete = (event) => {
    event.preventDefault();
    setDeleteModal(true);
  };
  const hideDelete = () => {
    setDeleteModal(false);
  };
  return (
    <Fragment>
      <div className="page-haeder  col-12 ">
        <h1>Profile</h1>
        <p>
          Manage your details, view your tier status and change your password
        </p>
      </div>
      <div className="info col-12 bg-white mb-5">
        <form className="d-flex flex-column p-3">
          <h1>General Info</h1>
          <hr className="mb-4" />
          <div className="inputs d-flex flex-wrap mb-4 justify-content-between">
            <div className="col-12 col-md-3">
              <label htmlFor="first">First name</label>
              <input
                type="text"
                id="first"
                value={`Amr`}
                onChange={() => {}}
                required
              />
            </div>
            <div className="col-12 col-md-3">
              <label htmlFor="last">Last name</label>
              <input
                type="text"
                id="last"
                value={`ismail`}
                onChange={() => {}}
                required
              />
            </div>
            <div className="col-12 col-md-3">
              <label htmlFor="select">Language</label>
              <select id="select">
                <option>English</option>
                <option>العربية</option>
              </select>
            </div>
          </div>
          <button className="secubtn mb-4 ">Update Info</button>
        </form>
      </div>
      <div className="security col-12  bg-white mb-5">
        <form className="d-flex flex-column p-3">
          <h1>Security</h1>
          <hr className="mb-4" />
          <div className="inputs d-flex flex-wrap mb-4 ">
            <div className="col-12 col-md me-3 ">
              <label htmlFor="first">Email</label>
              <input
                type="email"
                id="email"
                value={`amrismail333@gmail.com`}
                onChange={() => {}}
                required
              />
            </div>
            <div className="col-12 col-md mx-md-3 ">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={`123456789`}
                onChange={() => {}}
                required
              />
            </div>
          </div>
          <div className="actions mb-4">
            <button className="secubtn me-3" onClick={showModal}>
              Change Password
            </button>
            <button className="secubtn btn-danger" onClick={showDelete}>
              Delete account
            </button>
            {passwordModal && <ResetPassword onClose={hideModal} />}
            {deleteModal && <DeleteAccountModal onClose={hideDelete} />}
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default ProfileData;

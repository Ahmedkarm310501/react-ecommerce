import React, { Fragment, useState, useRef } from "react";
import Modal from "../components/layout/UI/Modal";
import AddAdressForm from "./AddAdressForm";
import Snackbar from "../components/layout/UI/Snackbar";

const addresses = [
  {
    Name: "Ahmed Karam",
    address: "223 Still Street",
    city: "cairo",
    type: "Home",
    phone: 11256358866,
  },
  {
    Name: "Amr isamil",
    address: "3086 Kimberly Way",
    city: "Rockford",
    type: "Work",
    phone: 46554634565,
  },
  {
    Name: "abdo ali",
    address: "1142 Hurry Street",
    city: "Fredericksburg",
    type: "Home",
    phone: 9472028520,
  },
];
const DeleteMessage = (props) => {
  return (
    <Modal onClose={props.onClose}>
      <h1 className="color">Delete Address</h1>
      <hr />
      <p>Are you sure ,you want to delete this address</p>
      <button className="secubtn btn-danger me-4">Delete</button>
      <button className="secubtn btn-secondary" onClick={props.onClose}>
        Cancel
      </button>
    </Modal>
  );
};

const AdressData = () => {
  const [add, setAdd] = useState(addresses);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addressModal, setAddressModal] = useState(false);
  const snackbarRef = useRef(null);
  const addNewAddress = (address) => {
    setAdd([...add, address]);
    snackbarRef.current.show();
  };

  const showDeleteModal = () => {
    setDeleteModal(true);
  };
  const hideDeleteModal = () => {
    setDeleteModal(false);
  };
  const showAdressModal = () => {
    setAddressModal(true);
  };
  const hideAdressModal = () => {
    setAddressModal(false);
  };
  return (
    <Fragment>
      <div className="page-haeder col-12 ">
        <h1>Adresses</h1>
        <p>
          Manage your saved addresses for fast and easy checkout across our
          marketplaces
        </p>
      </div>
      <div className="address-btn col-12">
        <button className="secubtn" onClick={showAdressModal}>
          ADD NEW ADDRESS
        </button>
        {addressModal && (
          <AddAdressForm onClose={hideAdressModal} onAdd={addNewAddress} />
        )}
        {
          <Snackbar
            ref={snackbarRef}
            message="Address added  Successfully!"
            type={"success"}
          />
        }
      </div>
      <div className="addresses-section col-12">
        <div className="addresses">
          {add.map((adderes) => {
            return (
              <div key={adderes.address} className="adderss p-3 my-3 bg-white">
                <div className="type ps-2">{adderes.type}</div>
                <div className="type">
                  <div>Name :</div>
                  <span>{adderes.Name}</span>
                </div>
                <div className="type">
                  <div>Address :</div>
                  <span>{adderes.address}</span>
                </div>
                <div className="type">
                  <div>City :</div>
                  <span>{adderes.city}</span>
                </div>
                <div className="type">
                  <div>Phone :</div>
                  <span>{adderes.phone}</span>
                </div>
                <button
                  className="secubtn btn-danger del-add"
                  onClick={showDeleteModal}
                >
                  Delete
                </button>
              </div>
            );
          })}
          {deleteModal && <DeleteMessage onClose={hideDeleteModal} />}
        </div>
      </div>
    </Fragment>
  );
};

export default AdressData;

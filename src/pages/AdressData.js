import React, {
  Fragment,
  useState,
  useRef,
  useContext,
  useEffect,
} from "react";
import Modal from "../components/layout/UI/Modal";
import AddAdressForm from "./AddAdressForm";
import Snackbar from "../components/layout/UI/Snackbar";
import { AuthContext } from "../store/auth-context";
import { useNavigate } from "react-router-dom";

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
  const navigation = useNavigate();
  const AuthCtx = useContext(AuthContext);

  const deleteAddressHandler = () => {
    fetch("http://127.0.0.1:8000/api/delete_address", {
      method: "DELETE",
      body: JSON.stringify({
        token: AuthCtx.token,
        id: props.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        console.log("success");
        console.log(props.id);
        res.json().then((data) => {
          if (data.status == 200) {
            // navigation("/profile/adresses", { replace: true });
            // snackbarRef.current.show();
            props.onDelete();
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
      <h1 className="color">Delete Address</h1>
      <hr />
      <p>Are you sure ,you want to delete this address</p>
      <button
        className="secubtn btn-danger me-4"
        onClick={() => {
          deleteAddressHandler();
          props.onClose();
        }}
      >
        Delete
      </button>
      <button className="secubtn btn-secondary" onClick={props.onClose}>
        Cancel
      </button>
    </Modal>
  );
};

const AdressData = () => {
  const AuthCtx = useContext(AuthContext);

  const [add, setAdd] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addressModal, setAddressModal] = useState(false);
  const [addressID, setAddressID] = useState(null);
  const snackbarRef = useRef(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/get_all_users_address", {
      method: "POST",
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
            console.log(data);
            let newArrayDataOfOjbect = Object.values(data.addresses);
            setAdd(newArrayDataOfOjbect);
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

  const addNewAddress = (address) => {
    setAdd([...add, address]);
    snackbarRef.current.show();
  };
  const delete_address = (id) => {
    const newAddress = add.filter((address) => address.id !== id);
    setAdd(newAddress);
  };
  const showDeleteModal = (id) => {
    console.log(id);
    setAddressID(id);
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
      <div className="page-haeder col-12 pt-5">
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
      <div className="addresses-section col-12 pb-5">
        <div className="addresses">
          {add.map((adderes) => {
            return (
              <div key={adderes.address} className="adderss p-3 my-3 bg-white">
                <div className="type ps-2">
                  {adderes.type == 0 ? "HOME" : "WORK"}
                </div>
                <div className="type">
                  <div>Name :</div>
                  <span>{adderes.name}</span>
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
                  onClick={() => {
                    showDeleteModal(adderes.id);
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
          {deleteModal && (
            <DeleteMessage
              id={addressID}
              onClose={hideDeleteModal}
              onDelete={() => {
                delete_address(addressID);
              }}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default AdressData;

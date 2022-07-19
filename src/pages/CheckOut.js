import React, { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../store/auth-context";
import { useNavigate, Link } from "react-router-dom";
import Snackbar from "../components/layout/UI/Snackbar";
// const addresses = [
//   {
//     Name: "Ahmed Karam",
//     address: "223 Still Street",
//     city: "cairo",
//     type: "Home",
//     phone: 11256358866,
//   },
//   {
//     Name: "Amr isamil",
//     address: "3086 Kimberly Way",
//     city: "Rockford",
//     type: "Work",
//     phone: 46554634565,
//   },
// ];
const CheckOut = () => {
  const navigation = useNavigate();
  const AuthCtx = useContext(AuthContext);
  const [deliveryFee, setDeliveryFee] = useState();
  const [deliveryCost, setDeliveryCost] = useState("Free");
  const [subTotal, setSubTotal] = useState(null);
  const [total, setTotal] = useState(null);
  const [addresses, setAddress] = useState([]);
  const [productIDs, setProductIDs] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const snackbarRef = useRef(null);
  const snackbarRef2 = useRef(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/user/check-out", {
      headers: {
        Authorization: AuthCtx.token,
      },
    }).then((res) => {
      if (res.ok) {
        console.log("success");
        res.json().then((data) => {
          if (res.status == 200) {
            console.log(data);
            if (data.products.length == 0) {
              navigation("/home", { replace: true });
            }
            setAddress(data.userAddresses);
            setSubTotal(data.totalPrice);
            setTotal(data.totalPrice);
            setProductIDs(data.products);
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

  const addPlaceOrderHandler = () => {
    if (selectedAddress == null || deliveryFee == null) {
      snackbarRef.current.show();
      return;
    }
    fetch("http://127.0.0.1:8000/user/add-order", {
      method: "POST",
      body: JSON.stringify({
        addressId: selectedAddress,
        deleviryType: deliveryFee,
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
            snackbarRef2.current.show();
            setTimeout(() => {
              navigation("/home", { replace: true });
            }, 1500);
            console.log(data);
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
    <div className="checkout py-5">
      <div className="container">
        <div className="row">
          <div className="content bg-white p-3 col-8">
            {addresses.length > 0 ? (
              <div className="addresses-section ">
                <div className="header fs-3 mx-3 pt-3">Choose one address</div>
                <hr />
                <div className="addresses ">
                  {addresses.map((adderes, index) => {
                    return (
                      <div
                        key={adderes.address}
                        className="adderss p-3 my-3 bg-white add d-flex"
                      >
                        <input
                          className="rad"
                          type="radio"
                          name="address"
                          onClick={() => {
                            setSelectedAddress(adderes.id);
                          }}
                        />
                        <div>
                          <div className="type">
                            <div>Name :</div>
                            <span>{adderes.name}</span>
                          </div>
                          <div className="type">
                            <div>Address :</div>
                            <span>{adderes.address}</span>
                          </div>
                          <div className="type">
                            <div>Phone :</div>
                            <span>{adderes.phone}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="d-flex justify-content-around align-items-center flex-column h-100">
                <div className="fs-2">
                  You dont have Addresses , Add one to order
                </div>
                <Link to="/profile/adresses">
                  <button className="secubtn fs-2">Add Address</button>
                </Link>
              </div>
            )}
          </div>
          {
            <Snackbar
              ref={snackbarRef}
              message="You should select address and delivery type"
              type={"fail"}
            />
          }
          {
            <Snackbar
              ref={snackbarRef2}
              message="Order placed successfully"
              type={"success"}
            />
          }
          <div className="col-4">
            <div className="con bg-white d-flex flex-column">
              <div>
                <div className="header fs-3 mx-3 pt-3">CheckOut</div>
                <hr />
              </div>
              <div className="sec d-flex justify-content-between p-3 fs-5 ">
                <div>Subtotal</div>
                <div>EGP {subTotal}</div>
              </div>
              <div className="sec d-flex justify-content-between p-3 fs-5">
                <div>Shipping Details</div>
                <div>{deliveryCost}</div>
              </div>
              <hr />
              <div className="sec d-flex justify-content-between p-3 fs-5">
                <div>Total</div>
                <div>EGP {total}</div>
              </div>
              <div className="d-flex justify-content-center p-3 fs-5">
                <button
                  className="secubtn"
                  style={{ width: "100%" }}
                  onClick={addPlaceOrderHandler}
                >
                  Place order
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="content bg-white p-3 col-8 mt-3">
            <div className="addresses-section ">
              <div className="header fs-3 mx-3 pt-3">
                Choose delivery method
              </div>
              <hr />
              <div className="addresses ">
                <div className="adderss p-3 my-3 bg-white add d-flex">
                  <div>
                    <div className="typee">
                      <input
                        className="rad"
                        type="radio"
                        name="fee"
                        onClick={() => {
                          setDeliveryFee(0);
                          setDeliveryCost("Free");
                          setTotal(subTotal);
                        }}
                      />
                      <div>Normal Charge</div>
                      <span>(delevring in 24 days)</span>
                    </div>
                    <div className="typee">
                      <input
                        className="rad"
                        type="radio"
                        name="fee"
                        onClick={() => {
                          setDeliveryFee(1);
                          setDeliveryCost("EGP 50");
                          setTotal(subTotal + 50);
                        }}
                      />
                      <div>Fast Charge</div>
                      <span>(delevring in 24 hour)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;

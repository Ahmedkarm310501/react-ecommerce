import React from "react";
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
];
const CheckOut = () => {
  return (
    <div className="checkout">
      <div className="container">
        <div className="row">
          <div className="content bg-white p-3 col-8">
            <div className="addresses-section ">
              <div className="header fs-3 mx-3 pt-3">Choose one address</div>
              <hr />
              <div className="addresses ">
                {addresses.map((adderes) => {
                  return (
                    <div
                      key={adderes.address}
                      className="adderss p-3 my-3 bg-white add d-flex"
                    >
                      <input className="rad" type="radio" name="address" />
                      <div>
                        <div className="type">
                          <div>Name :</div>
                          <span>{adderes.Name}</span>
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
          </div>

          <div className="col-4">
            <div className="con bg-white d-flex flex-column">
              <div>
                <div className="header fs-3 mx-3 pt-3">CheckOut</div>
                <hr />
              </div>
              <div className="sec d-flex justify-content-between p-3 fs-5 ">
                <div>Subtotal (5 items)</div>
                <div>EGP 2000</div>
              </div>
              <div className="sec d-flex justify-content-between p-3 fs-5">
                <div>Shipping Details</div>
                <div>Free</div>
              </div>
              <hr />
              <div className="sec d-flex justify-content-between p-3 fs-5">
                <div>Total</div>
                <div>EGP 2000</div>
              </div>
              <div className="d-flex justify-content-center p-3 fs-5">
                <button className="secubtn" style={{ width: "100%" }}>
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
                      <input className="rad" type="radio" name="address" />
                      <div>Normal Charge</div>
                      <span>(delevring in 24 days)</span>
                    </div>
                    <div className="typee">
                      <input className="rad" type="radio" name="address" />
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

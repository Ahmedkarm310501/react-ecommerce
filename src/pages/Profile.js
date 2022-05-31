import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Profile = () => {
  return (
    <main className="profile">
      <div className="container ">
        <div className="row">
          <div className="side col-12   col-md-3 py-5">
            <aside className="asid d-flex flex-row  flex-md-column ">
              <div className="link col">
                <NavLink
                  className={(cur) => (cur.isActive ? `active-profile` : ``)}
                  to="profile"
                >
                  <i className="fa-solid fa-user me-3"></i>
                  Profile
                </NavLink>
              </div>
              <div className="link col">
                <NavLink
                  className={(cur) => (cur.isActive ? `active-profile` : ``)}
                  to="orders"
                >
                  <i className="fa-solid fa-cart-flatbed me-3"></i>
                  Orders
                </NavLink>
              </div>
              <div className="link col">
                <NavLink
                  className={(cur) => (cur.isActive ? `active-profile` : ``)}
                  to="adresses"
                >
                  <i className="fa-solid fa-location-dot me-3"></i>
                  Address
                </NavLink>
              </div>
              <div className="link col">
                <NavLink
                  className={(cur) => (cur.isActive ? `active-profile` : ``)}
                  to="favourites"
                >
                  <i className="fa-solid fa-heart me-3"></i>
                  Favourites
                </NavLink>
              </div>
              {/* <div className="link col">
                <NavLink
                  className={(cur) => (cur.isActive ? `active-profile` : ``)}
                  to="returns"
                >
                  <i className="fa-solid fa-arrow-rotate-left me-3"></i> Returns
                </NavLink>
              </div> */}
            </aside>
          </div>
          <div className="main-content col-12 col-md-9">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;

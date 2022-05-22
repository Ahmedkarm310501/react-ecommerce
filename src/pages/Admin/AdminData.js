import React from "react";
import { Outlet } from "react-router-dom";
import "./Admin.css";
import {
  Home,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import "./Admin.css";
export default function AdminData() {
  return (
    <>
      <div className="containerSide">
        <div className="sidebar">
          <div className="sidebarWrapper">
            <div className="sidebarMenu">
              <h3 className="sidebarTitle">Dashboard</h3>
              <ul className="sidebarList">
                <Link to="/dashboard/home" className="link">
                  <li className="sidebarListItem active">
                    <Home className="sidebarIcon" />
                    Home
                  </li>
                </Link>
                <li className="sidebarListItem">
                  <Timeline className="sidebarIcon" />
                  Analytics
                </li>
                <li className="sidebarListItem">
                  <TrendingUp className="sidebarIcon" />
                  Sales
                </li>
              </ul>
            </div>
            <div className="sidebarMenu">
              <h3 className="sidebarTitle">Quick Menu</h3>
              <ul className="sidebarList">
                <Link to="/dashboard/allUsers" className="link">
                  <li className="sidebarListItem">
                    <PermIdentity className="sidebarIcon" />
                    Users
                  </li>
                </Link>
                <Link to="/products" className="link">
                  <li className="sidebarListItem">
                    <Storefront className="sidebarIcon" />
                    Products
                  </li>
                </Link>
              </ul>
            </div>
            
          </div>
        </div>
        <div className="others">
        <Outlet />
        </div>
      </div>
    </>
  );
}

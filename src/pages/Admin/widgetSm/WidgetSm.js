import "./widgetSm.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../store/auth-context";
export default function WidgetSm(props) {
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {props.lastUsers.map((newusers, index) => {
          return (
            <li className="widgetSmListItem" key={index}>
              <img
                src={`http://localhost:8000/${newusers.profile_photo_path}`}
                alt=""
                className="widgetSmImg"
              />
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{newusers.name}</span>
                <span className="widgetSmUserTitle">{newusers.email}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

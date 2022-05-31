import "./widgetSm.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../store/auth-context";
export default function WidgetSm() {
  const AuthCtx = useContext(AuthContext);
  const [add, setadd] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/list-newUser", {
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
            let newArrayDataOfOjbect = Object.values(data.newusers);
            console.log(newArrayDataOfOjbect);
            setadd(newArrayDataOfOjbect);
          }
        });
      } else {
        res.json().then((data) => {
          console.log(data);
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {add.map((newusers, index) => {
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

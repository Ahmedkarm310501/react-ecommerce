import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

export const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  name: "",
  isAdmin: 0,
  setIsAdmin: (isAdmin) => {},
  setName: (username) => {},
});

const AuthContextProvider = (props) => {
  // const navigation = useNavigate();

  let initialToken = sessionStorage.getItem("token");
  let initialUserName = sessionStorage.getItem("username");
  let initialIsAdmin = sessionStorage.getItem("isAdmin");
  let initialLoggedOutTime = sessionStorage.getItem("loggedOutTime");
  const [token, setToken] = useState(initialToken);
  const [userName, setUserName] = useState(initialUserName);
  const [isAdmin, setIsAdmin] = useState(initialIsAdmin);
  const [loggedOutTime, setLoggedOutTime] = useState(initialLoggedOutTime);

  const userIsLoggedIn = !!token;

  const loginHandler = (token, time) => {
    setToken(token);
    sessionStorage.setItem("token", token);
    setLoggedOutTime(time * 60 * 1000);
    sessionStorage.setItem("loggedOutTime", time * 60 * 1000);
  };
  const addUserName = (username) => {
    setUserName(username);
    sessionStorage.setItem("username", username);
  };

  const addIsAdmin = (isAdmin) => {
    setIsAdmin(isAdmin);
    sessionStorage.setItem("isAdmin", isAdmin);
  };
  const logOutApi = () => {
    fetch("http://127.0.0.1:8000/api/logout", {
      method: "POST",
      body: JSON.stringify({
        token: token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          console.log(data);
          setToken(null);
          setUserName(null);
          setIsAdmin(null);
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("username");
          sessionStorage.removeItem("isAdmin");
          // navigation("/home", { replace: true });
        });
      } else {
        console.log(res);
      }
    });
  };
  const logoutHandler = () => {
    setToken(null);
    setUserName(null);
    setIsAdmin(null);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("isAdmin");
  };
  const qq = () => {
    setTimeout(() => {
      if (userIsLoggedIn) {
        let time = sessionStorage.getItem("loggedOutTime");
        if (time <= 0) {
          logOutApi();
        } else {
          sessionStorage.removeItem("loggedOutTime");
          sessionStorage.setItem("loggedOutTime", time - 1000);
          qq();
        }
      }
    }, 1000);
  };
  qq();
  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    name: userName,
    isAdmin: isAdmin,
    setLoggedOutTime: setLoggedOutTime,
    setIsAdmin: addIsAdmin,
    setName: addUserName,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

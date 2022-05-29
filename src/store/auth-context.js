import React, { useState } from "react";

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
  let initialToken = sessionStorage.getItem("token");
  let initialUserName = sessionStorage.getItem("username");
  let initialIsAdmin = sessionStorage.getItem("isAdmin");

  const [token, setToken] = useState(initialToken);
  const [userName, setUserName] = useState(initialUserName);
  const [isAdmin, setIsAdmin] = useState(initialIsAdmin);

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    sessionStorage.setItem("token", token);
  };
  const addUserName = (username) => {
    setUserName(username);
    sessionStorage.setItem("username", username);
  };

  const addIsAdmin = (isAdmin) => {
    setIsAdmin(isAdmin);
    sessionStorage.setItem("isAdmin", isAdmin);
  };
  const logoutHandler = () => {
    setToken(null);
    setUserName(null);
    setIsAdmin(null);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("isAdmin");
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    name: userName,
    isAdmin: isAdmin,
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

import React, { useState, useEffect } from "react";
import Axios from "../axios";

export const AuthContext = React.createContext();

const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [watchlist, setWatchlist] = useState("");
  const [cart, setCart] = useState("");
  const [purchased, setPurchased] = useState("");
  useEffect(() => {
    Axios.get("/users/user", { withCredentials: true }).then((res) => {
      if (res.data) {
        loginHandler(
          res.data.isAdmin,
          true,
          res.data.watchlist,
          res.data.cart,
          res.data.purchased
        );
      }
    });
  }, []);

  const loginHandler = (admin, auth, watchlist, cart, purchased) => {
    setIsAdmin(admin);
    setIsAuthenticated(auth);
    setWatchlist(watchlist);
    setCart(cart);
    setPurchased(purchased);
  };
  console.log("isAdmin");
  return (
    <AuthContext.Provider
      value={{
        login: loginHandler,
        isAuth: isAuthenticated,
        isAdmin,
        watchlist,
        cart,
        purchased,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

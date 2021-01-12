import React, { useContext } from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import { AuthContext } from "../../../util/authContext";

const NavigationItems = () => {
  const authContext = useContext(AuthContext);
  let user = null;
  user = authContext.isAdmin ? (
    <div className={classes.NavigationItems}>
      <NavigationItem link="/admin/account">Account</NavigationItem>
      <NavigationItem link="/admin/addItem">AddItem</NavigationItem>
    </div>
  ) : (
    <div className={classes.NavigationItems}>
      <NavigationItem link="/orders">Orders</NavigationItem>
      <NavigationItem link="/cart">Cart</NavigationItem>
      <NavigationItem link="/watchlist">Watchlist</NavigationItem>
    </div>
  );

  const navItems = authContext.isAuth ? (
    <div className={classes.NavigationItems}>
      <div className={classes.Dropdown}>
        <div className={classes.profile}>Profile</div>
        <div className={classes.dropdownContent}>
          <NavigationItem link="/general">General</NavigationItem>
          <NavigationItem link="/security">Security</NavigationItem>
          <NavigationItem link="/termsandconditions">
            Terms and conditions
          </NavigationItem>
          <NavigationItem link="/logout">Logout</NavigationItem>
          <NavigationItem link="/deleteAccount">Delete Account</NavigationItem>
        </div>
      </div>
      {user}
    </div>
  ) : (
    <div className={classes.NavigationItems}>
      <NavigationItem link="/login">Login</NavigationItem>
    </div>
  );

  return navItems;
};

export default NavigationItems;

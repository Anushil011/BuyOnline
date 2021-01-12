import React from "react";
import { NavLink } from "react-router-dom";

import NavigationItems from "./NavigationItems/NavigationItems";
import classes from "./Navbar.module.css";

const navbar = () => {
  return (
    <header className={classes.Navbar}>
      <div >
        <div className={classes.hamburger}></div>
        <div className={classes.hamburger}></div>
        <div className={classes.hamburger}></div>
      </div>
      <h3 className={classes.Navitem} ><NavLink to="/" style={{textDecoration:"none",color:"white"}}>BuyOnline</NavLink></h3>

      <form className={classes.Navitem}>
        <input type="text" placeholder="search" id="searchBox" />
        <button type="submit">Search</button>
      </form>
      <nav className={classes.Navitem}>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default navbar;

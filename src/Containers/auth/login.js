import React, { useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom";

import classes from "../Form/addItemForm.module.css";
import { AuthContext } from "../../util/authContext";
import Axios from "../../axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const authContext = useContext(AuthContext);
  //handle the input changes
  const inputChangeHandler = (event) => {
    switch (event.target.name) {
      case "email":
        setEmail(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      default:
        setEmail(event.target.value);
        break;
    }
  };

  //login user
  const submitHandler = (event) => {
    event.preventDefault();
    Axios.post("/users/login", { email, password }, { withCredentials: true })
      .then((res) => {
        if (res.data.message === "Successfully authenticated") {
          authContext.login(
            res.data.isAdmin,
            true,
            res.data.watchlist,
            res.data.cart,
            res.data.purchased
          );
          history.push("/");
        } else if (res.data.message === "User doesnot exist. Please sign in!") {
          history.push("/signup");
        }
      })
      .catch((err) => console.log(err));
  };

  const userhandler = (event) => {
    event.preventDefault();
    Axios.get("/users/user", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <header className={classes.Header}>Login to continue</header>
      <br />
      <form className={classes.Form}>
        <div className={classes.itemDiv}>
          <label className={classes.Label}>Email </label>
          <input
            className={classes.Input}
            type="email"
            name="email"
            value={email}
            placeholder="example@example.com"
            onChange={(event) => inputChangeHandler(event)}
          />
        </div>

        <br />
        <div className={classes.itemDiv}>
          <label className={classes.Label}>Password </label>
          <input
            className={classes.Input}
            type="password"
            name="password"
            value={password}
            onChange={(event) => inputChangeHandler(event)}
          />
        </div>

        <br />

        <button
          type="submit"
          className={classes.submit}
          onClick={submitHandler}
        >
          Login
        </button>
        <br />
        <br />
        <button type="submit" className={classes.submit} onClick={userhandler}>
          getusers
        </button>
        <Link to="/signup">Click to create an account</Link>
      </form>
    </div>
  );
};
export default Login;

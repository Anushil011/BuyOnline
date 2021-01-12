import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

import classes from "../Form/addItemForm.module.css";
import Axios from "../../axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const history = useHistory();

  //handle the input changes
  const inputChangeHandler = (event) => {
    switch (event.target.name) {
      case "email":
        setEmail(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      case "confirmPassword":
        setConfirmPassword(event.target.value);
        break;
      case "name":
        setName(event.target.value);
        break;
      default:
        setName(event.target.value);
        break;
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      Axios.post("/users/signup", { email, password, name })
        .then((res) => {
          console.log(res);
          history.push("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <header className={classes.Header}>Create an account</header>
      <br />
      <form className={classes.Form}>
        <div className={classes.itemDiv}>
          <label className={classes.Label}>Username</label>
          <input
            className={classes.Input}
            type="text"
            name="name"
            value={name}
            onChange={(event) => inputChangeHandler(event)}
          />
        </div>

        <br />
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
        <div className={classes.itemDiv}>
          <label className={classes.Label}>Confirm Password </label>
          <input
            className={classes.Input}
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(event) => inputChangeHandler(event)}
          />
        </div>

        <br />

        <button
          type="submit"
          className={classes.submit}
          onClick={submitHandler}
        >
          Signup
        </button>
        <br />
        <br />
        <Link to="/login">Click to login</Link>
      </form>
    </div>
  );
};
export default Signup;

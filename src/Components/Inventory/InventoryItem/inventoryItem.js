import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import classes from "./inventoryItem.module.css";
import Axios from "../../../axios";
import { AuthContext } from "../../../util/authContext";

const InventoryItem = React.memo((props) => {
  const authContext = useContext(AuthContext);
  const history = useHistory();
  const addToCartHandler = () => {
    if (authContext.isAuth) {
      Axios.post(
        "/users/cart/add",
        { itemId: props.id },
        { withCredentials: true }
      )
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
      console.log("added to cart");
    } else {
      history.push("/login");
    }
  };
  const addToWatchlistHandler = () => {
    if (authContext.isAuth) {
      Axios.post(
        "/users/watchlist/add",
        { itemId: props.id },
        { withCredentials: true }
      )
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
      console.log("added to watchlist");
    } else {
      history.push("/login");
    }
  };

  let item = props.isAdmin ? (
    <div className={classes.InventoryItem}>
      <header style={{ height: "150px", width: "200px" }}>
        <img src="#" alt={props.name + " image"} height="100%" width="100%" />
      </header>
      <hr />

      <p>{props.name}</p>
      <p>
        <span>Description: </span>
        {props.description}
      </p>
      <p>
        <span>Available: </span>
        {props.quantity}
      </p>
      <p>
        <span>$</span>
        {props.price}
      </p>

      <button
        className={classes.editBtn}
        onClick={() =>
          props.editItemHandler({
            id: props.id,
            editItem: {
              name: props.name,
              price: props.price,
              category: props.category,
              description: props.description,
              quantity: props.quantity,
            },
          })
        }
      >
        Edit item
      </button>
      <button
        className={classes.dltBtn}
        onClick={() => props.deleteHandler(props.id)}
      >
        Delete item
      </button>
    </div>
  ) : (
    <div className={classes.InventoryItem}>
      <header style={{ height: "150px", width: "200px" }}>
        <img src="#" alt={props.name + " image"} height="100%" width="100%" />
      </header>
      <hr />

      <p>{props.name}</p>
      <p>
        <span>Description: </span>
        {props.description}
      </p>
      <p>
        <span>Available: </span>
        {props.quantity}
      </p>
      <p>
        <span>$</span>
        {props.price}
      </p>

      <button className={classes.cartbtn} onClick={addToCartHandler}>
        Add To Cart
      </button>
      <button className={classes.cartbtn} onClick={addToWatchlistHandler}>
        Add To Watchlist
      </button>
    </div>
  );

  return item;
});
export default InventoryItem;

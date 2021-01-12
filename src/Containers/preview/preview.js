import React, { useState, useEffect, useCallback, useContext } from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";

import Inventory from "../../Components/Inventory/inventory";
import AddItemFrom from "../Form/addItemForm";
import Login from "../auth/login";
import Signup from "../auth/signup";
import Axios from "../../axios";
import { AuthContext } from "../../util/authContext";

const Preveiw = () => {
  console.log("preview");
  const [inventory, setInventory] = useState();
  let isEmpty = inventory ? false : true;
  const [emptyMessage, setEmptyMessage] = useState(isEmpty);
  const history = useHistory();
  const authContext = useContext(AuthContext);

  //useEffect hook to get the store items
  useEffect(() => {
    Axios.get("/store/products")
      .then((res) => {
        console.log("get products");
        if (res.data.message !== "No products found") {
          setInventory(res.data);
          setEmptyMessage(false);
        } else {
          setEmptyMessage(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // add new item or edit the items
  const addItemHandler = useCallback(
    (newItem, edit, id) => {
      const query = edit ? "/store/products/edit/" + id : "/store/products/add";
      Axios.post(query, newItem)
        .then((res) => {
          if (!edit) setInventory([...inventory, newItem]);
          else {
            let tempInventory = inventory.filter((obj) => obj._id !== id);
            setInventory([...tempInventory, newItem]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [inventory]
  );

  // delete items
  const deleteItemHandler = useCallback(
    (id) => {
      Axios.delete("/store/products/delete/" + id)
        .then((res) => {
          let tempInventory = inventory.filter((obj) => obj._id !== id);
          setInventory(tempInventory);
        })
        .catch((err) => console.log(err));
    },
    [inventory]
  );

  //handle edit item
  const editItemHandler = (toEditItem) => {
    history.push({
      pathname: "/admin/addItem",
      state: { editItem: toEditItem.editItem, isEdit: true, id: toEditItem.id },
    });
  };

  // handle logout
  const logoutHandler = () => {
    Axios.get("/users/logout", { withCredentials: true })
      .then((res) => {
        if (res.data.message === "Successfully logged out") {
          authContext.login(false, false);
        }
        history.push("/");
      })
      .catch((err) => console.log(err));
    return "done";
  };

  // handle delete account
  const deleteAccountHandler = () => {
    Axios.get("/users/logout", { withCredentials: true })
      .then((res) => {
        if (res.data.message === "Successfully logged out") {
          authContext.login(false, false);
          Axios.get("/users/delete", { withCredentials: true })
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err));
        }
        history.push("/");
      })
      .catch((err) => console.log(err));
    return "done";
  };

  // handle logout
  const cartHandler = () => {
    Axios.get("/users/cart", { withCredentials: true })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    return "done";
  };

  // handle logout
  const watchlistHandler = () => {
    Axios.get("/users/watchlist", { withCredentials: true })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    return "done";
  };

  //shows item or "no items" message
  let inventorycomp = !emptyMessage ? (
    <Inventory
      inventory={inventory}
      deletehandler={deleteItemHandler}
      editItemHandler={editItemHandler}
      isAdmin={authContext.isAdmin}
    />
  ) : (
    <p style={{ fontSize: "35px", textAlign: "center", color: "skyblue" }}>
      No data found
    </p>
  );

  // routes according to the authenticatin state and user
  let route = (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
    </Switch>
  );

  if (authContext.isAuth) {
    if (authContext.isAdmin) {
      route = (
        <Switch>
          <Route path="/admin/addItem">
            <AddItemFrom addItemHandler={addItemHandler} />
          </Route>
          <Route path="/logout" component={logoutHandler} />
          <Route path="/deleteAccount" component={deleteAccountHandler} />
        </Switch>
      );
    } else {
      route = (
        <Switch>
          <Route path="/orders">
            <Inventory />
          </Route>
          <Route path="/watchlist" component={watchlistHandler} />
          <Route path="/cart" component={cartHandler} />
          <Route path="/logout" component={logoutHandler} />
          <Route path="/deleteAccount" component={deleteAccountHandler} />
        </Switch>
      );
    }
  }

  return (
    <Switch>
      <Route path="/" exact>
        {inventorycomp}
      </Route>
      {route}
      <Redirect to="/" />
    </Switch>
  );
};
export default Preveiw;

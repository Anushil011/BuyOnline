import React, { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";

import classes from "./addItemForm.module.css";

const AddItemForm = React.memo((props) => {
  const history = useHistory();
  const [newItem, setNewItem] = useState(
    history.location.state
      ? history.location.state.editItem
      : {
          name: "",
          price: 0,
          quantity: 0,
          description: "",
          category: "",
        }
  );

  // submit the form to add the item in the database
  const submitHandler = useCallback(
    (event) => {
      event.preventDefault();
      const isEdit = history.location.state
        ? history.location.state.isEdit
        : false;
      const id = history.location.state ? history.location.state.id : "";
      history.push("/");
      props.addItemHandler(newItem, isEdit, id);
    },
    [newItem, props, history]
  );

  // cancle the form
  const cancelHandler = () => {
    history.push("/");
  };

  //handle the input changes
  const inputChangeHandler = (event) => {
    let propName = event.target.name;
    let propValue = event.target.value;
    newItem[propName] = propValue;
    setNewItem({ ...newItem });
  };

  return (
    <div>
      <header className={classes.Header}>Add a new Item</header>

      <form className={classes.Form}>
        <div className={classes.itemDiv}>
          <label className={classes.Label}>Name </label>
          <input
            className={classes.Input}
            type="text"
            name="name"
            value={newItem.name}
            onChange={(event) => inputChangeHandler(event)}
          />
        </div>

        <br />
        <div className={classes.itemDiv}>
          <label className={classes.Label}>Category </label>
          <input
            className={classes.Input}
            type="text"
            name="category"
            value={newItem.category}
            onChange={(event) => inputChangeHandler(event)}
          />
        </div>

        <br />
        <div className={classes.itemDiv}>
          <label className={classes.Label}>Price </label>
          <input
            className={classes.Input}
            type="number"
            name="price"
            value={newItem.price}
            onChange={(event) => inputChangeHandler(event)}
          />
        </div>

        <br />
        <div className={classes.itemDiv}>
          <label className={classes.Label}>Quantity </label>
          <input
            className={classes.Input}
            type="number"
            name="quantity"
            value={newItem.quantity}
            onChange={(event) => inputChangeHandler(event)}
          />
        </div>

        <br />
        <div className={classes.itemDiv}>
          <label className={classes.Label}>Description </label>
          <textarea
            className={classes.Textarea}
            name="description"
            rows="7"
            placeholder="Enter the description here"
            onChange={(event) => inputChangeHandler(event)}
            value={newItem.description}
          />
        </div>

        <button
          type="submit"
          className={classes.submit}
          onClick={submitHandler}
        >
          Submit
        </button>

        <button type="reset" className={classes.cancel} onClick={cancelHandler}>
          Cancel
        </button>
      </form>
    </div>
  );
});

export default AddItemForm;

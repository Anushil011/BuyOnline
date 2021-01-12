import React from "react";

import InventoryItem from "./InventoryItem/inventoryItem";
import classes from "./inventory.module.css";
const Inventory = React.memo((props) => {
  let items;
  if (props.inventory) {
    items = props.inventory.map((item) => (
      <InventoryItem
        key={item.name}
        name={item.name}
        id={item._id}
        price={item.price}
        quantity={item.quantity}
        description={item.description}
        category={item.category}
        deleteHandler={props.deletehandler}
        editItemHandler={props.editItemHandler}
        isAdmin={props.isAdmin}
      />
    ));
  }

  return <div className={classes.Inventory}>{items}</div>;
});
export default Inventory;

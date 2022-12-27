import React, { useContext, useEffect } from "react";
import cartContext from "../../store/cartContext";
import AddButton from "../../UI/AddButton";
import RemoveButton from "../../UI/RemoveButton";
import classes from "./AddItem.module.css";

const AddItem = (props) => {
  const cartCtx = useContext(cartContext);
  const itemIdx = cartCtx.itemsArr.findIndex((ele) => ele.id === props.id);
  const cartCtxQuantity =
    itemIdx !== -1 ? cartCtx.itemsArr[itemIdx].quantity : 0;

  useEffect(() => {
    if (cartCtxQuantity < 1) {
      props.enableBtn();
    }
  }, [cartCtxQuantity]);

  const addItemHandler = () => {
    cartCtx.addItem(props.data);
  };

  const removeItemHandler = () => {
    cartCtx.removeItem(props.id);
  };

  return (
    <div className={classes.container}>
      <div className={classes.qtyContainer}>
        <p>Quantity</p>
        <div className={classes.quantity}>
          <h2>{cartCtxQuantity}</h2>
        </div>
      </div>

      <div className={classes.btnContainer}>
        <div className={classes.minus}>
          <RemoveButton removeItem={removeItemHandler} />
        </div>

        <div>
          <AddButton addItem={addItemHandler} />
        </div>
      </div>
    </div>
  );
};

export default AddItem;

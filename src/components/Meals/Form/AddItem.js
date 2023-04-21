import React, { useEffect } from "react";
import AddButton from "../../UI/AddButton";
import RemoveButton from "../../UI/RemoveButton";
import classes from "./AddItem.module.css";
import { useSelector, useDispatch } from "react-redux";
import { dataSliceActions } from "../../store/dataSlice";

const AddItem = (props) => {
  const cartItems = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const itemIdx = cartItems.findIndex((ele) => ele.id === props.id);
  const cartCtxQuantity = itemIdx !== -1 ? cartItems[itemIdx].quantity : 0;

  useEffect(() => {
    if (cartCtxQuantity < 1) {
      props.enableBtn();
    }
  }, [cartCtxQuantity]);

  const addItemHandler = () => {
    dispatch(dataSliceActions.addItems(props.data));
  };

  const removeItemHandler = () => {
    dispatch(dataSliceActions.removeItem(props.data));
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

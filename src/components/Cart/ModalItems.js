import React from "react";
import classes from "./ModalItems.module.css";
import AddButton from "../UI/AddButton";
import RemoveButton from "../UI/RemoveButton";
import { useDispatch } from "react-redux";
import { dataSliceActions } from "../store/dataSlice";

const ModalItems = (props) => {
  const dispatch = useDispatch();
  const price = `Rs ${props.data.price.toFixed(2)}`;

  const addItemHandler = () => {
    dispatch(dataSliceActions.addItems(props.data));
  };

  const removeItemHandler = () => {
    dispatch(dataSliceActions.removeItem(props.data));
  };
  return (
    <div className={classes.container}>
      <div className={classes.leftMenu}>
        <p className={classes.name}>{props.data.name}</p>
        <div className={classes.priceQuan}>
          <p className={classes.price}>{price}</p>
          <div className={classes.quantity}>
            <h3>X {props.data.quantity}</h3>
          </div>
          <p>
            <span className={classes.subTotal}>Sub-total </span>
            {(props.data.quantity * props.data.price).toFixed(2)}
          </p>
        </div>
      </div>
      <div className={classes.addRemovebtns}>
        <RemoveButton removeItem={removeItemHandler} />
        <AddButton addItem={addItemHandler} />
      </div>
    </div>
  );
};

export default ModalItems;

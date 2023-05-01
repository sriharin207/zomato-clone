import React, { useState } from "react";
import classes from "../Form/MealItemForm.module.css";
import AddItem from "./AddItem";
import { useDispatch } from "react-redux";
import { dataSliceActions } from "../../store/dataSlice";

const MealItemForm = (props) => {
  const [enableaddToCart, setbtnState] = useState(true);
  const dispatch = useDispatch();
  const onAddToCart = () => {
    dispatch(dataSliceActions.addItems({ ...props.data, quantity: 1 }));
    setbtnState(false);
  };

  const enableBtn = () => {
    setbtnState(true);
  };

  return (
    <div>
      {enableaddToCart && (
        <button className={classes.btn} onClick={onAddToCart}>
          Add to Cart
        </button>
      )}
      {!enableaddToCart && (
        <AddItem enableBtn={enableBtn} data={props.data} id={props.data.id} />
      )}
    </div>
  );
};

export default MealItemForm;

import React, { useState, useContext } from "react";
import cartContext from "../../store/cartContext";
import classes from "../Form/MealItemForm.module.css";
import AddItem from "./AddItem";

const MealItemForm = (props) => {
  const [enableaddToCart, setbtnState] = useState(true);
  const context = useContext(cartContext);

  const onAddToCart = () => {
    context.addItem({ ...props.data, quantity: 1 });
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
        <AddItem
          enableBtn={enableBtn}
          data={props.data}
          id={props.data.id}
        />
      )}
    </div>
  );
};

export default MealItemForm;

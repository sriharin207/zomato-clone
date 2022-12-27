import React from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./Form/MealItemForm";

const MealItem = (props) => {
  const price = `Rs ${props.data.price.toFixed(2)}`;
  return (
    <div className={classes.container}>
      <div>
        <p className={classes.name}>{props.data.name}</p>
        <span className={classes.seller}>Best Seller</span>
        <p>{props.data.description}</p>
        <h3 className={classes.price}>{price}</h3>
      </div>
      <div className={classes.inputForm}>
        <MealItemForm data={props.data} />
      </div>
    </div>
  );
};

export default MealItem;

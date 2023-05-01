import React, { Fragment } from "react";
import classes from "./HeaderCartButton.module.css";
import { FaCartPlus } from "react-icons/fa";
import { useSelector } from "react-redux";

const HeaderCartButton = (props) => {
  const cartItems = useSelector((state) => state.items);
  const ItemsQuantity = cartItems.length;
  return (
    <Fragment>
      <div className={classes.cart} onClick={props.onclick}>
        <div className={classes.icon}>
          <FaCartPlus />
        </div>
        <div>
          <p>Your Meals</p>
        </div>
        <div className={classes.badge}>
          <p>{ItemsQuantity}</p>
        </div>
      </div>
    </Fragment>
  );
};

export default HeaderCartButton;

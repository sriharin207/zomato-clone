import React, { Fragment, useContext } from "react";
import classes from "./HeaderCartButton.module.css";
import { FaCartPlus } from "react-icons/fa";
import cartContext from "../store/cartContext";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(cartContext);
  const ItemsQuantity = cartCtx.itemsArr.length;
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

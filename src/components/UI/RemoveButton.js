import React from "react";
import { FaMinusCircle } from "react-icons/fa";
import classes from "./AddButton.module.css";

const RemoveButton = (props) => {
  return <FaMinusCircle className={classes.minus} onClick={props.removeItem} />;
};

export default RemoveButton;

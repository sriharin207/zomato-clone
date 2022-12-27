import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import classes from "./AddButton.module.css";

const AddButton = (props) => {
  return <FaPlusCircle className={classes.plus} onClick={props.addItem} />;
};

export default AddButton;

import React from "react";
import classes from "./ErrorPage.module.css";

const CustomError = (props) => {
  return (
    <div className={classes.customError}>
      <h2>Something went wrong</h2>
      <h3>{props.message}</h3>
    </div>
  );
};

export default CustomError;

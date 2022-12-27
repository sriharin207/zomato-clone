import React from "react";
import classes from "./MealQuote.module.css";

const MealQuote = () => {
  return (
    <div className={classes.container}>
      <div className={classes.quote}>
        <h1 className={classes.title}>Good Food delivered in minutes !!</h1>
        <p className={classes.titleQuote}>
          Eat, drink and live free. There’s no telling what might happen
          tomorrow
        </p>
      </div>
    </div>
  );
};

export default MealQuote;

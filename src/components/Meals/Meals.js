import React, { Fragment } from "react";
import MealQuote from "./MealQuote";
import MealItems from "./MealItems";

const Meals = () => {
  return (
    <Fragment>
      <MealQuote />
      <MealItems />
    </Fragment>
  );
};

export default Meals;

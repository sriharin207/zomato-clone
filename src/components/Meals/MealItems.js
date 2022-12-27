import React from "react";
import MealItem from "./MealItem";
import classes from "./MealCont.module.css";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Chicken Biryani Combo",
    description: "Finest fish and veggies",
    price: 150.00,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];

const MealItems = (props) => {
  let contentToRender = DUMMY_MEALS.map((ele) => <MealItem data={ele} key={ele.id}/>);

  return <div className={classes.container}>{contentToRender}</div>;
};

export default MealItems;

import React, { useEffect, useState } from "react";
import MealItem from "./MealItem";
import classes from "./MealCont.module.css";

const MealItems = (props) => {
  const [MealItemsList, setMealItemsList] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [apiError, setapiError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const data = await fetch(
          "https://food-order-backend-bd383-default-rtdb.firebaseio.com/meals.json"
        );
        if (data.ok) {
          const Meals = await data.json();
          const MealItemsArr = [];
          for (const key in Meals) {
            MealItemsArr.push({
              id: key,
              name: Meals[key].name,
              description: Meals[key].description,
              price: Meals[key].price,
            });
          }
          setMealItemsList(MealItemsArr);
          setisLoading(false);
        } else {
          throw new Error("Something went wrong");
        }
      } catch (error) {
        setisLoading(false);
        setapiError(error.message);
      }
    };
    fetchMeals();
  }, []);

  let contentToRender = "";
  if (!apiError) {
    if (!isLoading) {
      contentToRender = MealItemsList.map((ele) => (
        <MealItem data={ele} key={ele.id} />
      ));
    } else {
      contentToRender = <p className={classes.loading}>Loding...</p>;
    }
  } else {
    contentToRender = <p className={classes.error}>{apiError}</p>;
  }

  return <div className={classes.container}>{contentToRender}</div>;
};

export default MealItems;

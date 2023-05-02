import React from "react";
import MealItem from "./MealItem";
import classes from "./MealCont.module.css";
import {
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { getAuthToken } from "../../util/authToken";

export async function fetchMealItems() {
  const { jwtToken } = getAuthToken();
  if (!jwtToken) {
    return redirect("/");
  }
  const data = await fetch("http://localhost:3001/api/getItemsDetails", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (data.ok) {
    const Meals = await data.json();
    const items = Meals.createdMeal;
    const MealItemsArr = [];
    items.map((ele) => {
      MealItemsArr.push({
        id: ele._id,
        name: ele.name,
        description: ele.description,
        price: ele.price,
      });
    });
    return MealItemsArr;
  } else {
    throw new Response("Unable to fetch Items", { status: 500 });
  }
}

const MealItems = (props) => {
  const MealItemsList = useLoaderData();
  const isLoading = useNavigation().state === "loading";
  const apiError = useActionData();
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
    contentToRender = <p className={classes.error}>Unable to fetch Items</p>;
  }

  return <div className={classes.container}>{contentToRender}</div>;
};

export default MealItems;

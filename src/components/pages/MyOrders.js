import React from "react";
import { redirect, useLoaderData, useNavigation } from "react-router-dom";
import OrderedItems from "./OrderedItems";
import classes from "./MyOrders.module.css";
import { getAuthToken } from "../../util/authToken";

export async function fetchOrderedItems() {
  const { jwtToken, mobileNumber } = getAuthToken();
  if (!jwtToken) {
    return redirect("/");
  }
  const data = await fetch("http://localhost:3001/api/getOrderedItemsData", {
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + jwtToken,
      mobilenumber: mobileNumber,
    },
  });
  if (data.ok) {
    const Orders1 = await data.json();
    const Orders = Orders1.OrderedItems;
    const formattedOrdersArr = [];
    for (const key in Orders) {
      formattedOrdersArr.push({
        orderID: Orders[key]._id,
        finalBillAmount: Orders[key].finalBillAmount,
        orderedDateTime: Orders[key].orderedDateTime,
        orderedItemsList: Orders[key].orderedItems,
      });
    }
    return formattedOrdersArr;
  } else {
    throw new Response("Unable to fetch Orders", { status: 500 });
  }
}

const MyOrders = () => {
  const orderedItems = useLoaderData();
  const currentState = useNavigation().state === "loading";

  return (
    <div>
      <p className={classes.orderTitle}>Orders History</p>
      {currentState && <p className={classes.loading}>Loading Data...</p>}
      <div className={classes.container}>
        {orderedItems.map((ele) => (
          <OrderedItems data={ele} key={ele.orderID} />
        ))}
      </div>
    </div>
  );
};

export default MyOrders;

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
  const backendRes = await fetch("/api/getOrderedItemsData", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + jwtToken,
      mobilenumber: mobileNumber,
    },
  });
  if (backendRes.ok) {
    const Orders1 = await backendRes.json();
    const Orders = Orders1.OrderedItems;
    const formattedOrdersArr = [];
    for (const key in Orders) {
      formattedOrdersArr.push({
        orderID: Orders[key]._id,
        finalBillAmount: Orders[key].finalBillAmount,
        orderedDateTime: Orders[key].orderedDateTime,
        orderedItemsList: Orders[key].orderedItems,
        mobileNumber: Orders[key].mobileNumber,
      });
    }
    return formattedOrdersArr;
  } else {
    return backendRes;
  }
}

const MyOrders = () => {
  const currentState = useNavigation().state === "loading";
  const orderedItems = useLoaderData();
  const isError = orderedItems.message ? true : false;
  return (
    <div>
      <p className={classes.orderTitle}>Orders History</p>
      {currentState && <p className={classes.loading}>Loading Data...</p>}
      {!isError && (
        <div className={classes.container}>
          {orderedItems.map((ele) => (
            <OrderedItems data={ele} key={ele.orderID} />
          ))}
        </div>
      )}
      {isError && <p className={classes.noOrders}>{orderedItems.message}</p>}
    </div>
  );
};

export default MyOrders;

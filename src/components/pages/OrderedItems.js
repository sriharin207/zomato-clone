import React from "react";
import classes from "./OrderedItems.module.css";

const formateDatetime = (data) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dateTimeStr = new Date(data);
  const month = months[dateTimeStr.getMonth()];
  const day = dateTimeStr.getDate();
  const year = dateTimeStr.getFullYear();
  const time = dateTimeStr.toLocaleTimeString();
  const formattedDateTime = `${month} ${day}, ${year} at ${time}`;
  return formattedDateTime;
};

const formatorderedItemsList = (data) => {
  const arr = [];
  data.forEach((ele) => {
    arr.push(` ${ele.quantity} x ${ele.name}`);
  });
  return arr.toString();
};

const OrderedItems = (props) => {
  const formattedDateTime = formateDatetime(props.data.orderedDateTime);
  const formattedOrderedItems = formatorderedItemsList(
    props.data.orderedItemsList
  );

  return (
    <div className={classes.container}>
      <div>
        <p className={classes.title}>ORDER NUMBER</p>
        <p className={classes.titleValues}>{props.data.orderID}</p>
      </div>
      <div>
        <p className={classes.title}>TOTAL AMOUNT</p>
        <p className={classes.titleValues}>{props.data.finalBillAmount}</p>
      </div>
      <div>
        <p className={classes.title}>Items</p>
        <p className={classes.titleValues}>{formattedOrderedItems}</p>
      </div>
      <div>
        <p className={classes.title}>ORDERED ON</p>
        <p className={classes.titleValues}>{formattedDateTime}</p>
      </div>
      <div>
        <p className={classes.title}>MOBILE NUMBER</p>
        <p className={classes.titleValues}>{props.data.mobileNumber}</p>
      </div>
    </div>
  );
};

export default OrderedItems;

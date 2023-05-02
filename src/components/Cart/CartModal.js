import React, { useState } from "react";
import Modal from "../UI/Modal";
import ModalItems from "./ModalItems";
import classes from "./CartModal.module.css";
import CheckOutForm from "./CheckOutForm";
import { useSelector, useDispatch } from "react-redux";
import { dataSliceActions } from "../store/dataSlice";
import { getAuthToken } from "../../util/authToken";

const CartModal = (props) => {
  const cartItems = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const { jwtToken, mobileNumber } = getAuthToken();
  const [showCheckOutForm, setshowCheckOutForm] = useState(false);
  const [orderSubmiting, setorderSubmiting] = useState(false);
  const [orderSubmitted, setorderSubmitted] = useState(false);
  const [isError, setisError] = useState(true);
  let itemsToRender = cartItems.map((ele) => (
    <ModalItems data={ele} key={ele.id} />
  ));

  const finalPrice = cartItems.reduce((initialValue, ele) => {
    return initialValue + ele.price * ele.quantity;
  }, 0);

  const orderHandler = () => {
    setshowCheckOutForm(true);
  };

  const submitOrdertoDB = async (userData) => {
    setorderSubmiting(true);
    const orderDetails = {
      orderedItems: cartItems,
      finalBillAmount: finalPrice.toFixed(2),
      userDetails: userData,
      orderedDateTime: new Date().toString(),
      mobileNumber: mobileNumber,
    };
    const response = await fetch("http://localhost:3001/api/submitOrder", {
      method: "POST",
      body: JSON.stringify(orderDetails),
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + jwtToken,
        mobilenumber: mobileNumber,
      },
    });
    if (response.ok) {
      setorderSubmiting(false);
      setorderSubmitted(true);
      dispatch(dataSliceActions.clearItems());
    } else {
      setisError(false);
    }
  };
  const orderBtnStatus = finalPrice === 0;
  const finalContentToRender = (
    <React.Fragment>
      {itemsToRender}
      <div className={classes.amountSummary}>
        <h2>Total Amount</h2>
        <h2>Rs {finalPrice.toFixed(2)}</h2>
      </div>
      {showCheckOutForm && (
        <CheckOutForm close={props.modalVis} submitData={submitOrdertoDB} />
      )}
      {!showCheckOutForm && (
        <div className={classes.btns}>
          <button onClick={props.modalVis}>Close</button>
          {!orderBtnStatus && <button onClick={orderHandler}>Order</button>}
        </div>
      )}
    </React.Fragment>
  );

  const orderSuccessContent = (
    <React.Fragment>
      <p>Order sucessfull, estimated delivery time 30mins</p>
      <div className={classes.clsBtn}>
        <button
          type="button"
          onClick={props.modalVis}
          className={classes.closeBtn}
        >
          Close
        </button>
      </div>
    </React.Fragment>
  );
  return (
    <Modal modalVis={props.modalVis}>
      {!orderSubmiting && !orderSubmitted && finalContentToRender }
      {isError && orderSubmiting && !orderSubmitted && (
        <p>Confirming your order with Restaurant</p>
      )}
      {isError && !orderSubmiting && orderSubmitted && orderSuccessContent}
      {!isError && <p>Unable to submit order</p>}
    </Modal>
  );
};

export default CartModal;

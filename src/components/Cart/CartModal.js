import React, { useContext, useState } from "react";
import cartContext from "../store/cartContext";
import Modal from "../UI/Modal";
import ModalItems from "./ModalItems";
import classes from "./CartModal.module.css";
import CheckOutForm from "./CheckOutForm";

const CartModal = (props) => {
  const context = useContext(cartContext);
  const [showCheckOutForm, setshowCheckOutForm] = useState(false);
  const [orderSubmiting, setorderSubmiting] = useState(false);
  const [orderSubmitted, setorderSubmitted] = useState(false);
  let itemsToRender = context.itemsArr.map((ele) => (
    <ModalItems
      data={ele}
      key={ele.id}
      addItem={context.addItem.bind(null, ele)}
      removeItem={context.removeItem.bind(null, ele.id)}
    />
  ));

  const finalPrice = context.itemsArr.reduce((initialValue, ele) => {
    return initialValue + ele.price * ele.quantity;
  }, 0);

  const orderHandler = () => {
    setshowCheckOutForm(true);
  };

  const submitOrdertoDB = async (userData) => {
    setorderSubmiting(true);
    const orderDetails = {
      orderedItems: context.itemsArr,
      userDetails: userData,
      orderedDateTime: new Date().toString(),
    };

    const response = await fetch(
      "https://food-order-backend-bd383-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify(orderDetails),
      }
    );
    if (response.ok) {
      setorderSubmiting(false);
      setorderSubmitted(true);
      context.clearCartItems();
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
      {!orderSubmiting && !orderSubmitted && finalContentToRender}
      {orderSubmiting && !orderSubmitted && (
        <p>Confirming your order with Restaurant</p>
      )}
      {!orderSubmiting && orderSubmitted && orderSuccessContent}
    </Modal>
  );
};

export default CartModal;

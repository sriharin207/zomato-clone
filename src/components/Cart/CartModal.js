import React, { useContext } from "react";
import cartContext from "../store/cartContext";
import Modal from "../UI/Modal";
import ModalItems from "./ModalItems";
import classes from "./CartModal.module.css";

const CartModal = (props) => {
  const context = useContext(cartContext);
  //need to replace with context
  let contentToRender = context.itemsArr.map((ele) => (
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

  return (
    <Modal modalVis={props.modalVis}>
      {contentToRender}
      <div className={classes.amountSummary}>
        <h2>Total Amount</h2>
        <h2>Rs {finalPrice.toFixed(2)}</h2>
      </div>
      <div className={classes.btns}>
        <button onClick={props.modalVis}>Close</button>
        <button>Order</button>
      </div>
    </Modal>
  );
};

export default CartModal;

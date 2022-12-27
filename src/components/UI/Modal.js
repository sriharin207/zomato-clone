import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const domPlaceToRender = document.getElementById("modalContainer");

const ModalContainer = (props) => {
  return <div className={classes.container} onClick={props.changeModal}></div>;
};

const ModalContent = (props) => {
  return (
    <div className={classes.modalContent}>
      <div className={classes.elements}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <ModalContainer changeModal={props.modalVis} />,
        domPlaceToRender
      )}
      {ReactDOM.createPortal(
        <ModalContent>{props.children}</ModalContent>,
        domPlaceToRender
      )}
    </Fragment>
  );
};

export default Modal;

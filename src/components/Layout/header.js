import React, { Fragment, useState } from "react";
import HeaderCartButton from "../Cart/HeaderCartButton";
import classes from "./header.module.css";
import bgImg from "./../../images/bg1.jpg";
import CartModal from "../Cart/CartModal";
const Header = (props) => {
  const [modalState, setmodalState] = useState(false);

  const enableModalVisibility = () => {
    setmodalState(true);
  };
  const disableModalVisibility = () => {
    setmodalState(false);
  };

  return (
    <Fragment>
      <header className={classes.header}>
        <h2 className={classes.title}>Zomato</h2>
        <HeaderCartButton onclick={enableModalVisibility} />
      </header>
      <div className={classes["main-bg"]}>
        <img src={bgImg} alt="" />
      </div>
      <div>{modalState && <CartModal modalVis={disableModalVisibility} />}</div>
    </Fragment>
  );
};

export default Header;

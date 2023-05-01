import React, { Fragment, useState } from "react";
import HeaderCartButton from "../Cart/HeaderCartButton";
import classes from "./header.module.css";
import bgImg from "./../../images/bg1.jpg";
import CartModal from "../Cart/CartModal";
import { Form, NavLink, useRouteLoaderData } from "react-router-dom";

const Header = (props) => {
  const tokenExists = useRouteLoaderData("root-loader");
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
        <div>
          <NavLink to="/items">
            <h2>Zomato</h2>
          </NavLink>
        </div>
        {tokenExists && (
          <div>
            <NavLink
              to="/orders"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              <h3>My Orders</h3>
            </NavLink>
          </div>
        )}

        <div className={classes.cartBtn}>
          {tokenExists && <HeaderCartButton onclick={enableModalVisibility} />}
          {!tokenExists && (
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              <h3>Login</h3>
            </NavLink>
          )}

          {tokenExists && (
            <Form action="/logout" method="POST">
              <button className={classes.logout}>
                <h4>Logout</h4>
              </button>
            </Form>
          )}
        </div>
      </header>
      <div className={classes["main-bg"]}>
        <img src={bgImg} alt="" />
      </div>
      <div>{modalState && <CartModal modalVis={disableModalVisibility} />}</div>
    </Fragment>
  );
};

export default Header;

import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import { Provider } from "react-redux";
import { store } from "../store/store";
import AppCss from "../../App.module.css";

const RootLayout = () => {
  return (
    <div>
      <Provider store={store} className={AppCss.border}>
        <Header />
        <Outlet />
      </Provider>
    </div>
  );
};

export default RootLayout;

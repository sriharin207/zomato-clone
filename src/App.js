import React from "react";
import Header from "./components/Layout/header";
import AppCss from "./App.module.css";
import Meals from "./components/Meals/Meals";

import CartContextProvider from "./components/store/cartContextProvider";

function App() {
  return (
    <CartContextProvider className={AppCss.border}>
      <Header />
      <Meals />
    </CartContextProvider>
  );
}

export default App;

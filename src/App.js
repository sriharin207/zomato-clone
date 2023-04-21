import React from "react";
import Header from "./components/Layout/header";
import AppCss from "./App.module.css";
import Meals from "./components/Meals/Meals";

import { store } from "./components/store/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store} className={AppCss.border}>
      <Header />
      <Meals />
    </Provider>
  );
}

export default App;

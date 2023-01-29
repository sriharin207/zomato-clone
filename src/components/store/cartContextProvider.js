import React, { useReducer } from "react";
import cartContext from "./cartContext";

const defaultItemArr = [];
const cardReducer = (state, action) => {
  let updatedArr = state.concat();
  if (action.type === "ADD") {
    const ifEleExistsIdx = updatedArr.findIndex(
      (ele) => ele.id === action.item.id
    );
    // console.log(ifEleExistsIdx);
    if (ifEleExistsIdx === -1) {
      updatedArr = updatedArr.concat({ ...action.item });
    } else {
      updatedArr[ifEleExistsIdx].quantity += 1;
    }
    return updatedArr;
  } else if (action.type === "REMOVE") {
    const ifEleExistsIdx = updatedArr.findIndex((ele) => ele.id === action.id);

    if (ifEleExistsIdx !== -1) {
      const currentQuantity = updatedArr[ifEleExistsIdx].quantity;
      if (currentQuantity > 1) {
        updatedArr[ifEleExistsIdx].quantity -= 1;
      } else {
        const newArr = updatedArr.filter((ele) => ele.id !== action.id);
        updatedArr = [...newArr];
      }
    }
    return updatedArr;
  } else if (action.type === "CLEAR") {
    return defaultItemArr;
  }
  return defaultItemArr;
};

const CartContextProvider = (props) => {
  const [items, updateItemms] = useReducer(cardReducer, defaultItemArr);

  const addItems = (item) => {
    updateItemms({ type: "ADD", item: item });
  };

  const removeItems = (id) => {
    updateItemms({ type: "REMOVE", id: id });
  };

  const clearCartItems = () => {
    updateItemms({ type: "CLEAR" });
  };

  const cartContextValue = {
    itemsArr: items,
    addItem: addItems,
    removeItem: removeItems,
    clearCartItems: clearCartItems,
  };

  return (
    <cartContext.Provider value={cartContextValue}>
      {props.children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;

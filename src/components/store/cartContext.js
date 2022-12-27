import React from "react";

const cartContext = React.createContext({
    itemsArr : [],
    addItem : (item) => {},
    removeItem : (id) => {}
})

export default cartContext;

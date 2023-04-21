import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const dataSlice = createSlice({
  name: "globalDataState",
  initialState,
  reducers: {
    addItems: (state, action) => {
      let updatedArr = state.items;
      const ifEleExistsIdx = updatedArr.findIndex(
        (ele) => ele.id === action.payload.id
      );
      if (ifEleExistsIdx === -1) {
        updatedArr = updatedArr.concat({ ...action.payload });
      } else {
        updatedArr[ifEleExistsIdx].quantity += 1;
      }
      state.items = updatedArr;
    },

    removeItem: (state, action) => {
      let updatedArr = state.items;
      const ifEleExistsIdx = updatedArr.findIndex(
        (ele) => ele.id === action.payload.id
      );

      if (ifEleExistsIdx !== -1) {
        const currentQuantity = updatedArr[ifEleExistsIdx].quantity;
        if (currentQuantity > 1) {
          updatedArr[ifEleExistsIdx].quantity -= 1;
        } else {
          const newArr = updatedArr.filter(
            (ele) => ele.id !== action.payload.id
          );
          updatedArr = [...newArr];
        }
      }
      state.items = updatedArr;
    },

    clearItems: (state) => {
      state.items = [];
    },
  },
});

export const dataSliceActions = dataSlice.actions;
export default dataSlice.reducer;

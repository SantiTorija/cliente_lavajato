import { createSlice } from "@reduxjs/toolkit";

const orderToEditSlice = createSlice({
  name: "orders",
  initialState: [],
  reducers: {
    addReserveToEdit(state, action) {
      state.push({ ...action.payload });
    },
    emptyOrderToEdit(state) {
      state.length = 0;
    },
  },
});

const { actions, reducer } = orderToEditSlice;
export const { addReserveToEdit, emptyOrderToEdit } = actions;

export default reducer;

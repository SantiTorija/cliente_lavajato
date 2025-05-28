import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {},
  reducers: {
    addDateAndTime(state, action) {
      state.date = action.payload.date;
      state.slot = action.payload.slot;
    },
    addService(state, action) {
      state.total = action.payload.total;
      state.carType = action.payload.carType;
      state.service = action.payload.service;
    },
    emptyCart(state) {
      delete state.date;
      delete state.slot;
      delete state.total;
      delete state.carType;
      delete state.service;
    },
    emptyService(state) {
      delete state.total;
      delete state.carType;
      delete state.service;
    },
    emptyDateTime(state) {
      delete state.date;
      delete state.slot;
    },
  },
});

const { actions, reducer } = cartSlice;
export const {
  addDateAndTime,
  addService,
  emptyCart,
  addReserveToEdit,
  emptyService,
  emptyDateTime,
} = actions;

export default reducer;

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "",
  initialState: [],
  reducers: {
    method(state, action) {
      state, action; //logica
    },
  },
});

const { actions, reducer } = cartSlice;
export const { method } = actions;

export default reducer;

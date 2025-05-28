import { createSlice } from "@reduxjs/toolkit";

const reserveStepSlice = createSlice({
  name: "reserveStep",
  initialState: 1,
  reducers: {
    next(state, action) {
      return state + 1;
    },
    prev(state, action) {
      return state - 1;
    },
    setStartStep(state, action) {
      return 1;
    },
  },
});

const { actions, reducer } = reserveStepSlice;
export const { next, prev, setStartStep } = actions;

export default reducer;

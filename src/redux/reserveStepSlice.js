import { createSlice } from "@reduxjs/toolkit";

const reserveStepSlice = createSlice({
  name: "reserveStep",
  initialState: 1,
  reducers: {
    next(state) {
      return state + 1;
    },
    prev(state) {
      return state - 1;
    },
    setStartStep() {
      return 1;
    },
    setStep(state, action) {
      return action.payload;
    },
  },
});

const { actions, reducer } = reserveStepSlice;
export const { next, prev, setStartStep, setStep } = actions;

export default reducer;

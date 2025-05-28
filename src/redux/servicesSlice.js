import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  prices: {
    chico: { lavado: 800, lavadoYEncerado: 1100 },
    suv: { lavado: 1000, lavadoYEncerado: 1300 },
    grande: { lavado: 1200, lavadoYEncerado: 1500 },
  },
};

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    updatePrices: (state, action) => {
      state.prices = action.payload;
    },
  },
});

export const { updatePrices } = servicesSlice.actions;
export default servicesSlice.reducer;

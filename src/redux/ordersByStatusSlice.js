import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOrdersByStatus = createAsyncThunk(
  "ordersByStatus/fetch",
  async ({ status, email }) => {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/order/status/${status}/email/${email.trim()}`
    );
    return response.data;
  }
);

export const deleteOrder = createAsyncThunk(
  "ordersByStatus/deleteOrder",
  async ({ orderId, orderDate, orderSlot }) => {
    await axios.delete(
      `${
        import.meta.env.VITE_API_URL
      }/order/${orderId}/${orderDate}/${orderSlot}`
    );
    return orderId;
  }
);

const ordersByStatusSlice = createSlice({
  name: "ordersByStatus",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersByStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersByStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrdersByStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.orders = [];
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(
          (order) => order.id !== action.payload
        );
      });
  },
});

export default ordersByStatusSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicGet, publicPut } from "../../utils/apiCaller";

export const fetchOrder = createAsyncThunk("orders", async () => {
  try {
    const response = await publicGet("/order/list");
    return response.data;
  } catch (err) {
    return { error: err.message };
  }
});
export const confirmOrder = createAsyncThunk("confirmOrder", async (id) => {
    console.log("Confirming order with ID:", id);
    try {
      const response = await publicPut(`/order/confirm/${id}`);
      console.log("Confirm order response:", response);
      return response.data;
    } catch (err) {
      console.error("Error confirming order:", err);
      return { error: err.message };
    }
  });
export const cancelOrder = createAsyncThunk("cancelOrder", async (id) => {
    
    try {
      const response = await publicPut(`/order/cancel/${id}`);
      console.log("Confirm order response:", response);
      return response.data;
    } catch (err) {
      console.error("Error confirming order:", err);
      return { error: err.message };
    }
  });
  
const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    //confirm
    builder
      .addCase(confirmOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(confirmOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(confirmOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
      //cancel
    builder
      .addCase(cancelOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;

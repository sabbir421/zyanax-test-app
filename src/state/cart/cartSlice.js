import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicGet, publicPatch, publicPost } from "../../utils/apiCaller";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (product, { rejectWithValue }) => {
    try {
      const response = await publicPost("/cart/add", product);
      return response.payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchCartList = createAsyncThunk(
  "cart/fetchCartList",
  async () => {
    try {
      const response = await publicGet("/cart/list");
      return response.data;
    } catch (err) {
      return { error: err.message };
    }
  }
);
export const updateCart = createAsyncThunk("cart/update", async (data) => {
  try {
    const response = await publicPatch("/cart/update", data);
    return response.data;
  } catch (err) {
    return { error: err.message };
  }
});
export const cartSummery = createAsyncThunk("cart/summery", async () => {
  try {
    const response = await publicGet("/product/summery");
    return response.data;
  } catch (err) {
    return { error: err.message };
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: null,
    cartList: [],
    status: "idle",
    error: null,
    summery: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Add to cart
    builder.addCase(addToCart.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.data;
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    // Fetch cart list
    builder.addCase(fetchCartList.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchCartList.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.cartList = action.payload;
    });

    builder.addCase(fetchCartList.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    // update cart
    builder.addCase(updateCart.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateCart.fulfilled, (state, action) => {
      state.status = "succeeded";
    });

    builder.addCase(updateCart.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    //summery
    builder.addCase(cartSummery.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(cartSummery.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.summery = action.payload;
    });

    builder.addCase(cartSummery.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default cartSlice.reducer;

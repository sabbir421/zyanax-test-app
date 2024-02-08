import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicGet, publicPost } from "../../utils/apiCaller";

export const fetchProductList = createAsyncThunk(
  "productList/fetch",
  async () => {
    try {
      const response = await publicGet("/product/list");
      return response.data;
    } catch (err) {
      return { error: err.message };
    }
  }
);
export const createProduct = createAsyncThunk("createProduct", async (data) => {
  try {
    const response = await publicPost("/product/add", data);
    console.log("---------response-------->", response);
    return response.data;
  } catch (err) {
    console.log("-------error------>", err);
    return { error: err.message };
  }
});

export const checkoutProduct = createAsyncThunk("checkout", async ({}) => {
  try {
    const response = await publicPost("/product/checkout", {});
    return response;
  } catch (err) {
    return { error: err.message };
  }
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchProductList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    //checkout
    builder
      .addCase(checkoutProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkoutProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(checkoutProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    //add product
    builder
      .addCase(createProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;

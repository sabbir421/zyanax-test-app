import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicGet, publicPost } from "../../utils/apiCaller";

export const fetchProdmoList = createAsyncThunk("promoList/fetch", async () => {
  try {
    const response = await publicGet("/promo/list");
    return response.data;
  } catch (err) {
    return { error: err.message };
  }
});
export const createPromo = createAsyncThunk("createPromo", async (data) => {
  try {
    console.log("-------------->",data);
    const response = await publicPost("/promo/add", data);
    return response.data;
  } catch (err) {
    return { error: err.message };
  }
});

const promoSlice = createSlice({
  name: "promo",
  initialState: {
    promos: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProdmoList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProdmoList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.promos = action.payload;
      })
      .addCase(fetchProdmoList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    //add product
    builder
      .addCase(createPromo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPromo.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(createPromo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default promoSlice.reducer;

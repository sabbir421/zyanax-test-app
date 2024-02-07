import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicPost } from "../../utils/apiCaller";

export const userSignup = createAsyncThunk("user", async (data) => {
  try {
    const response = await publicPost("/customer/signup", data);
    return response.data;
  } catch (err) {
    return { error: err.message };
  }
});

const userSlice = createSlice({
  name: "product",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userSignup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userSignup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(userSignup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;

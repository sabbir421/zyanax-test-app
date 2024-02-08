import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicPost } from "../../utils/apiCaller";

export const adminLogin = createAsyncThunk("admin", async (data) => {
  try {
    const response = await publicPost("/admin/auth", data);
    return response.data;
  } catch (err) {
    return { error: err.message };
  }
});

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default adminSlice.reducer;

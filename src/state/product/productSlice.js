import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { publicGet } from '../../utils/apiCaller';

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

const productSlice = createSlice({
  name: 'product',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchProductList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;

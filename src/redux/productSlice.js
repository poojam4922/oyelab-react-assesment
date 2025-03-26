import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = `https://dummyjson.com/products`;
const initialState = {
  products: [],
  totalProducts: 0,
  currentPage: 1,
  limit: 8,
  loading: false,
  error: null,
  productDetails: null,
  productLoading: false,
  productError: null,
};

export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async ({ page = 1, limit = 8 }) => {
    const skip = (page - 1) * limit;
    let url = `${BASE_URL}?limit=${limit}&skip=${skip}`;
    const response = await axios.get(url);
    return response.data.products;
  }
);

export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    console.log(response);
    return response.data;
  }
);

const productSilce = createSlice({
  name: "products",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.totalProducts = action.payload.total;
        state.error = null;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //   Detailed Product.
      .addCase(fetchProductDetails.pending, (state) => {
        state.productLoading = true;
        state.productError = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.productLoading = false;
        state.productDetails = action.payload;
        state.productError = null;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.productLoading = false;
        state.productError = action.error.message;
      });
  },
});
export const { setPage } = productSilce.actions;
export default productSilce.reducer;

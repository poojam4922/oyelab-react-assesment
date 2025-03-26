import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = `https://dummyjson.com/users`;

const initialState = {
  users: [],
  loading: false,
  error: null,
  currentPage: 1,
  limit: 8,
  totalUsers: 0,
  userDetails: null,
  userPosts: [], // added this state for user's posts
  userLoading: false,
  userError: null,
};

export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async ({ page = 1, limit = 8 }) => {
    try {
      const skip = (page - 1) * limit;
      const url = `${BASE_URL}?limit=${limit}&skip=${skip}`;
      const response = await axios.get(url);
      return response.data.users;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch users.");
    }
  }
);

// Fetch user details
export const fetchUserDetails = createAsyncThunk(
  "users/fetchUserDetails",
  async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch user details.");
    }
  }
);

// Fetch user posts
export const fetchUserPosts = createAsyncThunk(
  "users/fetchUserPosts",
  async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/${userId}/posts`);
      return response.data.posts;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch user posts.");
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetching users
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetching user details
      .addCase(fetchUserDetails.pending, (state) => {
        state.userLoading = true;
        state.userError = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userDetails = action.payload;
        state.userError = null;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.error.message;
      })

      // Fetching user posts
      .addCase(fetchUserPosts.pending, (state) => {
        state.userLoading = true;
        state.userError = null;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userPosts = action.payload;
        state.userError = null;
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.error.message;
      });
  },
});

export const { setUserPage } = userSlice.actions;
export default userSlice.reducer;

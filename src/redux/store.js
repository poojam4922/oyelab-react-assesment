import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import userReducer from "./userSilce";
const store = configureStore({
  reducer: {
    products: productReducer,
    users: userReducer,
  },
});

export default store;

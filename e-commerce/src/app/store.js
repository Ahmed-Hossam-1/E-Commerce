import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Featrures/authFeature/authSlice";
import userReducer from "../Featrures/userFeatures/userSlice";

const store = configureStore({
  reducer: { auth: authReducer, user: userReducer },
  devTools: import.meta.env.VITE_NODE_ENV === "development",
});

export default store;

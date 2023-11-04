import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Featrures/authFeature/authSlice";

const store = configureStore({
  reducer: { auth: authReducer },
  devTools: import.meta.env.VITE_NODE_ENV === "development",
});

export default store;

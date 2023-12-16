import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  login,
  logout,
  register,
} from "../../services/authService/auth.service.js";
import { LOGIN, LOGOUT, REGISTER } from "../../utils/API/Permisions.js";

const userSignup = createAsyncThunk(
  `/${REGISTER}`,
  async (userData, thunkAPI) => {
    try {
      return await register(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const userLogin = createAsyncThunk(`/${LOGIN}`, async (userData, thunkAPI) => {
  try {
    return await login(userData);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
const userLogout = createAsyncThunk(`/${LOGOUT}`, async () => {
  await logout();
});

export { userSignup, userLogin, userLogout };

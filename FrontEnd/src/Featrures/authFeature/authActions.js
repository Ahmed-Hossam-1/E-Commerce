import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  login,
  logout,
  register,
} from "../../services/authService/auth.service.js";

const userSignup = createAsyncThunk(`/register`, async (userData, thunkAPI) => {
  try {
    return await register(userData);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const userLogin = createAsyncThunk(`login`, async (userData, thunkAPI) => {
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
const userLogout = createAsyncThunk(`logout`, async () => {
  await logout();
});

export { userSignup, userLogin, userLogout };

import { createSlice } from "@reduxjs/toolkit";
import { userLogout, userSignup, userLogin } from "./authActions";
import Cookie from "cookie-universal";

const user = Cookie();
const token = user.get("Bearer");
const initialState = {
  isLoading: false,
  user: token ? token : null, // {accessToken,email}
  isError: null,
  isSuccess: false,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.user = null;
      state.isError = null;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    // register user
    builder.addCase(userSignup.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userSignup.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.message;
      state.user = action.payload;
    });
    builder.addCase(userSignup.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.user = null;
    });
    // login user
    builder.addCase(userLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.user = null;
    });
    // logout user
    builder.addCase(userLogout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userLogout.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = null;
    });
    builder.addCase(userLogout.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.user = null;
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;

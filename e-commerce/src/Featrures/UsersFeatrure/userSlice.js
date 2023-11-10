import { createSlice } from "@reduxjs/toolkit";
import {
  _addUser,
  _deleteUser,
  _editUser,
  _getUser,
  _getUsers,
} from "./userActions";

const initialState = {
  isLoading: false,
  isError: null,
  isSuccess: false,
  user: null,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = null;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    // add user
    builder.addCase(_addUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(_addUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
      state.message = action.payload.message;
    });
    builder.addCase(_addUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
    // edit user
    builder.addCase(_editUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(_editUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
      state.message = action.payload;
    });
    builder.addCase(_editUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
    // get user
    builder.addCase(_getUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(_getUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(_getUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.message;
      state.user = null;
    });
    // get users
    builder.addCase(_getUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(_getUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(_getUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.message;
      state.user = null;
    });
    // delete user
    builder.addCase(_deleteUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(_deleteUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(_deleteUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.message;
      state.user = null;
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;

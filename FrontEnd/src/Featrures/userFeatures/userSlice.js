import { createSlice } from "@reduxjs/toolkit";
import {
  addUser,
  deleteUser,
  editUser,
  fetchUser,
  getUsers,
} from "./userActions";

const initialState = {
  isLoading: false,
  user: [],
  isError: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch user
    builder.addCase(fetchUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isError = "";
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isLoading = false;
      state.user = [];
      state.isError = action.payload;
    });
    // add user
    builder.addCase(addUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isError = "";
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.isLoading = false;
      state.user = [];
      state.isError = action.payload;
    });
    // edit user
    builder.addCase(editUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isError = "";
    });
    builder.addCase(editUser.rejected, (state, action) => {
      state.isLoading = false;
      state.user = [];
      state.isError = action.payload;
    });
    // delete user
    builder.addCase(deleteUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isError = "";
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.isLoading = false;
      state.user = [];
      state.isError = action.payload;
    });
    // fetch all  users
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isError = "";
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.user = [];
      state.isError = action.payload;
    });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;

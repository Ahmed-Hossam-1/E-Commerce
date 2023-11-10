import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addUser,
  deleteUser,
  editUser,
  getUser,
  getUsers,
} from "../../services/UsersService/user.service";
import { USER, USERS } from "../../services/API/Permisions";

const _addUser = createAsyncThunk(
  `/${USER}/add`,
  async (userData, thunkAPI) => {
    try {
      return await addUser(userData);
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

const _deleteUser = createAsyncThunk(
  `/${USER}/delete`,
  async (userID, thunkAPI) => {
    try {
      return await deleteUser(userID);
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

const _editUser = createAsyncThunk(
  `/${USER}/edit`,
  async (userID, userData, thunkAPI) => {
    try {
      return await editUser(userData, userID);
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

const _getUser = createAsyncThunk(`/${USER}`, async (thunkAPI) => {
  try {
    return await getUser();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const _getUsers = createAsyncThunk(`/${USERS}`, async (thunkAPI) => {
  try {
    return await getUsers();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export { _deleteUser, _addUser, _editUser, _getUser, _getUsers };

import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUser } from "../../services/UsersService/user.service";

const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const res = await getUser();
  return res;
});

const addUser = createAsyncThunk("user/addUser", async (userData) => {
  const res = await addUser(userData);
  return res;
});

const editUser = createAsyncThunk("user/editUser", async (userData) => {
  const res = await editUser(userData);
  return res;
});

const deleteUser = createAsyncThunk("user/deleteUser", async (usersID) => {
  const res = await deleteUser(usersID);
  return res;
});

const getUsers = createAsyncThunk("user/getUsers", async () => {
  const res = await getUsers();
  return res;
});

export { fetchUser, addUser, editUser, deleteUser, getUsers };

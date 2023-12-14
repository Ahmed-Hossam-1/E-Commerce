import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUser } from "../../services/UsersService/user.service";

const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const res = await getUser();

  return res;
});

export { fetchUser };

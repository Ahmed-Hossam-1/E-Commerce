import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "./userActions";

const initialState = {
  isLoading: false,
  user: [],
  error: "",
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
      state.error = "";
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isLoading = false;
      state.user = [];
      state.error = action.payload;
    });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;

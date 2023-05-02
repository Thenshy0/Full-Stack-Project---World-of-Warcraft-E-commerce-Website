import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { profileRequest } from "../services/UserService";

const getLocalStoreItem = () => {
  if (localStorage.getItem("loginStatus") === null) {
    return false;
  } else {
    return JSON.parse(localStorage.getItem("loginStatus"));
  }
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await profileRequest();
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: [],
    error: "",
    loading: true,
    isLoggedIn: getLocalStoreItem(),
  },
  reducers: {
    login: (state) => {
      localStorage.setItem("loginStatus", "true");
      state.isLoggedIn = getLocalStoreItem();
    },
    logout: (state) => {
      localStorage.setItem("loginStatus", "false");
      state.isLoggedIn = getLocalStoreItem();
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = "";
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.user = {};
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { login, logout, updateRender, setUser } = userSlice.actions;
export default userSlice.reducer;

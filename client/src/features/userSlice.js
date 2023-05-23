import { createSlice } from "@reduxjs/toolkit";

const getUserDataFromLocalStorage = () => {
  const userData = localStorage.getItem("user");
  try {
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);
    return null;
  }
};
const getLocalStoreItem = () => {
  if (localStorage.getItem("loginStatus") === null) {
    return false;
  } else {
    return JSON.parse(localStorage.getItem("loginStatus"));
  }
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: getUserDataFromLocalStorage(),
    error: "",
    loading: true,
    isLoggedIn: getLocalStoreItem(),
    userId: null,
    is_admin: 0,
  },
  reducers: {
    login: (state, action) => {
      localStorage.setItem("loginStatus", "true");
      localStorage.setItem("user", JSON.stringify(action.payload));
      console.log(action.payload.refreshToken);
      state.isLoggedIn = getLocalStoreItem();
      state.user = {
        ...action.payload,
        image: action.payload.image,
      };
      console.log(action.payload);
      state.is_admin = action.payload.is_admin;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      if (action.payload.image) {
        state.user.image = action.payload.image;
      }
      localStorage.setItem("user", JSON.stringify(state.user));
    },

    deleteUser: (state, action) => {
      const userId = action.payload;
      if (state.user && state.user.id === userId) {
        state.user = null;
      }
    },

    updateUserPicture: (state, action) => {
      state.user.imageDataURL = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
    },

    logout: (state) => {
      localStorage.setItem("loginStatus", "false");
      localStorage.removeItem("user");

      state.isLoggedIn = getLocalStoreItem();
      state.user = null;
      state.is_admin = 0;
    },
  },
});

export const { login, logout, updateUser, updateUserPicture, deleteUser } =
  userSlice.actions;
export default userSlice.reducer;

import userReducer from "../features/userSlice";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    userR: userReducer,
  },
});

export default store;

import categoryReducer from "../features/categorySlice";
import productReducer from "../features/productSlice";
import userReducer from "../features/userSlice";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    userR: userReducer,
    productR: productReducer,
    categoryR: categoryReducer,
  },
});

export default store;

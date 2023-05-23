import { createSlice } from "@reduxjs/toolkit";
const getProductDataFromLocalStorage = () => {
  const productData = localStorage.getItem("product");
  try {
    return productData ? JSON.parse(productData) : null;
  } catch (error) {
    console.error("Error parsing product data from localStorage:", error);
    return null;
  }
};
export const productSlice = createSlice({
  name: "product",
  initialState: {
    product: getProductDataFromLocalStorage(),
    error: "",
    loading: true,
  },

  reducers: {
    updateProducts: (state, action) => {
      state.product = { ...state.product, ...action.payload };
      if (action.payload.image) {
        state.product.image = action.payload.image;
      }
      localStorage.setItem("product", JSON.stringify(state.product));
    },
    deleteProductReducer: (state, action) => {
      const productId = action.payload;
      if (state.product && state.product.id === productId) {
        state.product = null;
      }
    },
  },
});

export const { deleteProductReducer, updateProducts } = productSlice.actions;
export default productSlice.reducer;

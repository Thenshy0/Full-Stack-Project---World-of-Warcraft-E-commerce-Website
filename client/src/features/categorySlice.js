import { createSlice } from "@reduxjs/toolkit";
const getCategoryDataFromLocalStorage = () => {
  const categoryData = localStorage.getItem("category");
  try {
    return categoryData ? JSON.parse(categoryData) : null;
  } catch (error) {
    console.error("Error parsing category data from localStorage:", error);
    return null;
  }
};
export const categorySlice = createSlice({
  name: "category",
  initialState: {
    error: "",
    loading: true,
    category: getCategoryDataFromLocalStorage(),
  },

  reducers: {
    deleteCategoryReducer: (state, action) => {
      const categoryId = action.payload;
      if (state.category && state.category.id === categoryId) {
        state.category = null;
      }
    },
    updateCategories: (state, action) => {
      state.category = { ...state.category, ...action.payload };
      if (action.payload.image) {
        state.category.image = action.payload.image;
      }
      localStorage.setItem("category", JSON.stringify(state.category));
    },
  },
});

export const { deleteCategoryReducer, updateCategories } =
  categorySlice.actions;
export default categorySlice.reducer;

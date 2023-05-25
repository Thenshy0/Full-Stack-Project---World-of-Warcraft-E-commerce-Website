import axios from "axios";

// axios.defaults.withCredentials = true;
const baseURL = process.env.REACT_APP_BASEURL;

export const getAllCategories = async () => {
  const response = await axios.get(`${baseURL}/api/category`);
  return response.data;
};

export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/api/category/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data.error.message;
  }
};
export const SingleCategoryRequest = async (id) => {
  const response = await axios.get(`${baseURL}/api/category/${id}`);

  return response.data;
};
export const updateSingleCategory = async (id, updatedData) => {
  try {
    const response = await axios.put(
      `${baseURL}/api/category/update/${id}`,
      updatedData
    );

    return response.data;
  } catch (error) {
    throw error.response.data.error.message;
  }
};
export const createCategory = async (formData) => {
  try {
    const response = await axios.post(`${baseURL}/api/category`, formData);
    return response.data;
  } catch (error) {
    throw error.response.data.error.message;
  }
};

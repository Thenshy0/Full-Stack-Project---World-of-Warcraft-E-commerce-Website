import axios from "axios";

// axios.defaults.withCredentials = true;
const baseURL = process.env.REACT_APP_BASEURL;

export const getAllProducts = async (search, page, limit, category) => {
  const response = await axios.get(`${baseURL}/api/product`, {
    params: { search, page, limit, category },
  });
  return response.data;
};
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/api/product/delete/${id}`);

    return response.data;
  } catch (error) {
    throw error.response.data.error.message;
  }
};
export const SingleProductRequest = async (id) => {
  const response = await axios.get(`${baseURL}/api/product/${id}`);

  return response.data;
};

export const updateSingleProduct = async (id, updatedData) => {
  try {
    const response = await axios.put(
      `${baseURL}/api/product/update/${id}`,
      updatedData
    );

    return response.data;
  } catch (error) {
    throw error.response.data.error.message;
  }
};
export const createProduct = async (formData) => {
  try {
    const response = await axios.post(`${baseURL}/api/product`, formData);

    return response.data;
  } catch (error) {
    throw error.response.data.error.message;
  }
};

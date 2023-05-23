import axios from "axios";

// axios.defaults.withCredentials = true;
const baseURL = "http://127.0.0.1:8080";

export const createUserRequest = async (newUser) => {
  const response = await axios.post(`${baseURL}/api/users/register`, newUser);
  return response.data;
};
export const updateUserRequest = async (id, formData) => {
  const response = await axios.put(
    `${baseURL}/api/users/update/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
export const updateUserRequestbyAdmin = async (id, userData) => {
  const response = await axios.put(
    `${baseURL}/api/admin/dashboard/update/${id}`,
    userData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
export const deleteUserbyAdmin = async (id) => {
  try {
    const response = await axios.delete(
      `${baseURL}/api/admin/dashboard/delete/${id}`
    );
    return response.data;
  } catch (error) {
    throw error.response.data.error.message;
  }
};
export const getAllUsersRequest = async (search, page, limit) => {
  const response = await axios.get(`${baseURL}/api/admin/dashboard`, {
    params: { search, page, limit },
  });
  return response.data;
};
export const activateUser = async (token) => {
  const response = await axios.post(`${baseURL}/api/users/verify-email`, token);
  return response.data;
};
export const resetPassword = async (token) => {
  const response = await axios.post(
    `${baseURL}/api/users/reset-password`,
    token
  );
  return response.data;
};
export const profileRequest = async (id) => {
  const response = await axios.get(
    `${baseURL}/api/users/profile/${id}`,

    {
      credentials: true,
    }
  );
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await axios.post(
    `${baseURL}/api/auth/login`,
    email,
    password
  );
  return response.data;
};
export const logoutUser = async () => {
  try {
    const response = await axios.get(`${baseURL}/api/auth/logout`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const refreshTokenRequest = async (refreshToken) => {
  try {
    const response = await axios.get(`${baseURL}/api/auth/refresh-token`, {
      refreshToken,
    });
    return response.data.accessToken;
  } catch (error) {
    console.log(error);
  }
};
export const forgotPassword = async (email, password) => {
  try {
    const response = await axios.post(`${baseURL}/api/users/forgot-password`, {
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

import axios from "axios";
// axios.defaults.withCredentials = true;
const baseURL = "http://127.0.0.1:8080";

export const createUserRequest = async (newUser) => {
  const response = await axios.post(`${baseURL}/api/users/register`, newUser);
  return response.data;
};
export const updateUserRequest = async (userId, form) => {
  const response = await axios.put(
    `${baseURL}/api/users/update/${userId}`,
    form
  );
  return response.data;
};
export const getAllUsersRequest = async (newUser) => {
  const response = await axios.get(`${baseURL}/api/admin/dashboard`, newUser);
  return response.data;
};
export const activateUser = async (token) => {
  const response = await axios.post(`${baseURL}/api/users/verify-email`, token);
  return response.data;
};
export const profileRequest = async () => {
  const response = await axios.get(
    `${baseURL}/api/users/profile/644686beecd83b3ca27aee42`,

    {
      credentials: true,
    }
  );
  console.log(response);
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
export const refreshTokenRequest = async () => {
  try {
    const response = await axios.get(`${baseURL}/api/auth/refresh-token`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

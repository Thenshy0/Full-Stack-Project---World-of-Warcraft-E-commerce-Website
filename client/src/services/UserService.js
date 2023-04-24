import axios from "axios";
const baseURL = "http://127.0.0.1:8080";
export const createUserRequest = async (newUser) => {
  const response = await axios.post(`${baseURL}/api/users/register`, newUser);
  return response.data;
};
export const getAllUsersRequest = async (newUser) => {
  const response = await axios.get(`${baseURL}/api/admin/dashboard`, newUser);
  return response.data;
};

// export const login = async () => {
//   const response = await axios.post(`${baseURL}/api/users/login`);
//   return response.data;
// };
// export const logout = async () => {
//   const response = await axios.post(`${baseURL}/api/users/logout`);
//   console.log(response.data);
//   return response.data;
// };

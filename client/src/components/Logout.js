import React from "react";
import { logoutUser } from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/userSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      const user = response.data.user;
      dispatch(logout(user));
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button className="logoutButton" onClick={handleLogout}>
      Logout
    </button>
  );
};
export default Logout;

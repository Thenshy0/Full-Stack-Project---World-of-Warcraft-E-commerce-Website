import React from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Users from "../pages/Users";
import Navbar from "../layout/Navbar";
import Login from "../pages/Login";
import RegisterUser from "../pages/RegisterUser";
import Activate from "../pages/Activate";
import Profile from "../pages/Profile";
import { useSelector } from "react-redux";
import UpdateUser from "../pages/UpdateUser";

const Index = () => {
  const isLoggedIn = useSelector((state) => state.userR.isLoggedIn);
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />

        {isLoggedIn ? (
          // LOGGEDIN
          <>
            <Route path="/users" element={<Users />} />
            <Route path="/user-profile" element={<Profile />} />
            <Route path="/update-user" element={<UpdateUser />} />
          </>
        ) : (
          // LOGGEDOUT
          <>
            <Route path="/login-user" element={<Login />} />
            <Route path="/api/users/activate/:token" element={<Activate />} />
            <Route path="/register-user" element={<RegisterUser />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Index;

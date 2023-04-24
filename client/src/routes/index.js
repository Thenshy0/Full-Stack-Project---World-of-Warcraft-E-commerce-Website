import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Users from "../pages/Users";
import Navbar from "../layout/Navbar";
import Login from "../pages/Login";
import RegisterUser from "../pages/RegisterUser";

const Index = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/login-user" element={<Login />} />
        <Route path="/register-user" element={<RegisterUser />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Index;

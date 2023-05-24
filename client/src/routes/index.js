import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Users from "../pages/Admin/Users";
import Navbar from "../layout/Navbar";
import Login from "../pages/Login";
import RegisterUser from "../pages/RegisterUser";
import Activate from "../pages/Activate";
import Profile from "../pages/Profile";
import { useSelector } from "react-redux";
import UpdateUser from "../pages/UpdateUser";
import SingleUser from "../components/Admin/SingleUserInfoEdit";
import ResetPassword from "../pages/ResetPassword";
import Products from "../pages/Products";
import ProductsAdmin from "../pages/Admin/ProductsAdmin";
import SingleProduct from "../components/Admin/SingleProduct";
import SingleCategory from "../components/Admin/SingleCategory";
import CreateCategory from "../pages/Admin/CreateCategory";
import CreateProduct from "../pages/Admin/CreateProduct";
import Productdetails from "../pages/Productdetails";
import Footer from "../layout/Footer";

const Index = () => {
  const isLoggedIn = useSelector((state) => state.userR.isLoggedIn);
  const user = useSelector((state) => state.userR.user);
  const isAdmin = user?.isAdmin;

  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ minHeight: "100vh" }}>
        {" "}
        <Routes>
          <Route path="/" element={<Home />} />

          {isLoggedIn ? (
            // LOGGEDIN
            <>
              {/* ADMIN */}
              {isAdmin === 1 && (
                <>
                  {" "}
                  <Route path="/users" element={<Users />} />
                  <Route path="/products-admin" element={<ProductsAdmin />} />
                  <Route path="/view-user/:id" element={<SingleUser />} />
                  <Route
                    path="/view-product-admin/:id"
                    element={<SingleProduct />}
                  />
                  <Route
                    path="/view-categories-admin/:id"
                    element={<SingleCategory />}
                  />
                  <Route
                    path="/create-category-admin"
                    element={<CreateCategory />}
                  />
                  <Route
                    path="/create-product-admin"
                    element={<CreateProduct />}
                  />
                  <Route
                    path="/view-product/:id"
                    element={<Productdetails />}
                  />
                </>
              )}
              {/* USER */}
              <Route path="/user-profile/:id" element={<Profile />} />
              <Route path="/update-user/:id" element={<UpdateUser />} />
              <Route path="/products" element={<Products />} />
              <Route path="/view-product/:id" element={<Productdetails />} />
            </>
          ) : (
            // LOGGEDOUT
            <>
              <Route path="/login-user" element={<Login />} />
              <Route path="/api/users/activate/:token" element={<Activate />} />
              <Route
                path="/api/users/reset-password/:token"
                element={<ResetPassword />}
              />
              <Route path="/register-user" element={<RegisterUser />} />
              <Route path="/products" element={<Products />} />
              <Route path="/view-product/:id" element={<Productdetails />} />
            </>
          )}
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default Index;

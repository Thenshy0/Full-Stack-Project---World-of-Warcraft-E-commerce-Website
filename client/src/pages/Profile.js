import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import Logout from "../components/Logout";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, setUser } from "../features/userSlice";
import { profileRequest, refreshTokenRequest } from "../services/UserService";

const Profile = () => {
  const dispatch = useDispatch();
  // const location = useLocation();
  // const userData = location.state;
  // console.log(userData);
  // console.log(userData.id);
  useEffect(() => {
    dispatch(fetchUser());
    console.log("asd");
  }, [dispatch]);
  const { user, error, loading } = useSelector((state) => state.userR);
  console.log(user);
  // const handleRefresh = useCallback(async () => {
  //   try {
  //     const res = await refreshTokenRequest();
  //     dispatch(setUser(res.data));
  //     console.log(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [dispatch]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     handleRefresh();
  //   }, 1000 * 10);
  //   return () => clearInterval(interval);
  // }, [dispatch, handleRefresh]);

  // const imageUrl = "http://127.0.0.1:8080/public/images/users/" + user.image;
  return (
    <div>
      <h2>Profile</h2>
      <div>
        {/* <img src={imageUrl} className="user_img" alt={user.name}></img> */}
        <h3>Name: {user}</h3>
        <p>Email: {user}</p>
        <p>Phone: {user}</p>
        <p>Password: ******</p>
        <Link to="/update-user">
          <button>Update</button>
        </Link>
        <button>Deactivate Account</button>
        <Logout />
      </div>
    </div>
  );
};

export default Profile;
// const handleRefresh = useCallback(async () => {
//   try {
//     const refreshToken = await refreshTokenRequest();
//     console.log(refreshToken);
//   } catch (error) {
//     console.log(error);
//   }
// }, []);
// useEffect(() => {
//   const interval = setInterval(() => {
//     handleRefresh();
//   }, 1000 * 20);
//   return () => clearInterval(interval);
// }, [handleRefresh]);

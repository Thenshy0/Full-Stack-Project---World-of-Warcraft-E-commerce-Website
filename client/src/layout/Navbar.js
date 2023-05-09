import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logout from "../components/Logout";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.userR.isLoggedIn);

  return (
    <nav className="nav">
      <Link className="nav_link" to="/">
        Home
      </Link>

      {isLoggedIn ? (
        // LOGGED IN
        <>
          <Link
            className="nav_link"
            to={{
              pathname: "/user-profile",
            }}
          >
            Profile
          </Link>
          {/* ADMIN */}
          <Link className="nav_link" to="/users">
            Users
          </Link>

          <Logout />
        </>
      ) : (
        // LOGGED OUT
        <>
          <Link className="nav_link" to="/register-user">
            Register
          </Link>
          <Stack spacing={2} direction="row">
            <Button variant="outlined">
              <Link className="nav_link" to="/login-user">
                Login
              </Link>
            </Button>
          </Stack>
        </>
      )}
    </nav>
  );
};

export default Navbar;
// to="/user-profile"
// to={{
//   pathname: "/user-profile",
//   state: {
//     name: user.name,
//     email: user.email,
//     phone: user.phone,
//     image: user.image,
//   },
// }}

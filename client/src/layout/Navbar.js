import * as React from "react";
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  IconButton,
  Typography,
  Tooltip,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logout from "../components/Logout";
import Stack from "@mui/material/Stack";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.userR.isLoggedIn);
  const user = useSelector((state) => state.userR.user);
  const isAdmin = user?.isAdmin;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  let imageUrl;
  if (user?.image?.name === undefined) {
    imageUrl =
      `${process.env.REACT_APP_BASEURL}/public/images/users/` + user?.image;
  } else
    imageUrl =
      `${process.env.REACT_APP_BASEURL}/public/images/users/` +
      user?.image?.name;

  return (
    // NAVBAR
    <React.Fragment>
      <Box
        className="Box"
        sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
      >
        <Typography sx={{ minWidth: 100 }}>
          <Link className="nav_link" to="/">
            <HomeIcon sx={{ fontSize: 40 }} />
          </Link>
        </Typography>
        <Typography sx={{ minWidth: 100 }}>
          <Link className="nav_link" to="/products">
            Shop
          </Link>
        </Typography>
        <Typography sx={{ minWidth: 100 }}>About</Typography>
        {/* CONTROL PANEL */}
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="medium"
            sx={{ ml: 2, mr: 4 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {/* NAVBAR PROF IMAGE */}
            <Avatar
              sx={{ width: 50, height: 50, bgcolor: "#537188" }}
              src={imageUrl}
              className="user_img"
            ></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            bgcolor: "#537188",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "#537188",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* LOGGED IN */}
        {isLoggedIn ? (
          <div>
            <MenuItem onClick={handleClose} className="MenuItem">
              <Link className="nav_link" to={`/user-profile/${user.id}`}>
                Account setting
              </Link>
            </MenuItem>
            {/* ADMIN */}
            {isAdmin === 1 && (
              <div>
                <MenuItem onClick={handleClose}>
                  <Link className="nav_link" to="/users">
                    Users
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link className="nav_link" to="/products-admin">
                    Products & Categories
                  </Link>
                </MenuItem>
              </div>
            )}
            <Divider />
            <MenuItem onClick={handleClose}>
              <LogoutIcon className="LoginIcon" />
              <Logout />
            </MenuItem>
          </div>
        ) : (
          // LOGGED OUT
          <div>
            <MenuItem onClick={handleClose}>
              <LoginIcon className="LoginIcon" />
              <Link className="nav_link" to="/register-user">
                SignUp
              </Link>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <Stack spacing={0.5} direction="row">
                <LoginIcon className="LoginIcon" />
                <Link className="nav_link" to="/login-user">
                  Login
                </Link>
              </Stack>
            </MenuItem>
          </div>
        )}
      </Menu>
    </React.Fragment>
  );
};
export default Navbar;

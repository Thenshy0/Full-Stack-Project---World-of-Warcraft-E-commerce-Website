import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  profileRequest,
  updateUserRequestbyAdmin,
} from "../../services/UserService";
import {
  Avatar,
  Stack,
  Typography,
  Card,
  CardContent,
  Divider,
  Tooltip,
  Alert,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import BlockIcon from "@mui/icons-material/Block";
import CloseIcon from "@mui/icons-material/Close";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { updateUser } from "../../features/userSlice";
import { useDispatch } from "react-redux";
import DeleteUser from "./DeleteUser";

const SingleUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(false);
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  const [updateData, setUpdateData] = useState({
    name: "",
    email: "",
    userName: "",
    image: null,
    phone: "",
    is_admin: "",
    isBanned: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await profileRequest(id);
        setUser(userData);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [id]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 10000); // Display the message for 10 seconds
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!user) {
    return <div>Loading...</div>;
  }
  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (files) {
      setUpdateData((prevState) => ({
        ...prevState,
        image: files[0],
      }));
    } else {
      setUpdateData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const handleCancel = () => {
    setIsEditMode(false);
    setUpdateData({});
  };

  const { email, image, createdAt, isBanned, is_admin, name, phone, userName } =
    user.data.user;
  console.log("object");
  console.log(user.data.user);
  const imageUrl = "http://127.0.0.1:8080/public/images/users/" + image;

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedFields = {};

    for (const key in updateData) {
      if (updateData[key] !== "") {
        updatedFields[key] = updateData[key];
      }
    }

    const form = new FormData();

    Object.entries(updatedFields).forEach(([key, value]) => {
      form.append(key, value);
    });
    // if (updateData.image !== null) {
    //   form.append("image", updateData.image);
    // }
    try {
      const response = await updateUserRequestbyAdmin(id, form);
      dispatch(updateUser({ ...updatedFields, image: response.image }));
      setIsEditMode(false);
      const updatedUserData = await profileRequest(id);
      setUser(updatedUserData);
      setUpdateData({});
      setMessage(response.message);
    } catch (error) {
      setMessage(error.response.data.error.message);
    }
  };
  const handleAdmin = async () => {
    try {
      const response = await updateUserRequestbyAdmin(id, {
        is_admin: is_admin ? 0 : 1,
      });
      dispatch(updateUser(updateData));
      const updatedUserData = await profileRequest(id);
      setUser(updatedUserData);
      setMessage(response.message);
    } catch (error) {
      setMessage(error.response.data.error.message);
    }
  };
  const handleBan = async () => {
    try {
      const response = await updateUserRequestbyAdmin(id, {
        isBanned: isBanned ? false : true,
      });
      const updatedUserData = await profileRequest(id);
      setUser(updatedUserData);
      setMessage(response.message);
    } catch (error) {
      setMessage(error.response.data.error.message);
    }
  };

  return (
    <div>
      {" "}
      <div className="single-user-card">
        <Card sx={{ minWidth: 275 }}>
          <CardContent className="user">
            <Stack>
              {/* USER DETAILS */}
              <Avatar
                src={imageUrl}
                sx={{ width: 70, height: 70, marginLeft: "1rem" }}
                className="user_img"
                alt={name}
              ></Avatar>
              <br /> <Divider />
              <br />
              <Typography sx={{ fontSize: 20, paddingLeft: 2 }} gutterBottom>
                User ID: {id}
              </Typography>
              <Typography sx={{ fontSize: 18, paddingLeft: 2 }} gutterBottom>
                User Name: {userName}
              </Typography>
              <Typography sx={{ fontSize: 18, paddingLeft: 2 }} gutterBottom>
                Full Name: {name}
              </Typography>
              <Typography sx={{ fontSize: 18, paddingLeft: 2 }} gutterBottom>
                Email address: {email}
              </Typography>
              <Typography sx={{ fontSize: 18, paddingLeft: 2 }} gutterBottom>
                Phone number: {phone}
              </Typography>
              <Typography sx={{ fontSize: 18, paddingLeft: 2 }} gutterBottom>
                Created on: {createdAt}
              </Typography>
              <Typography sx={{ fontSize: 18, paddingLeft: 2 }} gutterBottom>
                Ban: {isBanned === false ? "Not banned" : "Banned"}
              </Typography>
              <Typography sx={{ fontSize: 18, paddingLeft: 2 }} gutterBottom>
                Admin: {is_admin === 1 ? "Admin" : "Not an admin"}
              </Typography>
            </Stack>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* UPDATE */}
              <Tooltip title="Update">
                <Link to="" onClick={() => setIsEditMode(true)}>
                  <SettingsIcon
                    color="primary"
                    aria-haspopup="true"
                    sx={{
                      fontSize: 30,

                      marginTop: 2,
                      color: "#202737",
                    }}
                  />
                </Link>
              </Tooltip>
              {/* ENABLE ADMIN */}
              <Tooltip title="Enable Admin">
                <Link to="" onClick={handleAdmin}>
                  <AdminPanelSettingsIcon
                    color="primary"
                    aria-haspopup="true"
                    sx={{
                      fontSize: 30,
                      paddingLeft: 3,
                      marginTop: 2,
                      color: is_admin === 1 ? "#537188" : "#202737",
                    }}
                  />
                </Link>
              </Tooltip>
              {/* BLOCK */}
              <Tooltip title="Block">
                <Link to="" onClick={handleBan}>
                  <BlockIcon
                    color="primary"
                    aria-haspopup="true"
                    sx={{
                      fontSize: 30,
                      paddingLeft: 3,
                      marginTop: 2,
                      color: isBanned === true ? "#537188" : "#202737",
                    }}
                  />
                </Link>
              </Tooltip>
              {/* DELETE */}
              <DeleteUser />
              {/* CANCEL */}
              <Tooltip title="Cancel">
                <Link to={`/users`} aria-haspopup="true" type="submit">
                  <CloseIcon
                    sx={{
                      fontSize: 30,
                      paddingLeft: 3,
                      marginTop: 2,
                      color: "#202737",
                      cursor: "pointer",
                    }}
                  >
                    {" "}
                    Cancel
                  </CloseIcon>
                </Link>
              </Tooltip>
            </div>
          </CardContent>
        </Card>
        <div>
          {/* EDIT MODE STARTS---------------------------------------- */}
          {isEditMode ? (
            <form onSubmit={handleUpdate} style={{ marginLeft: "4rem" }}>
              {/* IMAGE PRE PICTURE */}
              <Card sx={{ minWidth: 275 }}>
                <CardContent className="user">
                  <Stack>
                    {updateData.image && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Avatar
                          className="user_img"
                          src={URL.createObjectURL(updateData.image)}
                          alt="user"
                          sx={{
                            width: 100,
                            height: 100,
                          }}
                        />
                      </div>
                    )}
                    <br></br>
                    {/* USER NAME */}
                    <Typography
                      sx={{ fontSize: 18, paddingLeft: 2 }}
                      gutterBottom
                    >
                      <label htmlFor="userName">New User name:</label>
                      <input
                        className="login-input"
                        type="text"
                        id="userName"
                        name="userName"
                        value={updateData.userName || ""}
                        onChange={handleChange}
                      />
                    </Typography>
                    {/* FULL NAME */}
                    <Typography
                      sx={{ fontSize: 18, paddingLeft: 2 }}
                      gutterBottom
                    >
                      <label htmlFor="name">New Full name: </label>
                      <input
                        className="login-input"
                        type="text"
                        id="name"
                        name="name"
                        value={updateData.name || ""}
                        onChange={handleChange}
                      />
                    </Typography>
                    {/* EMAIL */}
                    <Typography
                      sx={{ fontSize: 18, paddingLeft: 2 }}
                      gutterBottom
                    >
                      <label htmlFor="email">New Email address:</label>
                      <input
                        className="login-input"
                        type="text"
                        id="email"
                        name="email"
                        value={updateData.email || ""}
                        onChange={handleChange}
                      />
                    </Typography>
                    {/* PHONE */}
                    <Typography
                      sx={{ fontSize: 18, paddingLeft: 2 }}
                      gutterBottom
                    >
                      <label htmlFor="phone">New Phone number:</label>
                      <input
                        className="login-input"
                        type="tel"
                        id="phone"
                        name="phone"
                        pattern="[+]{1}[0-9]{11,14}"
                        value={updateData.phone || ""}
                        onChange={handleChange}
                      />
                    </Typography>
                  </Stack>
                  {/* IMAGE CHOOSE FILE */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {" "}
                    <input
                      className="login-input"
                      type="file"
                      name="image"
                      id="image"
                      onChange={handleChange}
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                    <label
                      htmlFor="image"
                      className="file-input-label"
                      style={{
                        marginLeft: "1rem ",
                        marginTop: "1.1rem",
                        marginRight: "1rem",
                      }}
                    >
                      Choose File
                    </label>{" "}
                    {/* UPDATE BUTTON */}
                    <Tooltip title="Update">
                      <button
                        className="login-button"
                        type="submit"
                        style={{ marginRight: "1rem" }}
                      >
                        Update
                      </button>
                    </Tooltip>
                    {/* CANCEL BUTTON */}
                    <Tooltip title="Cancel">
                      <button
                        onClick={handleCancel}
                        className="login-button"
                        type="submit"
                        style={{ marginRight: "1rem", textDecoration: "none" }}
                      >
                        Cancel
                      </button>
                    </Tooltip>
                  </div>
                </CardContent>
              </Card>
            </form>
          ) : (
            ""
          )}
        </div>
      </div>
      {/* ALERT MESSAGES------------------------ */}
      {message && (
        <div className="email-alert">
          <Stack sx={{ width: "20%" }} spacing={2}>
            <Alert
              className="email-alert"
              variant="outlined"
              severity="success"
              sx={{ bgcolor: "#cbb279", marginTop: 6 }}
            >
              {message}
            </Alert>
          </Stack>
        </div>
      )}
    </div>
  );
};
export default SingleUser;

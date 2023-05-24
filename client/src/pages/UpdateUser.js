import React, { useEffect, useState } from "react";
import { profileRequest, updateUserRequest } from "../services/UserService";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  Alert,
  Avatar,
  Card,
  CardContent,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { updateUser } from "../features/userSlice";

const UpdateUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [message, setMessage] = useState(false);

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    userName: "",
    password: "",
    image: null,
    phone: "",
  });

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 10000); // Display the message for 10 seconds
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;

    if (files) {
      setFormData((prevState) => ({
        ...prevState,
        image: files[0],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedFields = {};
    for (const key in formData) {
      if (formData[key] !== "") {
        updatedFields[key] = formData[key];
      }
    }

    const form = new FormData();

    Object.entries(updatedFields).forEach(([key, value]) => {
      form.append(key, value);
    });

    // if (formData.image !== null) {
    //   form.append("image", formData.image);
    // }

    console.log("FORMDATA");
    console.log(formData);
    try {
      await updateUserRequest(id, form);
      dispatch(updateUser(updatedFields, formData));
      navigate(`/user-profile/${id}`);
    } catch (error) {
      setMessage(error.response.data.error.message);
    }
  };

  return (
    <div>
      {" "}
      <div>
        <form onSubmit={handleSubmit} className="single-user-card">
          <Card sx={{ minWidth: 275 }}>
            <CardContent className="user">
              <Stack>
                {formData.image && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      className="user_img"
                      src={URL.createObjectURL(formData.image || "")}
                      alt="user"
                      sx={{ width: 100, height: 100 }}
                    />
                  </div>
                )}
                <br></br>
                <Typography sx={{ fontSize: 18, paddingLeft: 2 }} gutterBottom>
                  <label htmlFor="name">New User name:</label>
                  <input
                    className="login-input"
                    type="text"
                    id="name"
                    name="userName"
                    value={formData.userName || ""}
                    onChange={handleInputChange}
                  />
                </Typography>
                <Typography sx={{ fontSize: 18, paddingLeft: 2 }} gutterBottom>
                  <label htmlFor="name">New Full name: </label>
                  <input
                    className="login-input"
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleInputChange}
                  />
                </Typography>
                <Typography sx={{ fontSize: 18, paddingLeft: 2 }} gutterBottom>
                  <label htmlFor="email">New Email address:</label>
                  <input
                    className="login-input"
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleInputChange}
                  />
                </Typography>
                <Typography sx={{ fontSize: 18, paddingLeft: 2 }} gutterBottom>
                  <label htmlFor="password">New Password:</label>
                  <input
                    className="login-input"
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password || ""}
                    onChange={handleInputChange}
                  />
                </Typography>
                <Typography sx={{ fontSize: 18, paddingLeft: 2 }} gutterBottom>
                  <label htmlFor="phone">New Phone number:</label>
                  <input
                    className="login-input"
                    type="tel"
                    id="phone"
                    name="phone"
                    pattern="[+]{1}[0-9]{11,14}"
                    value={formData.phone || ""}
                    onChange={handleInputChange}
                  />
                </Typography>
              </Stack>
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
                  onChange={handleInputChange}
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
                <Tooltip title="Update">
                  <button
                    className="login-button"
                    type="submit"
                    style={{ marginRight: "1rem" }}
                  >
                    Update
                  </button>
                </Tooltip>
                <Tooltip title="Cancel">
                  <Link
                    to={`/user-profile/${id}`}
                    className="login-button"
                    type="submit"
                    style={{ marginRight: "1rem", textDecoration: "none" }}
                  >
                    Cancel
                  </Link>
                </Tooltip>
              </div>
            </CardContent>
          </Card>
        </form>
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
      <div className="profile-cover-pic"></div>
    </div>
  );
};

export default UpdateUser;

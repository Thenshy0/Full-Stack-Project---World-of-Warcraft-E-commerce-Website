import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createUserRequest } from "../services/UserService";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { Avatar } from "@mui/material";
const CreateUser = () => {
  //  name, email, password, phone, image

  const [name, setName] = useState("");
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [message, setMessage] = useState(false);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 10000); // Display the message for 10 seconds
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleuserNameChange = (e) => {
    setuserName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = new FormData();
      newUser.append("name", name);
      newUser.append("userName", userName);
      newUser.append("email", email);
      newUser.append("password", password);
      newUser.append("phone", phone);
      newUser.append("image", image);

      const response = await createUserRequest(newUser);
      setIsRegistered(true);

      setMessage(response.message);
      setName("");
      setuserName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setImage("");
    } catch (error) {
      setMessage(error.response.data.error.message);
      console.log(error);
    }
  };
  return (
    <div>
      {isRegistered ? (
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
      ) : (
        <div>
          <div>
            <div className="login-card">
              <form onSubmit={handleSubmit} className="form card">
                <div className="card_header">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                      fill="currentColor"
                      d="M4 15h2v5h12V4H6v5H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6zm6-4V8l5 4-5 4v-3H2v-2h8z"
                    ></path>
                  </svg>
                  <h1 className="form_heading">Sign Up</h1>
                </div>
                <div className="field">
                  <label htmlFor="image">Profile picture</label>
                  {image && (
                    <div>
                      <Avatar
                        className="user_img"
                        src={URL.createObjectURL(image)}
                        alt="user"
                        sx={{ width: 100, height: 100 }}
                      />
                    </div>
                  )}
                  <input
                    className="login-input"
                    type="file"
                    name="image"
                    id="image"
                    onChange={handleImageChange}
                    accept="image/*"
                    required
                    style={{ display: "none" }}
                  />
                  <label htmlFor="image" className="file-input-label">
                    Choose File
                  </label>

                  <div className="field">
                    <label htmlFor="name">Full name</label>
                    <input
                      className="login-input"
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Full name"
                      value={name}
                      onChange={handleNameChange}
                      required
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="userName">User name</label>
                    <input
                      className="login-input"
                      type="text"
                      id="userName"
                      name="userName"
                      placeholder="User name"
                      value={userName}
                      onChange={handleuserNameChange}
                      required
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="email">Email</label>
                    <input
                      className="login-input"
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Email address"
                      value={email}
                      onChange={handleEmailChange}
                      required
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="password">Password</label>
                    <input
                      className="login-input"
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="phone">Phone number</label>
                    <input
                      className="login-input"
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Phone number"
                      pattern="[+]{1}[0-9]{11,14}"
                      value={phone}
                      onChange={handlePhoneChange}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  {" "}
                  <button className="login-button" type="submit">
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
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
      )}
    </div>
  );
};

export default CreateUser;

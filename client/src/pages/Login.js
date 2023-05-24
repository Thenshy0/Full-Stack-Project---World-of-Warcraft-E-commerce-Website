import React, { useEffect, useState } from "react";
import { loginUser } from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import { Alert, Stack } from "@mui/material";
import ForgotPassword from "../components/ForgotPassword";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 10000); // Display the message for 10 seconds
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await loginUser({ email, password });
      console.log(response.data.user.id);
      const user = response.data.user;

      dispatch(login(user));
      localStorage.setItem("user", JSON.stringify(user));
      setIsLoggedIn(true);
      navigate(`/`);
    } catch (error) {
      setMessage(error.response.data.error.message);
    }
  };

  return (
    <div>
      <div>
        <div className="login-card">
          <form onSubmit={handleLogin} className="form card">
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
              <h1 className="form_heading">Sign in</h1>
            </div>
            <div className="field">
              <label htmlFor="email">Email:</label>
              <input
                className="login-input"
                type="email"
                id="email"
                value={email}
                placeholder="Email address"
                required
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="password">Password:</label>
              <input
                className="login-input"
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                required
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="field">
              <button className="login-button" variant="outlined" type="sumbit">
                Login
              </button>
            </div>
          </form>
        </div>
        <div
          className="field"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ForgotPassword />
        </div>
      </div>
      {message && (
        <div className="email-alert">
          <Stack sx={{ width: "fit-content" }} spacing={2}>
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

export default Login;

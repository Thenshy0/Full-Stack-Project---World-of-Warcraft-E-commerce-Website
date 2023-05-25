import React, { useEffect, useState } from "react";
import { forgotPassword } from "../services/UserService";
import { Alert, Stack, Tooltip } from "@mui/material";

const ForgotPassword = () => {
  const [message, setMessage] = useState(false);
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordPassword, setForgotPasswordPassword] = useState("");
  const handleForgotPassword = () => {
    setShowForgotPasswordForm(true);
  };
  const handleCancel = () => {
    setShowForgotPasswordForm(false);
    setForgotPasswordEmail("");
    setForgotPasswordPassword("");
  };
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 10000); // Display the message for 10 seconds
      return () => clearTimeout(timer);
    }
  }, [message]);
  const handleForgotPasswordSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await forgotPassword(
        forgotPasswordEmail,
        forgotPasswordPassword
      );
  

      setMessage(response.message);
      setShowForgotPasswordForm(false);
      setForgotPasswordEmail("");
      setForgotPasswordPassword("");
    } catch (error) {
      setMessage(error.response.data.error.message);
    }
  };

  return (
    <div>
      <div>
        {showForgotPasswordForm ? (
          <div style={{ marginTop: "3rem" }}>
            <form
              onSubmit={handleForgotPasswordSubmit}
              className="form card"
              style={{ backgroundColor: "#537188", border: "none" }}
            >
              <div className="field">
                <label htmlFor="forgotPasswordEmail">Email:</label>
                <input
                  className="login-input"
                  type="email"
                  id="forgotPasswordEmail"
                  value={forgotPasswordEmail}
                  placeholder="Email address"
                  required
                  onChange={(event) =>
                    setForgotPasswordEmail(event.target.value)
                  }
                />
              </div>
              <div className="field">
                <label htmlFor="forgotPasswordPassword">New Password:</label>
                <input
                  className="login-input"
                  type="password"
                  id="forgotPasswordPassword"
                  placeholder="New Password"
                  value={forgotPasswordPassword}
                  required
                  onChange={(event) =>
                    setForgotPasswordPassword(event.target.value)
                  }
                />
              </div>
              <div className="field">
                <Tooltip title="Reset Password">
                  <button
                    className="login-button"
                    style={{
                      marginLeft: "1rem",
                      marginRight: "1rem",
                      textDecoration: "none",
                    }}
                    variant="outlined"
                    type="submit"
                  >
                    Reset Password
                  </button>
                </Tooltip>
                <Tooltip title="Cancel">
                  <button
                    onClick={handleCancel}
                    className="login-button"
                    type="submit"
                    style={{
                      marginLeft: "1rem",
                      marginRight: "1rem",
                      textDecoration: "none",
                    }}
                  >
                    Cancel
                  </button>
                </Tooltip>
              </div>
            </form>
          </div>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button
                className="login-button"
                variant="outlined"
                type="button"
                onClick={handleForgotPassword}
              >
                Forgot Password ?
              </button>
            </div>
          </>
        )}
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

export default ForgotPassword;

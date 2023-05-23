import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../services/UserService";
import { Alert, Stack } from "@mui/material";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState(false);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 10000); // Display the message for 10 seconds
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleResetPassword = async () => {
    try {
      await resetPassword({ token });
      navigate("/login-user");
    } catch (error) {
      setMessage(error.response.data.error.message);
    }
  };
  return (
    <div className="activationbutton">
      <button onClick={handleResetPassword} className="logoutButton">
        Reset Password
      </button>
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

export default ResetPassword;

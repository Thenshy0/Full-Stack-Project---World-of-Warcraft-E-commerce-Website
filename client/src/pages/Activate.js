import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { activateUser } from "../services/UserService";
import { Alert, Button, Stack } from "@mui/material";

const Activate = () => {
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

  const handleActivate = async () => {
    try {
      await activateUser({ token });
      navigate("/login-user");
    } catch (error) {
      setMessage(error.response.data.error.message);
    }
  };
  return (
    <div className="activationbutton">
      <button onClick={handleActivate} className="logoutButton">
        Activate
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

export default Activate;

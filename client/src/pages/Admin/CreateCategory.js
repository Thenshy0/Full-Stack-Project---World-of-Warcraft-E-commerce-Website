import React, { useEffect, useState } from "react";
import { createCategory } from "../../services/CategoryService";
import {
  Alert,
  Avatar,
  Card,
  CardContent,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };
  const handleCancel = () => {
    navigate(`/products-admin`);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      const response = await createCategory(formData);
      setName("");
      setImage(null);
      setMessage(response.message);
    } catch (error) {
      setMessage(error.response);
    }
  };

  return (
    <div>
      <div className="single-user-card">
        <form onSubmit={handleSubmit}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent className="user">
              <Stack>
                {image && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      className="user_img"
                      src={URL.createObjectURL(image)}
                      alt="user"
                      sx={{
                        width: 100,
                        height: 100,
                      }}
                    />
                  </div>
                )}
                <br />
                <Typography sx={{ fontSize: 18, paddingLeft: 2 }} gutterBottom>
                  <label htmlFor="name">Name:</label>
                  <input
                    className="login-input"
                    type="text"
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                  />
                </Typography>
              </Stack>
              <div>
                <input
                  className="login-input"
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleImageChange}
                  accept="image/*"
                  style={{ display: "none" }}
                />
                <label
                  htmlFor="image"
                  className="file-input-label"
                  style={{
                    marginLeft: "1rem",
                    marginTop: "1.1rem",
                    marginRight: "1rem",
                  }}
                >
                  Choose File
                </label>
                {/* Create BUTTON */}
                <Tooltip title="Update">
                  <button
                    className="login-button"
                    type="button"
                    style={{ marginRight: "1rem" }}
                    onClick={handleSubmit}
                  >
                    Create
                  </button>
                </Tooltip>
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

export default CreateCategory;

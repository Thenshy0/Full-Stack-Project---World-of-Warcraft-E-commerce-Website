import {
  Alert,
  Avatar,
  Card,
  CardContent,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { createProduct } from "../../services/ProductService";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
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
      formData.append("price", price);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("image", image);

      const response = await createProduct(formData);

      setName("");
      setPrice("");
      setDescription("");
      setCategory("");
      setImage(null);

      setMessage(response.message);
    } catch (error) {
      setMessage(error);
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
                <Typography sx={{ fontSize: 18, paddingLeft: 2 }} gutterBottom>
                  <label htmlFor="price">Price:</label>
                  <input
                    className="login-input"
                    type="number"
                    id="price"
                    value={price}
                    onChange={handlePriceChange}
                  />
                </Typography>
                <Typography sx={{ fontSize: 18, paddingLeft: 2 }} gutterBottom>
                  <label htmlFor="category">Category:</label>
                  <input
                    className="login-input"
                    type="text"
                    id="category"
                    value={category}
                    onChange={handleCategoryChange}
                  />
                </Typography>
                <Typography sx={{ fontSize: 18, paddingLeft: 2 }} gutterBottom>
                  <label htmlFor="description">Description:</label>
                  <textarea
                    className="login-input"
                    type="text"
                    id="description"
                    rows={10}
                    cols={50}
                    value={description}
                    onChange={handleDescriptionChange}
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

export default CreateProduct;

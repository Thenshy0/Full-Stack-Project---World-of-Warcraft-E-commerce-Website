import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import {
  SingleProductRequest,
  updateSingleProduct,
} from "../../services/ProductService";
import { updateProducts } from "../../features/productSlice";
import DeleteProduct from "./DeleteProduct";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState(false);
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  const [updateData, setUpdateData] = useState({
    name: "",
    image: null,
    price: "",
    description: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const userData = await SingleProductRequest(id);
        setProduct(userData);
      } catch (error) {
        console.log("Error fetching product data:", error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 10000); // Display the message for 10 seconds
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!product) {
    return (
      <Alert
        className="email-alert"
        variant="outlined"
        severity="success"
        sx={{ bgcolor: "#cbb279", marginTop: 6 }}
      >
        Products loading...
      </Alert>
    );
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

  const { image, createdAt, updatedAt, name, price, description } = product;
  console.log("product");
  console.log(product);

  const imageUrl = "http://127.0.0.1:8080/public/images/users/" + image;

  console.log("imageurl", imageUrl);

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

    try {
      const response = await updateSingleProduct(id, form);
      dispatch(updateProducts({ ...updatedFields, image: response.image }));
      setIsEditMode(false);
      const updatedUserData = await SingleProductRequest(id);
      setProduct(updatedUserData);
      setUpdateData({});
      setMessage(response.message);
    } catch (error) {
      setMessage(error.response);
    }
  };

  return (
    <div>
      <div className="single-product-card">
        <Card sx={{ maxWidth: 450 }}>
          <CardContent className="user">
            <Stack>
              {/* Product DETAILS */}
              <Avatar
                src={imageUrl}
                sx={{ width: 400, height: 400, margin: "0.5rem" }}
                className="user_img"
                variant="rounded"
                alt={name}
              ></Avatar>
              <br /> <Divider />
              <br />
              <Typography
                sx={{ fontSize: 18, paddingLeft: 2, paddingRight: 3 }}
                gutterBottom
              >
                Category ID: {id}
              </Typography>
              <Typography sx={{ fontSize: 18, paddingLeft: 2 }} gutterBottom>
                Name: {name}
              </Typography>
              <Typography sx={{ fontSize: 18, paddingLeft: 2 }} gutterBottom>
                Price: €{price}
              </Typography>
              <Typography sx={{ fontSize: 18, paddingLeft: 2 }} gutterBottom>
                Category: {product.category?.name}
              </Typography>
              <Typography sx={{ fontSize: 18, paddingLeft: 2 }} gutterBottom>
                Description: {description}
              </Typography>
              <br />
              <Divider />
              <br />
              <Typography sx={{ fontSize: 17, paddingLeft: 2 }} gutterBottom>
                Created On: {createdAt}
              </Typography>
              <Typography sx={{ fontSize: 17, paddingLeft: 2 }} gutterBottom>
                Updated on: {updatedAt}
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
              <DeleteProduct />
              {/* CANCEL */}
              <Tooltip title="Cancel">
                <Link to={`/products-admin`} aria-haspopup="true" type="submit">
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
                      <label htmlFor="name">New products name:</label>
                      <input
                        className="login-input"
                        type="text"
                        id="name"
                        name="name"
                        value={updateData.name || ""}
                        onChange={handleChange}
                      />
                    </Typography>
                    {/* Price*/}
                    <Typography
                      sx={{ fontSize: 18, paddingLeft: 2 }}
                      gutterBottom
                    >
                      <label htmlFor="name">New Price:</label>
                      <input
                        className="login-input"
                        type="number"
                        id="price"
                        name="price"
                        value={updateData.price || ""}
                        onChange={handleChange}
                      />
                    </Typography>
                    {/* DESCRIPTION */}
                    <Typography
                      sx={{ fontSize: 18, paddingLeft: 2 }}
                      gutterBottom
                    >
                      <label htmlFor="name">New description:</label>
                      <textarea
                        className="login-input"
                        type="text"
                        id="description"
                        name="description"
                        rows={10}
                        cols={50}
                        value={updateData.description || ""}
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
export default SingleProduct;

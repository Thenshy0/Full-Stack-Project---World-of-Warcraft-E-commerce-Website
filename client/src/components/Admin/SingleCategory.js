import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SettingsIcon from "@mui/icons-material/Settings";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";
import { Alert, Divider, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import {
  SingleCategoryRequest,
  updateSingleCategory,
} from "../../services/CategoryService";
import { updateCategories } from "../../features/categorySlice";
import DeleteProduct from "./DeleteProduct";

const SingleCategory = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [message, setMessage] = useState(false);
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  const [updateData, setUpdateData] = useState({
    name: "",
    image: null,
  });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const userData = await SingleCategoryRequest(id);
        setCategory(userData);
      } catch (error) {
        console.log("Error fetching category data:", error);
      }
    };

    fetchCategory();
  }, [id]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 10000); // Display the message for 10 seconds
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!category) {
    return (
      <Alert
        className="email-alert"
        variant="outlined"
        severity="success"
        sx={{ bgcolor: "#cbb279", marginTop: 6 }}
      >
        Categories loading...
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

  const { image, createdAt, updatedAt, name } = category;
  console.log("object");
  console.log(category);

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
    // if (updateData.image !== null) {
    //   form.append("image", updateData.image);
    // }
    try {
      const response = await updateSingleCategory(id, form);
      dispatch(updateCategories({ ...updatedFields, image: response.image }));
      setIsEditMode(false);
      const updatedUserData = await SingleCategoryRequest(id);
      setCategory(updatedUserData);
      setUpdateData({});
      setMessage(response.message);
    } catch (error) {
      setMessage(error.response);
    }
  };

  return (
    <div>
      {" "}
      <div className="single-user-card">
        <Card sx={{ minWidth: 275 }}>
          <CardContent className="user">
            <Stack>
              {/* Category DETAILS */}
              <Avatar
                src={imageUrl}
                sx={{ width: 70, height: 70, marginLeft: "1rem" }}
                className="user_img"
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
                      <label htmlFor="name">Category name:</label>
                      <input
                        className="login-input"
                        type="text"
                        id="name"
                        name="name"
                        value={updateData.name || ""}
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
export default SingleCategory;

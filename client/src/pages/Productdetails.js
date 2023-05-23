import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";
import { Alert, Divider, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { SingleProductRequest } from "../services/ProductService";

const Productdetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState(false);

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

  const { image, name, price, description } = product;
  console.log("product");
  console.log(product);

  const imageUrl = "http://127.0.0.1:8080/public/images/users/" + image;

  console.log("imageurl", imageUrl);

  return (
    <div>
      <div className="single-product-card">
        <Card sx={{ maxWidth: 450 }}>
          <CardContent className="product-details">
            <Stack>
              {/* Product DETAILS */}
              <Avatar
                src={imageUrl}
                sx={{
                  width: 400,
                  height: 400,
                  margin: "0.5rem",
                  border: "solid 2px rgba(224, 163, 84, 0.64)",
                }}
                className="user_img"
                variant="rounded"
                alt={name}
              ></Avatar>
              <br /> <Divider />
              <br />
              <Typography
                sx={{ fontSize: 18, paddingLeft: 2, fontWeight: "bold" }}
                gutterBottom
              >
                {name}
              </Typography>
              <Typography sx={{ fontSize: 16, paddingLeft: 2 }} gutterBottom>
                Category: {product.category?.name}
              </Typography>
              <Typography sx={{ fontSize: 16, paddingLeft: 2 }} gutterBottom>
                {description}
              </Typography>
              <Typography sx={{ fontSize: 18, paddingLeft: 2 }} gutterBottom>
                €{price}
              </Typography>
            </Stack>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* CANCEL */}
              <Tooltip title="Cancel">
                <Link to={`/products`} aria-haspopup="true" type="submit">
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
export default Productdetails;

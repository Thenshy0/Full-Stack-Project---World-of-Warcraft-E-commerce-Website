import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SettingsIcon from "@mui/icons-material/Settings";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";
import { Divider, Tooltip } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const Product = (props) => {
  const { name, description, price, image, _id } = props.product;

  const productImageUrl = "http://127.0.0.1:8080/public/images/users/" + image;

  const categoryName = props.product?.category?.name;
  const categoryImageUrl =
    "http://127.0.0.1:8080/public/images/users/" +
    props.product?.category?.image;

  return (
    <div>
      <Card sx={{ maxWidth: 350 }}>
        <CardContent className="product">
          <Stack>
            <div className="product-card-inside">
              <Avatar
                src={productImageUrl}
                sx={{
                  width: 250,
                  height: 250,
                  border: "solid #886e3fd9",
                }}
                variant="rounded"
                alt={productImageUrl}
              ></Avatar>
              <div className="category-logo">
                <Avatar
                  src={categoryImageUrl}
                  sx={{ width: 40, height: 40, top: 8, right: 15 }}
                  className="user_img"
                  alt={name}
                ></Avatar>
              </div>
            </div>
          </Stack>
          <br />
          <Divider />
          <br />
          <Typography
            className="name"
            sx={{ fontSize: 18, paddingLeft: 2 }}
            gutterBottom
          >
            {name}
          </Typography>

          <Typography
            className="description"
            sx={{ fontSize: 16, paddingLeft: 2 }}
            gutterBottom
          >
            {description}
          </Typography>
          <Typography
            className="price"
            sx={{ fontSize: 18, paddingLeft: 2 }}
            gutterBottom
          >
            €{price}
          </Typography>
          <Tooltip title="Settings">
            <Link to={`/view-product/${_id}`} state={props.product}>
              <RemoveRedEyeIcon
                color="primary"
                aria-haspopup="true"
                sx={{ fontSize: 30, paddingLeft: 35, color: "#202737" }}
              />
            </Link>
          </Tooltip>
        </CardContent>
      </Card>
    </div>
  );
};
export default Product;

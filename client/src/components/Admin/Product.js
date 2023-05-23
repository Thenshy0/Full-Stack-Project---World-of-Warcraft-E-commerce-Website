import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SettingsIcon from "@mui/icons-material/Settings";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";
import { Divider, Tooltip } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import DeleteProduct from "./DeleteProduct";

const Product = (props) => {
  const { name, description, price, image, createdAt, updatedAt, _id } =
    props.product;

  const productImageUrl = "http://127.0.0.1:8080/public/images/users/" + image;
  console.log(props.product);
  const categoryName = props.product?.category?.name;
  const categoryImageUrl =
    "http://127.0.0.1:8080/public/images/users/" +
    props.product?.category?.image;
  return (
    <div>
      <Stack>
        <div className="product-card-inside">
          <Avatar
            src={productImageUrl}
            sx={{
              width: 250,
              height: 250,
              border: "solid #886e3fd9",
              marginTop: 1,
            }}
            variant="rounded"
            alt={productImageUrl}
          ></Avatar>
          <div className="category-logo" style={{ right: 1, top: -2 }}>
            <Avatar
              src={categoryImageUrl}
              sx={{ width: 40, height: 40 }}
              className="user_img"
              alt={name}
            ></Avatar>
          </div>
        </div>
      </Stack>
      <br />
      <Divider />
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        <Typography sx={{ fontSize: 18, paddingLeft: 2 }} gutterBottom>
          {name}
        </Typography>
      </div>

      {/* <Typography sx={{ fontSize: 18, paddingLeft: 2 }} gutterBottom>
            {description}
          </Typography>
          <Typography sx={{ fontSize: 18, paddingLeft: 2 }} gutterBottom>
            €{price}
          </Typography> */}
      <Tooltip title="Settings">
        <Link
          to={`/view-product-admin/${props.product._id}`}
          state={props.product}
        >
          <SettingsIcon
            color="primary"
            aria-haspopup="true"
            sx={{ fontSize: 30, paddingLeft: 2, color: "#202737" }}
          />
        </Link>
      </Tooltip>
    </div>
  );
};
export default Product;

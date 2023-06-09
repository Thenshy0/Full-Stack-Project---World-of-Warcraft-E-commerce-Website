import React from "react";
import { Avatar, Tooltip } from "@mui/material";

const Categories = (props) => {
  const { category, selectedCategory, onCategoryClick } = props;
  const { _id, name, image } = category;

  const categoryImageUrl =
    `${process.env.REACT_APP_BASEURL}/public/images/users/` + image;
  const handleCategoryClick = () => {
    onCategoryClick(_id);
  };

  return (
    <div
      style={{ marginBottom: "10rem" }}
      className={`user-card ${selectedCategory === _id ? "selected" : ""}`}
      onClick={handleCategoryClick}
    >
      <Tooltip title={name}>
        <Avatar
          src={categoryImageUrl}
          sx={{
            width: 70,
            height: 70,
            boxShadow:
              selectedCategory === _id
                ? "0px 0px 20px 0px #cbb279"
                : "0px 0px 20px 0px black",
          }}
          className="class-logo"
          alt={name}
        ></Avatar>
      </Tooltip>
    </div>
  );
};
export default Categories;

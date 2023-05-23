import { Tooltip } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteCategory } from "../../services/CategoryService";
import { deleteCategoryReducer } from "../../features/categorySlice";

const DeleteCategory = ({ categoryId, onDeleteCategory }) => {
  const [message, setMessage] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await deleteCategory(categoryId);
        dispatch(deleteCategoryReducer(categoryId));
        onDeleteCategory(categoryId);
      } catch (error) {
        setMessage(error.message);
      }
    }
  };

  return (
    <Tooltip title="Delete">
      <Link to="" onClick={handleDelete}>
        <DeleteIcon
          color="primary"
          aria-haspopup="true"
          sx={{
            fontSize: 30,
            paddingLeft: 3,
            marginTop: 2,
            color: "#202737",
          }}
        />
      </Link>
    </Tooltip>
  );
};

export default DeleteCategory;

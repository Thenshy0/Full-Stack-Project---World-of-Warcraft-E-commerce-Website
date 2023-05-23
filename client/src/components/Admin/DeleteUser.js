import { Tooltip } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteUserbyAdmin } from "../../services/UserService";
import { deleteUser } from "../../features/userSlice";
import { useDispatch } from "react-redux";

const DeleteUser = () => {
  const { id } = useParams();
  const [message, setMessage] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await deleteUserbyAdmin(id);
        dispatch(deleteUser(id));
        navigate("/users");
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

export default DeleteUser;

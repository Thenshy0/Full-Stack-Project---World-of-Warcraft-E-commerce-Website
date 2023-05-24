import React from "react";
import {
  Avatar,
  Stack,
  Typography,
  Card,
  CardContent,
  Divider,
  Tooltip,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const Admin = (props) => {
  const { name, image, userName } = props.admin;
  const imageUrl = "http://127.0.0.1:8080/public/images/users/" + image;
  return (
    <div className="user-card">
      <Card sx={{ minWidth: 250 }}>
        <CardContent className="user">
          <Stack>
            <div className="userhead">
              <Avatar
                src={imageUrl}
                sx={{ width: 70, height: 70 }}
                className="user_img"
                alt={name}
              ></Avatar>
              <Typography sx={{ fontSize: 18, paddingLeft: 2 }} gutterBottom>
                {userName}
              </Typography>
            </div>
          </Stack>
          <Divider />
          <Tooltip title="Settings">
            <Link to={`/view-user/${props.admin._id}`} state={props.admin}>
              <SettingsIcon
                color="primary"
                aria-haspopup="true"
                sx={{ fontSize: 30, paddingLeft: 10, color: "#202737" }}
              />
            </Link>
          </Tooltip>
          <Tooltip title="Admin">
            <Link to="">
              <AdminPanelSettingsIcon
                color="primary"
                aria-haspopup="true"
                sx={{
                  fontSize: 30,
                  paddingLeft: 3,
                  marginTop: 2,
                  color: "#537188",
                }}
              />
            </Link>
          </Tooltip>
        </CardContent>
      </Card>
    </div>
  );
};

export default Admin;

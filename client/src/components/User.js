import React from "react";
import { Avatar, Stack, Typography, Card, CardContent } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import { Divider, Tooltip } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const User = (props) => {
  const { name, image, userName } = props.user;
  const imageUrl = "http://127.0.0.1:8080/public/images/users/" + image;
  console.log(imageUrl);
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
            <Link to={`/view-user/${props.user._id}`} state={props.user}>
              <SettingsIcon
                color="primary"
                aria-haspopup="true"
                sx={{ fontSize: 30, paddingLeft: 10, color: "#202737" }}
              />
            </Link>
          </Tooltip>
          <Tooltip title="User">
            <Link to="">
              <PersonIcon
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
        </CardContent>
      </Card>
    </div>
  );
};

export default User;

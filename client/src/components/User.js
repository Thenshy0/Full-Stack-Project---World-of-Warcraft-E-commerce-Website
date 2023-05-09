import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const User = (props) => {
  const { name, email, phone, image } = props.user;
  const imageUrl = "http://127.0.0.1:8080/public/images/users/" + image;

  return (
    <div className="user-card">
      <Card sx={{ minWidth: 275 }}>
        <CardContent className="user">
          <Stack>
            <Avatar
              src={imageUrl}
              sx={{ width: 70, height: 70 }}
              className="user_img"
              alt={name}
            ></Avatar>
          </Stack>
          <Typography sx={{ fontSize: 18 }} gutterBottom>
            {name}
          </Typography>
          <Typography>Email: {email}</Typography>
          <Typography>Phone number: {phone}</Typography>
          <Typography>Password: ******</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default User;

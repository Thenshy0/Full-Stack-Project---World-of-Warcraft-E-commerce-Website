import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import { profileRequest } from "../services/UserService";
import { useSelector } from "react-redux";
import {
  Avatar,
  Card,
  CardContent,
  Divider,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

const Profile = () => {
  const user = useSelector((state) => state.userR.user);
  const { id } = useParams();
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    try {
      const result = await profileRequest(id);
      setProfile(result.data.user);
      setLoading(false);
    } catch {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // const handleRefresh = async () => {
  //   try {
  //     const refreshToken = getRefreshToken();

  //     if (!refreshToken) {
  //       throw new Error("Refresh token not found");
  //     }
  //     if (refreshToken) {
  //       const response = await refreshTokenRequest(refreshToken);
  //       const { accessToken } = response.data;
  //     } else {
  //       throw new Error("Refresh token not found");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // setInterval(handleRefresh, 1000 * 60);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     handleRefresh();
  //   }, 1000 * 20);
  //   return () => clearInterval(interval);
  // }, [handleRefresh]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  if (!user) {
    return <div>Loading...</div>;
  }
  const imageUrl = "http://127.0.0.1:8080/public/images/users/" + profile.image;
  return (
    <div>
      {profile ? (
        <div className="single-user-card">
          <Card sx={{ minWidth: 275 }}>
            {" "}
            {profile.is_admin === 1 ? (
              <div className="card-bar">Admin Profile</div>
            ) : (
              <div className="card-bar">User Profile</div>
            )}
            <CardContent className="user">
              <Stack>
                <Avatar
                  src={imageUrl}
                  className="user_img"
                  alt={profile.name}
                  sx={{ width: 100, height: 100, marginLeft: 13 }}
                ></Avatar>
                <br></br>
                <Divider />
                <br></br>
                <Typography sx={{ fontSize: 18, paddingLeft: 2 }} gutterBottom>
                  User name: {profile.userName}
                </Typography>
                <Typography sx={{ fontSize: 18, paddingLeft: 2 }} gutterBottom>
                  Full name: {profile.name}
                </Typography>
                <Typography sx={{ fontSize: 18, paddingLeft: 2 }} gutterBottom>
                  Email: {profile.email}
                </Typography>
                <Typography sx={{ fontSize: 18, paddingLeft: 2 }} gutterBottom>
                  Phone: {profile.phone}
                </Typography>
              </Stack>
              <br></br>
              <Tooltip title="Settings">
                <Link to={`/update-user/${user.id}`}>
                  <SettingsIcon
                    aria-haspopup="true"
                    sx={{ fontSize: 30, paddingLeft: 1, color: "#202737" }}
                  />
                </Link>
              </Tooltip>
            </CardContent>
          </Card>
        </div>
      ) : (
        <p>Profile not found</p>
      )}
    </div>
  );
};

export default Profile;

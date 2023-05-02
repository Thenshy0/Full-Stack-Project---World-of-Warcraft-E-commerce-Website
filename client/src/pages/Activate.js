import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { activateUser } from "../services/UserService";
import { toast } from "react-toastify";

const Activate = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const handleActivate = async () => {
    try {
      const response = await activateUser({ token });
      navigate("/login-user");
      toast.success(response.message);
    } catch (error) {
      toast.error(error.response.data.error.message);
    }
  };
  return (
    <div>
      <button onClick={handleActivate}>Activate</button>
    </div>
  );
};

export default Activate;

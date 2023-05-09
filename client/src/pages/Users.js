import React, { useEffect, useState } from "react";
import { getAllUsersRequest } from "../services/UserService";
import User from "../components/User";

const Users = () => {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    const response = await getAllUsersRequest();
    setUsers(response.data.users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div>
      <h1>Users</h1>
      <div className="user-cards">
        {users.length > 0 &&
          users.map((user) => <User key={user._id} user={user} />)}
      </div>
    </div>
  );
};

export default Users;

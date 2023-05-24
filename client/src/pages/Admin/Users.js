import React, { useEffect, useState } from "react";
import { getAllUsersRequest } from "../../services/UserService";
import User from "../../components/User";
import Admin from "../../components/Admin/Admin";

import { Pagination, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  const fetchUsers = async () => {
    const response = await getAllUsersRequest(searchInput, page, limit);
    setUsers(response.data.users);
    setAdmins(response.data.admins);
    setTotalPages(Math.ceil(response.data.totalusers / limit));
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
    setPage(1);
  };

  useEffect(() => {
    fetchUsers();
  }, [searchInput, page, limit]);

  return (
    <div className="userpage">
      {" "}
      {/* SEARCH */}
      <div className="searchBar">
        <input
          className="searchBarInput"
          type="text"
          value={searchInput}
          onChange={handleSearch}
          placeholder="Search users"
        />
      </div>
      {/* ADMINS */}
      <div className="user-cards">
        {admins.length > 0 &&
          admins.map((admin) => <Admin key={admin._id} admin={admin} />)}
      </div>
      {/* USERS */}
      <div className="user-cards">
        {users.length > 0 &&
          users.map((user) => <User key={user._id} user={user} />)}
      </div>
      {/* PAGINATION */}
      <div className="pagination">
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={page}
            slots={{
              previous: <ArrowBackIcon />,
              next: <ArrowForwardIcon />,
            }}
            color="standard"
            size="large"
            showFirstButton
            showLastButton
            onChange={handlePageChange}
            boundaryCount={1}
          />
        </Stack>
      </div>
    </div>
  );
};

export default Users;

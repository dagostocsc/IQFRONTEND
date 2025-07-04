import React from "react";
import UserCard from "./UserCard";
import { Link } from "react-router-dom";

const UsersList = ({ users = [], fetchAllUsers }) => {
  return (
    <div>
      <Link to="/users/new">
        <button>Add User</button>
      </Link>
      {users.map((user) => (
        <UserCard
          key={user.id} 
          user={user}
          fetchAllUsers={fetchAllUsers}
        />
      ))}
    </div>
  );
};

export default UsersList;

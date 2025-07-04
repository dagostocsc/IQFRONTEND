import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ user, fetchAllUsers }) => {
  return (
    <div className="user-card">
      <img
        src={user.imageURL || "https://via.placeholder.com/150"}
        alt={`image of ${user.firstName} ${user.lastName}`}
        width={150}
        height={150}
      />

      <div className="user-info">
        <h3>
          <Link to={`/users/${user.id}`}>
            {user.firstName} {user.lastName}
          </Link>
        </h3>

        <p>{user.email}</p>
        {user.phoneNumber && <p>Phone: {user.phoneNumber}</p>}
        {user.dateOfBirth && <p>DOB: {user.dateOfBirth}</p>}
        {user.bio && <p>Bio: {user.bio}</p>}
      </div>
    </div>
  );
};

export default UserCard;

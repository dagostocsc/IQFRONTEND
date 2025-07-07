import React from "react";
import "./UserProfile.css";

const UserProfile = () => {
  const user = {
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
    address: "123 Gaming Street, Esports City",
    dateOfBirth: "1998-05-12",
    phoneNumber: "+1234567890",
    imageURL:
      "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <img
          src={user.imageURL}
          alt={`${user.firstName} ${user.lastName}`}
          className="profile-img"
        />
        <h1>
          {user.firstName} {user.lastName}
        </h1>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Address:</strong> {user.address}</p>
        <p><strong>Date of Birth:</strong> {user.dateOfBirth}</p>
        <p><strong>Phone:</strong> {user.phoneNumber}</p>

        <div className="actions">
          <button>Edit Profile</button>
          <button>Manage Bookings</button>
          <button>Book a Tournament</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

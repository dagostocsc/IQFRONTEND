import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserProfile.css";
 
const UserProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must log in first.");
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load profile. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <img
          src={
            user.imageURL ||
            "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
          }
          alt={`${user.firstName} ${user.lastName}`}
          className="profile-img"
        />
        <h1>
          {user.firstName} {user.lastName}
        </h1>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Address:</strong> {user.address || "N/A"}</p>
        <p><strong>Date of Birth:</strong> {user.dateOfBirth || "N/A"}</p>
        <p><strong>Phone:</strong> {user.phoneNumber || "N/A"}</p>

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

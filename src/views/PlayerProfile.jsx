import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserProfile.css"; 

const PlayerProfile = () => {
  const [player, setPlayer] = useState(null);
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
        const res = await axios.get("http://localhost:8080/api/player/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPlayer(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load profile. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  if (!player) {
    return <p>Loading player profile...</p>;
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <img
          src={
            player.profilePic ||
            "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
          }
          alt={`${player.firstName} ${player.lastName}`}
          className="profile-img"
        />
        <h1>
          {player.gamerTag}
        </h1>
        <p><strong>Email:</strong> {player.email}</p>
        <p><strong>Country:</strong> {player.country}</p>
        <p><strong>Bio:</strong> {player.bio || "No bio yet."}</p>

        <div className="actions">
          <button>Edit Profile</button>
          <button>Manage Services</button>
          <button>View Bookings</button>
          <button>Manage Bookings</button>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;

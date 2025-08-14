import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
// import SocialLinks from "./SocialLinks";
import "react-toastify/dist/ReactToastify.css";
import "./UserProfile.css";

const API_ORIGIN = import.meta.env?.VITE_API_ORIGIN || "http://localhost:8080";

const PlayerProfile = () => {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = (localStorage.getItem("role") || "").toLowerCase();

    if (!token) {
      toast.warn("Please log in first.", { className: "neon-toast neon-warn", icon: "⚠" });
      navigate("/login");
      return;
    }

    if (role !== "player" && role !== "admin") {
      toast.error("Not authorized to view player profile.", {
        className: "neon-toast neon-error",
        icon: "⛔",
      });
      navigate("/profile");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_ORIGIN}/api/player/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlayer(res.data);
      } catch (err) {
        console.error(err);
        const status = err?.response?.status;
        const msg =
          err?.response?.data?.error ||
          (status === 404
            ? "Player profile not found."
            : status === 401
            ? "Please log in again."
            : "Failed to load profile.");
        toast.error(msg, { className: "neon-toast neon-error", icon: "❌" });

        if (status === 401 || status === 403) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) return <p>Loading player profile...</p>;
  if (!player) return null;

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
        <h1>{player.gamerTag}</h1>
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

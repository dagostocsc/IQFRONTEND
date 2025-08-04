import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserProfile.css";
import VideoBG from "../components/VideoBG";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [presence, setPresence] = useState("online");
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
          headers: { Authorization: `Bearer ${token}` },
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

  if (!user) return <p>Loading profile...</p>;

  return (
    <>
      <VideoBG src="/heavysmoke.mp4" />

      <div className="profile-page">
        <div className="profile-card">
          <div className="avatar-wrapper">
            <img
              src={
                user.imageURL ||
                "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
              }
              alt={`${user.firstName} ${user.lastName}`}
              className="profile-img"
            />
            <span className={`status-dot ${presence}`} />
          </div>

          <h1>{user.firstName} {user.lastName}</h1>
          <p><strong>Username:</strong> {user.username}</p>

          <div className="presence-select">
            <label>Status:</label>
            <select value={presence} onChange={(e) => setPresence(e.target.value)}>
              <option value="online">✅ Online</option>
              <option value="busy">🕑 Busy</option>
              <option value="offline">💤 Offline</option>
            </select>
          </div>

          <div className="about-section">
            <h3>About Me</h3>
            <p>{user.bio || "No bio provided."}</p>
            <div className="tags">
              {user.tags && user.tags.length > 0 ? (
                user.tags.map((tag, i) => <span key={i} className="tag">{tag}</span>)
              ) : (
                <p>No tags provided.</p>
              )}
            </div>
          </div>

          <div className="profile-actions">
            <button onClick={() => navigate("/edit-profile")}>Edit Profile</button>
            <button>Switch Accounts</button>
            <button onClick={() => navigator.clipboard.writeText(user.id)}>Copy ID</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;

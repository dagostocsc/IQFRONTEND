import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserProfile.css";
import VideoBG from "../components/VideoBG";
import StatusSelect from "../components/StatusSelect";
import SocialLinks from "../components/SocialLinks";

const FALLBACK_AVATAR = "https://i.pravatar.cc/200?u=fallback";
const API_ORIGIN = import.meta.env.VITE_API_ORIGIN || "http://localhost:8080";

const toAbsolute = (raw) => {
  if (!raw) return null;
  if (/^https?:\/\//i.test(raw)) return raw;
  return `${API_ORIGIN}/${String(raw).replace(/^\/+/, "")}`;
};

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
        const res = await axios.get(`${API_ORIGIN}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        if (res.data?.presence) setPresence(res.data.presence);
      } catch {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };
    fetchProfile();
  }, [navigate]);

  const avatarSrc = useMemo(() => {
    const raw = user?.imageURL || user?.imageUrl || user?.avatar;
    const abs = toAbsolute(raw);
    return abs || FALLBACK_AVATAR;
  }, [user]);

  const displayUsername = useMemo(() => {
    let name = user?.handle || user?.userName || user?.username || "";
    if (name.includes("@")) name = name.split("@")[0];
    return name || "User";
  }, [user]);

  if (!user) return <p>Loading profile...</p>;

  // Prefer per-user social links; otherwise use small static defaults
  const logos = Array.isArray(user?.socialLinks) && user.socialLinks.length
    ? user.socialLinks
    : [
        { href: "https://instagram.com/", img: "/ig.png", alt: "Instagram" },
        { href: "https://twitch.tv/", img: "/twitch.png", alt: "Twitch" },
        { href: "https://youtube.com/", img: "/youtube.png", alt: "YouTube" },
        { href: "https://tiktok.com/", img: "/tiktok.png", alt: "TikTok" },
      ];

  return (
    <>
      <VideoBG src="/heavysmoke.mp4" />
      <div className="profile-page">
        <div className="profile-card">
          <div className="avatar-wrapper">
            <img
              src={avatarSrc}
              alt={displayUsername}
              className="profile-img"
              onError={(e) => { e.currentTarget.src = FALLBACK_AVATAR; }}
            />
            <span className={`status-dot ${presence}`} />
          </div>

          <h1>{displayUsername}</h1>

          <div className="form-row">
            <label>Status:</label>
            <StatusSelect value={presence} onChange={setPresence} />
          </div>

          <div className="about-section">
            <h3>About Me</h3>
            <p>{user.bio || "No bio provided."}</p>
            <div className="tags">
              {(user.tags && user.tags.length > 0) ? (
                user.tags.map((tag, i) => <span key={i} className="tag">{tag}</span>)
              ) : (
                <p>No tags provided.</p>
              )}
            </div>
          </div>

          {/* Social links below bio/tags, above buttons */}
          <SocialLinks links={logos} />

          <div className="profile-actions">
            <button className="primary" onClick={() => navigate("/editprofile")}>Edit Profile</button>
            <button className="ghost">Manage Bookings</button>
            <button className="ghost" onClick={() => navigator.clipboard.writeText(user.id)}>Message</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;

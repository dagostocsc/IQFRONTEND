import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import VideoBG from "../components/VideoBG";
import SocialLinks from "../components/SocialLinks";
import "./UserProfile.css"; // reuse styles

const FALLBACK_AVATAR = "https://i.pravatar.cc/200?u=admin";
const API_ORIGIN = import.meta.env.VITE_API_ORIGIN || "http://localhost:8080";

const toAbsolute = (raw) => {
  if (!raw) return null;
  if (/^https?:\/\//i.test(raw)) return raw;
  return `${API_ORIGIN}/${String(raw).replace(/^\/+/, "")}`;
};

export default function AdminProfile() {
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");
    (async () => {
      try {
        const { data } = await axios.get(`${API_ORIGIN}/api/admin/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdmin(data);
      } catch {
        localStorage.removeItem("token");
        navigate("/login");
      }
    })();
  }, [navigate]);

  const avatarSrc = useMemo(() => {
    const raw = admin?.imageURL || admin?.imageUrl || admin?.avatar;
    return toAbsolute(raw) || FALLBACK_AVATAR;
  }, [admin]);

  const displayName = useMemo(() => {
    let n = admin?.username || admin?.userName || admin?.handle || "";
    if (n.includes("@")) n = n.split("@")[0];
    return n || "Admin";
  }, [admin]);

  if (!admin) return <p>Loading admin profile...</p>;

  // Admin-only links (separate field from user.socialLinks)
  const adminLinks = Array.isArray(admin.adminSocialLinks)
    ? admin.adminSocialLinks
    : [
        { href: "https://www.instagram.com/buvl/", img: "/ig.png", alt: "Instagram" },
        { href: "https://x.com/iqbuvl",           img: "/twitch.png", alt: "Twitter" },
        { href: "https://www.youtube.com/@iQBuvl", img: "/youtube.png", alt: "YouTube" },
        { href: "https://www.tiktok.com/@iqbuvl", img: "/tiktok.png", alt: "TikTok" },
      ];

  return (
    <>
      <VideoBG src="/heavysmoke.mp4" />
      <div className="profile-page">
        <div className="profile-card">
          <div className="avatar-wrapper">
            <img
              className="profile-img"
              src={avatarSrc}
              onError={(e) => { e.currentTarget.src = FALLBACK_AVATAR; }}
              alt={displayName}
            />
          </div>

          <h1>{displayName}</h1>

          <div className="about-section">
            <h3>About</h3>
            <p>{admin.bio || "No admin bio provided."}</p>
          </div>

          <SocialLinks links={adminLinks} />

          <div className="profile-actions">
            <button className="primary" onClick={() => navigate("/editprofile")}>
              Edit Admin Profile
            </button>
            <button className="ghost">Manage Users</button>
            <button className="ghost">Admin Settings</button>
          </div>
        </div>
      </div>
    </>
  );
}

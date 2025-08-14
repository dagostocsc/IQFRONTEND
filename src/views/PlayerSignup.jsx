// src/views/PlayerSignup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";

const API_ORIGIN = import.meta.env.VITE_API_ORIGIN || "http://localhost:8080";


const ADMIN_CREATE_USER_ENDPOINT = `${API_ORIGIN}/api/admin/users`;   
const ADMIN_CREATE_PLAYER_ENDPOINT = `${API_ORIGIN}/api/admin/players`;

const NEXT_PATH = "/admin/players";

export default function PlayerSignup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    gamerTag: "",
  });

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const logos = [
    { href: "https://www.nasa.gov", img: "/femalehoodie.png", alt: "NASA" },
    { href: "https://www.spacex.com", img: "/sorry.png", alt: "SpaceX" },
    { href: "https://www.astronomy.com", img: "femalehoodie.png", alt: "Astronomy" },
    { href: "https://astroscale.com", img: "/sorry.png", alt: "Astroscale" },
    { href: "https://www.astrobotic.com", img: "femalehoodie.png", alt: "Astrobotic" },
    { href: "https://aas.org/news/astronomy-in-the-news", img: "/sorry.png", alt: "AAS" },
    { href: "https://www.space.com", img: "femalehoodie.png", alt: "Space News" },
    { href: "https://phys.org/space-news/astronomy/", img: "/sorry.png", alt: "Phys Org" },
  ];

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const firstName = form.firstName.trim();
    const lastName  = form.lastName.trim();
    const username  = form.username.trim();
    const email     = form.email.trim();
    const password  = form.password;
    const gamerTag  = form.gamerTag.trim();

    if (!firstName || !lastName || !username || !email || !password || !gamerTag) {
      toast.warn("⚠ Fill out every field (including Gamer Tag).", {
        className: "neon-toast neon-warn",
        icon: "⚠",
        autoClose: 2000,
      });
      return;
    }
    if (password.length < 6) {
      toast.warn("⚠ Password must be at least 6 characters.", {
        className: "neon-toast neon-warn",
        icon: "⚠",
        autoClose: 2200,
      });
      return;
    }

    try {
      setLoading(true);
      setProgress(30);

      const token = localStorage.getItem("token");
      if (!token) throw new Error("Admin auth required.");

      // 1) Create the USER with role=player
      const userPayload = {
        firstName,
        lastName,
        username,
        email,
        password,
        role: "player",
      };

      const userRes = await axios.post(ADMIN_CREATE_USER_ENDPOINT, userPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setProgress(65);

      // Try common shapes to get created userId
      const createdUser =
        userRes?.data?.user || userRes?.data || {};
      const userId =
        createdUser.id ?? createdUser.userId ?? createdUser.user?.id;

      if (!userId) throw new Error("User created, but no userId returned.");

      // 2) Create the PLAYER linked to that user
      const playerPayload = {
        userId,
        firstName,
        lastName,
        gamerTag,
        email,
      };

      const playerRes = await axios.post(ADMIN_CREATE_PLAYER_ENDPOINT, playerPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setProgress(100);

      const createdTag =
        playerRes?.data?.gamerTag || playerRes?.data?.player?.gamerTag || gamerTag;

      toast.success(`🏆 Welcome, ${createdTag}!`, {
        className: "neon-toast",
        icon: "🎮",
        autoClose: 1800,
      });

      // Reset form
      setForm({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        gamerTag: "",
      });

      // Send admin to players list (adjust NEXT_PATH if you have a detail route)
      navigate(NEXT_PATH, { replace: true });
    } catch (err) {
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        "Create player failed.";
      toast.error(msg, {
        className: "neon-toast neon-error",
        icon: "❌",
        autoClose: 2600,
      });
      setProgress(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="wrapper">
        <form className="signupForm" onSubmit={handleSubmit} noValidate>
          <h1>Add Player</h1>

          <div className="input-box">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={onChange}
              autoComplete="given-name"
              required
            />
          </div>

          <div className="input-box">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={onChange}
              autoComplete="family-name"
              required
            />
          </div>

          <div className="input-box">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={onChange}
              autoComplete="username"
              required
            />
          </div>

          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={onChange}
              autoComplete="email"
              required
            />
          </div>

          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Temporary Password"
              value={form.password}
              onChange={onChange}
              autoComplete="new-password"
              required
              minLength={6}
            />
          </div>

          {/* Additional field for players */}
          <div className="input-box">
            <input
              type="text"
              name="gamerTag"
              placeholder="Gamer Tag"
              value={form.gamerTag}
              onChange={onChange}
              required
            />
          </div>

          <div id="progress-wrap" aria-hidden={progress === 0}>
            <div id="progress-bar" style={{ width: `${progress}%` }} />
          </div>

          <div className="btn-container">
            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Add Player"}
            </button>
          </div>

          <div className="register-link">
            <p>
              Back to players list?{" "}
              <span
                onClick={() => navigate(NEXT_PATH)}
                style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
              >
                Manage Players
              </span>
            </p>
          </div>
        </form>

        <div className="scrolling-container">
          <div className="scrolling-track">
            {logos.concat(logos).map((item, idx) => (
              <a
                href={item.href}
                key={idx}
                className="scrolling-item"
                target="_blank"
                rel="noreferrer"
              >
                <img src={item.img} alt={item.alt} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

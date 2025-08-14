import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditUserProfile.css";
import VideoBG from "../components/VideoBG";

const MAX_BIO = 500;
const MAX_TAGS = 10;
const MAX_TAG_LEN = 20;
const TAG_REGEX = /^[a-z0-9 _.\-#&]+$/i;
const ALLOWED_MIME = ["image/jpeg", "image/jpg", "image/png"];
const MAX_FILE_BYTES = 2 * 1024 * 1024;

const API_ORIGIN = import.meta.env.VITE_API_ORIGIN || "http://localhost:8080";
const FALLBACK_AVATAR =
  "https://media.istockphoto.com/id/1700937955/vector/human-man-head-with-glitch-face-anonymous-vector-icon-incognito-sign-privacy-concept-gamer.jpg?s=612x612&w=0&k=20&c=1Ur-WQ_2kBHHUoDnfq5aRhv093Ha7McsSP_jafiLCwM=";

export default function EditUserProfile() {
  const [user, setUser] = useState(null);
  const [bio, setBio] = useState("");
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({ bio: "", tags: "", image: "", submit: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must log in first.");
      navigate("/login");
      return;
    }
    (async () => {
      try {
        const res = await axios.get(`${API_ORIGIN}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const u = res.data;
        setUser(u);
        setBio((u.bio || "").slice(0, MAX_BIO));
        setTags(Array.isArray(u.tags) ? u.tags.slice(0, MAX_TAGS) : []);
      } catch {
        alert("Error loading profile.");
        navigate("/login");
      }
    })();
  }, [navigate]);

  useEffect(() => {
    // cleanup object URLs
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const validateBio = (v) => (v.length > MAX_BIO ? `Bio must be ≤ ${MAX_BIO} characters` : "");
  const normalizeTag = (t) => t.toLowerCase().trim();
  const validateTag = (t) => {
    if (!t) return "Empty tag";
    if (t.length > MAX_TAG_LEN) return `Tag must be ≤ ${MAX_TAG_LEN} chars`;
    if (!TAG_REGEX.test(t)) return "Invalid characters in tag";
    return "";
  };

  const handleBioChange = (e) => {
    const value = e.target.value;
    setErrors((s) => ({ ...s, bio: validateBio(value) }));
    setBio(value.slice(0, MAX_BIO));
  };

  const handleTagInput = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const t = normalizeTag(e.currentTarget.value);
    e.currentTarget.value = "";
    if (!t) return;
    if (tags.length >= MAX_TAGS) return setErrors((s) => ({ ...s, tags: `Max ${MAX_TAGS} tags` }));
    const err = validateTag(t);
    if (err) return setErrors((s) => ({ ...s, tags: err }));
    if (tags.includes(t)) return setErrors((s) => ({ ...s, tags: "Duplicate tag" }));
    setTags((prev) => [...prev, t]);
    setErrors((s) => ({ ...s, tags: "" }));
  };

  const removeTag = (idx) => {
    setTags((prev) => prev.filter((_, i) => i !== idx));
    setErrors((s) => ({ ...s, tags: "" }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_MIME.includes(file.type)) {
      setErrors((s) => ({ ...s, image: "Only JPG/PNG allowed" }));
      setImage(null);
      setImagePreview(null);
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setErrors((s) => ({ ...s, image: "Max file size is 2MB" }));
      setImage(null);
      setImagePreview(null);
      return;
    }

    setErrors((s) => ({ ...s, image: "" }));
    setImage(file);

    const url = URL.createObjectURL(file);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    const bioErr = validateBio(bio);
    if (bioErr) return setErrors((s) => ({ ...s, bio: bioErr }));
    for (const t of tags) {
      const err = validateTag(t);
      if (err) return setErrors((s) => ({ ...s, tags: err }));
    }

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("bio", bio);
      formData.append("tags", JSON.stringify(tags));
      if (image) formData.append("image", image);

      await axios.patch(`${API_ORIGIN}/api/user/${user.id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (err) {
      const msg =
        err.response?.data?.errors?.[0]?.msg ||
        err.response?.data?.error ||
        "Failed to update profile.";
      setErrors((s) => ({ ...s, submit: msg }));
    }
  };

  if (!user) return <p>Loading...</p>;

  const currentAvatar = imagePreview || user.imageURL || FALLBACK_AVATAR;

  return (
    <>
      <VideoBG src="/heavysmoke.mp4" />
      <div className="profile-page">
        <form className="profile-card" onSubmit={handleSubmit} noValidate>
          {/* AVATAR + EDIT BUTTON (label over hidden input) */}
          <div className="avatar-wrapper">
            <div className="avatar-circle">
              <img
                src={currentAvatar}
                alt=""
                className="profile-img"
                onError={(e) => {
                  e.currentTarget.src = FALLBACK_AVATAR;
                }}
              />
            </div>

            <input
              id="avatarFile"
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />

            <label
              htmlFor="avatarFile"
              className="avatar-edit"
              title="Change photo"
              aria-label="Change photo"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                  fill="currentColor"
                />
              </svg>
            </label>
          </div>

          <h1>Edit Profile</h1>

          {errors.image && <div className="error">{errors.image}</div>}

          <div className="about-section">
            <label>Bio:</label>
            <textarea
              value={bio}
              onChange={handleBioChange}
              placeholder="Write something about yourself..."
              maxLength={MAX_BIO}
            />
            <div className="muted">
              {bio.length}/{MAX_BIO}
            </div>
            {errors.bio && <div className="error">{errors.bio}</div>}

            <label style={{ marginTop: "1rem" }}>Tags:</label>
            <input
              type="text"
              placeholder="Type a tag and press Enter"
              onKeyDown={handleTagInput}
            />
            {errors.tags && <div className="error">{errors.tags}</div>}

            <div className="tags">
              {tags.map((tag, i) => (
                <span key={`${tag}-${i}`} className="tag">
                  {tag}
                  <button type="button" onClick={() => removeTag(i)} aria-label={`Remove ${tag}`}>
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {errors.submit && <div className="error" style={{ marginTop: "0.75rem" }}>{errors.submit}</div>}

          <div className="profile-actions">
            <button className="primary" type="submit">Save Changes</button>
            <button className="ghost" type="button" onClick={() => navigate("/profile")}>Cancel</button>
          </div>
        </form>
      </div>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserProfile.css";
import VideoBG from "../components/VideoBG";

const EditUserProfile = () => {
  const [user, setUser] = useState(null);
  const [bio, setBio] = useState("");
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
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
        setBio(res.data.bio || "");
        setTags(res.data.tags || []);
      } catch (err) {
        console.error(err);
        alert("Error loading profile.");
        navigate("/login");
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("bio", bio);
    formData.append("tags", JSON.stringify(tags));
    if (image) formData.append("image", image);

    try {
      await axios.patch(`http://localhost:8080/api/user/${user.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      alert("Failed to update profile.");
    }
  };

  const handleTagInput = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTag = e.target.value.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      e.target.value = "";
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <>
      <VideoBG src="/heavysmoke.mp4" />
      <div className="profile-page">
        <form className="profile-card" onSubmit={handleSubmit}>
          <h1>Edit Profile</h1>

          <div className="avatar-wrapper">
            <img
              src={
                imagePreview ||
                user.imageURL ||
                "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
              }
              alt="Preview"
              className="profile-img"
            />
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          <div className="about-section">
            <label>Bio:</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write something about yourself..."
            />

            <label>Tags:</label>
            <input
              type="text"
              placeholder="Type and press Enter"
              onKeyDown={handleTagInput}
            />
            <div className="tags">
              {tags.map((tag, i) => (
                <span key={i} className="tag">{tag}</span>
              ))}
            </div>
          </div>

          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => navigate("/profile")}>
            Cancel
          </button>
        </form>
      </div>
    </>
  );
};

export default EditUserProfile;

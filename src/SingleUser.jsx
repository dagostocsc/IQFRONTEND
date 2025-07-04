import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

const SingleUser = ({ fetchAllUsers }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [form, setForm] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/users/${id}`);
        setUser(res.data);
        setForm(res.data);
      } catch (err) {
        console.error("Error loading user:", err);
      }
    })();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    if (!editing) {
      setEditing(true);
      return;
    }
    try {
      const { data } = await api.patch(`/users/${id}`, form);
      setUser(data);
      setForm(data);
      setEditing(false);
      fetchAllUsers();
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  const handleCancel = () => {
    setForm(user);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await api.delete(`/users/${id}`);
      fetchAllUsers();
      navigate("/users");
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  if (!form) return <p>Loading…</p>;

  return (
    <div className="single-user-form-div">
      <form className="single-user-form" onSubmit={handleEditSave}>
        <img
          src={form.imageURL || "https://via.placeholder.com/200"}
          alt={`${form.firstName} ${form.lastName}`}
          width={200}
          height={200}
        />

        <label>
          First Name
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            disabled={!editing}
          />
        </label>

        <label>
          Last Name
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            disabled={!editing}
          />
        </label>

        <label>
          Email
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            disabled={!editing}
          />
        </label>

        <label>
          Phone Number
          <input
            name="phoneNumber"
            value={form.phoneNumber || ""}
            onChange={handleChange}
            disabled={!editing}
          />
        </label>

        <label>
          Date of Birth
          <input
            name="dateOfBirth"
            type="date"
            value={form.dateOfBirth || ""}
            onChange={handleChange}
            disabled={!editing}
          />
        </label>

        <label>
          Bio
          <textarea
            name="bio"
            value={form.bio || ""}
            onChange={handleChange}
            disabled={!editing}
          />
        </label>

        <div style={{ marginTop: "1rem" }}>
          <button type="submit">{editing ? "Save" : "Edit"}</button>

          {editing && (
            <button
              type="button"
              onClick={handleCancel}
              style={{ marginLeft: 8 }}
            >
              Cancel
            </button>
          )}

          {editing && (
            <button
              type="button"
              onClick={handleDelete}
              style={{ marginLeft: 8, color: "red" }}
            >
              Delete User
            </button>
          )}

          <button
            type="button"
            style={{ marginLeft: 8 }}
            onClick={() => navigate("/users")}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default SingleUser;

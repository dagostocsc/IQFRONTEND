import React, { useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

const AddStudent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gpa, setGPA] = useState("");

  // const navigate = useNavigate();

  const handleClear = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setGPA("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(firstName, lastName, email, gpa);

    const payload = {
      firstName,
      lastName,
      email,
      gpa,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/students", // fixed URL (use http not https for localhost)
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);

      handleClear();

      // navigate("/students");
    } catch (err) {
      if (err.response) {
        console.error(err.response.data);
      } else {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <h1>JOIN OUR CAMPUS</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">FIRST NAME</label>
        <input
          required
          type="text"
          name="firstName"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        />

        <label htmlFor="lastName">LAST NAME</label>
        <input
          required
          type="text"
          name="lastName"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        />

        <label htmlFor="email">EMAIL</label>
        <input
          required
          type="text"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label htmlFor="gpa">GPA</label>
        <input
          type="number"
          name="gpa"
          onChange={(e) => setGPA(e.target.value)}
          value={gpa}
        />

        <button type="submit">Add Student</button>
        <button type="button" onClick={handleClear}>Clear</button>
      </form>
    </div>
  );
};

export default AddStudent;

import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const [progress, setProgress] = useState(0);

  const logos = [
    { href: "https://www.nasa.gov", img: "NASA LOGO.png", alt: "NASA" },
    { href: "https://www.spacex.com", img: "SPACE X LOGO.png", alt: "SpaceX" },
    { href: "https://www.astronomy.com", img: "ASTRONOMY MAGAZINE.png", alt: "Astronomy" },
    { href: "https://astroscale.com", img: "ASTROSCALE.png", alt: "Astroscale" },
    { href: "https://www.astrobotic.com", img: "ASTROBOTIC TECHNOLOGY LOGO.png", alt: "Astrobotic" },
    { href: "https://aas.org/news/astronomy-in-the-news", img: "AMERICAN ASTRONOMICAL SOCIETY.png", alt: "AAS" },
    { href: "https://www.space.com", img: "SPACE NEWS.png", alt: "Space News" },
    { href: "https://phys.org/space-news/astronomy/", img: "PHYS ORG.png", alt: "Phys Org" },
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, username, email, password } = formData;
    if (!firstName || !lastName || !username || !email || !password) {
      alert("Please fill in all required fields!");
      return;
    }

    setProgress(100);

    try {
      await axios.post("http://localhost:8080/api/auth/signup", {
        firstName,
        lastName,
        username,
        email,
        password,
      });

      const loginResponse = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });

      const { token } = loginResponse.data;
      if (token) {
        localStorage.setItem("token", token);
        alert("Signup & Login successful! Redirecting to profile...");
        navigate("/profile");
      } else {
        alert("Signup succeeded, but login failed.");
      }
    } catch (error) {
      console.error(error);
      alert("Signup failed. Try again.");
    }

    setProgress(0);
  };

  return (
    <div className="login-page">
      <div className="wrapper">
        <form className="signupForm" onSubmit={handleSubmit}>
          <h1>Sign Up</h1>

          <div className="input-box">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div id="progress-bar" style={{ width: `${progress}%` }}></div>

          <div className="btn-container">
            <button className="btn" type="submit">Sign Up</button>
          </div>

          <div className="register-link">
            <p>
              Already have an account? <a href="/login">Login</a>
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
};

export default SignUp;

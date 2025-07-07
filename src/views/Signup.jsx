import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();

    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      dateOfBirth: "",
      phoneNumber: "",
      imageURL: "",
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

    const { firstName, lastName, email, address } = formData;
    if (!firstName || !lastName || !email || !address) {
      alert("Please fill in all required fields!");
      return;
    }

    setProgress(100); // Show full progress bar

    try {
      const response = await axios.post("http://localhost:8080/api/user", formData); 
      alert("Sign Up Successful!");
      navigate("/");
    } catch (error) {
      alert("Sign Up Failed. Try again.");
      console.error(error);
    }

    setProgress(0); // Reset progress bar (optional)
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
              className="input-box"
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
              className="input-box"
              value={formData.lastName}
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
              className="input-box"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              className="input-box"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <input
              type="date"
              name="dateOfBirth"
              className="input-box"
              placeholder="Date of Birth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>

          <div className="input-box">
            <input
              type="text"
              name="phoneNumber"
              className="input-box"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <div className="input-box">
            <input
             className="input-box"
              type="url"
              name="imageURL"
              placeholder="Image URL (optional)"
              value={formData.imageURL}
              onChange={handleChange}
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
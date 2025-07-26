import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const togglePassword = document.querySelector(".toggle-password");
    const passwordField = document.getElementById("password");

    if (togglePassword && passwordField) {
      togglePassword.addEventListener("click", () => {
        passwordField.type =
          passwordField.type === "password" ? "text" : "password";
      });
    }

    const form = document.getElementById("loginForm");
    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (!email || !password) {
          alert("Please fill in all fields!");
          return;
        }

        document.getElementById("progress-bar").style.width = "100%";

        try {
          const res = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          const data = await res.json();

          if (data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role); // 🟢 Save role
            alert("Login Successful! Redirecting to profile...");
            navigate("/profile");
          } else {
            alert("Login failed: " + (data.error || "Unknown error"));
            document.getElementById("progress-bar").style.width = "0%";
          }
        } catch (err) {
          console.error(err);
          alert("Login request failed.");
          document.getElementById("progress-bar").style.width = "0%";
        }
      });
    }
  }, [navigate]);

  const logos = [
    { href: "https://www.nasa.gov", img: "sorry.png", alt: "Gaming Hoodie" },
    { href: "https://www.spacex.com", img: "SPACE X LOGO.png", alt: "SpaceX" },
    { href: "https://www.astronomy.com", img: "ASTRONOMY MAGAZINE.png", alt: "Astronomy" },
    { href: "https://astroscale.com", img: "ASTROSCALE.png", alt: "Astroscale" },
    { href: "https://www.astrobotic.com", img: "ASTROBOTIC TECHNOLOGY LOGO.png", alt: "Astrobotic" },
    { href: "https://aas.org/news/astronomy-in-the-news", img: "AMERICAN ASTRONOMICAL SOCIETY.png", alt: "AAS" },
    { href: "https://www.space.com", img: "SPACE NEWS.png", alt: "Space News" },
    { href: "https://phys.org/space-news/astronomy/", img: "PHYS ORG.png", alt: "Phys Org" },
  ];

  return (
    <div className="login-page">
      <div className="wrapper">
        <form id="loginForm">
          <h1>Login</h1>

          <div className="input-box">
            <input type="email" id="email" placeholder="Email" required />
          </div>

          <div className="input-box">
            <input type="password" id="password" placeholder="Password" required />
            <i className="toggle-password bx bx-show"></i>
          </div>

          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot Password</a>
          </div>

          <div id="progress-bar"></div>

          <div className="btn-container">
            <button className="btn">Login</button>
          </div>

          <div className="register-link">
            <p>
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
              >
                Register
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
};

export default LoginPage;

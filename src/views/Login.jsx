import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

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

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = form.email.trim();
    const password = form.password;

    if (!email || !password) {
      toast.warn("⚠ Please fill in all fields.", {
        className: "neon-toast neon-warn",
        icon: "⚠",
        autoClose: 2000,
      });
      return;
    }

    try {
      setLoading(true);
      setProgress(40);

      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      setProgress(75);
      const data = await res.json();

      if (!res.ok) throw new Error(data?.error || "Login failed");
      if (!data?.token) throw new Error("Missing token in response.");

      localStorage.setItem("token", data.token);
      if (data.role) localStorage.setItem("role", data.role);

      setProgress(100);
      toast.success("🎮 Welcome back, gamer!", {
        className: "neon-toast",
        icon: "🚀",
        autoClose: 1800,
      });

      navigate("/profile", { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Login request failed.", {
        className: "neon-toast neon-error",
        icon: "❌",
        autoClose: 2200,
      });
      setProgress(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="wrapper">
        <form id="loginForm" onSubmit={handleSubmit} noValidate>
          <h1>Login</h1>

          <div className="input-box">
            <input
              type="email"
              id="email"
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
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={onChange}
              autoComplete="current-password"
              required
            />
            <i
              className={`toggle-password bx ${showPassword ? "bx-hide" : "bx-show"}`}
              onClick={() => setShowPassword((s) => !s)}
              role="button"
              aria-label="Toggle password visibility"
              tabIndex={0}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") && setShowPassword((s) => !s)
              }
            />
          </div>

          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot Password</a>
          </div>

          <div id="progress-wrap" aria-hidden={progress === 0}>
            <div id="progress-bar" style={{ width: `${progress}%` }} />
          </div>

          <div className="btn-container">
            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          <div className="register-link">
            <p>
              Don&apos;t have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                style={{
                  color: "blue",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
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

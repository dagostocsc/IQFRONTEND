import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import Footer from "./Footer";

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <img src="IQLOGO1.jpeg" alt="logo" className="logo" />
        <ul className="navbar-nav">
          <li><Link to="/" className="nav-link">HOME</Link></li>
          <li><Link to="/services" className="nav-link">Services</Link></li>

          <li className="nav-link dropdown">
            Account ▾
            <ul className="dropdown-menu">
              {!token ? (
                <>
                  <li><Link to="/login" className="dropdown-item">Login</Link></li>
                  <li><Link to="/signup" className="dropdown-item">Signup</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/profile" className="dropdown-item">Profile</Link></li>
                  <li><Link to="/edit-profile" className="dropdown-item">Edit Profile</Link></li>
                  <li><Link to="/manage-bookings" className="dropdown-item">Manage Bookings</Link></li>
                  <li><Link to="/manage-services" className="dropdown-item">Manage Services</Link></li>
                  <li>
                    <span
                      onClick={handleLogout}
                      className="dropdown-item"
                      style={{ cursor: "pointer" }}
                    >
                      Logout
                    </span>
                  </li>
                </>
              )}
            </ul>
          </li>

          <li><span className="nav-link disabled">IQ Entertainment</span></li>
        </ul>
      </div>

      <div>
        <Footer />
      </div>
    </nav>
  );
};

export default NavBar;

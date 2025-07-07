import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import Footer from "./Footer";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <img src="IQLOGO1.jpeg" alt="logo" className="logo" />
        <ul className="navbar-nav">
          <li><Link to="/" className="nav-link">HOME</Link></li>
          <li><Link to="/serivces" className="nav-link">Services</Link></li>
          <li><Link to="/login" className="nav-link">Login</Link></li>
          <li><Link to="/signup" className="nav-link">Signup</Link></li>
          <li><Link to="/profile" className="nav-link">Profile</Link></li>
          <li><span className="nav-link disabled">IQ Entertainment</span></li>
        </ul>
      </div>
      <div>
        <Footer/>
      </div>
    </nav>
  );
};

export default NavBar;

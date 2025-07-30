import React from "react";
import axios from "axios";
import "./Services.css";
import { Link } from "react-router-dom";

const BookPlayer = () => {
  return (
    <>
      <div className="services-container">
        <div className="profile-card">
          <p>IQ BUVL</p>
          <Link className="book-now-btn" to="/calendar">
            Book Player
          </Link>
        </div>
        <div className="profile-card">
          <p>IQ Bowzers</p>
          <Link className="book-now-btn" to="/calendar">
            Book Player
          </Link>
        </div>
        <div className="profile-card">
          <p>IQ DebbieCakes</p>
          <Link className="book-now-btn" to="/calendar">
            Book Player
          </Link>
        </div>
      </div>
    </>
  );
};

export default BookPlayer;

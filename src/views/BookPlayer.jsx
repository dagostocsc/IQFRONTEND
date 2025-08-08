import React from "react";
import "./Services.css";
import CalendlyPopupButton from "../components/CalendlyPopupButton";

const BookPlayer = () => {
  return (
    <div className="services-container">
      <div className="service-card">
        <img src="/BUVL.jpg" alt="IQ BUVL" className="service-image" />
        <h3 className="service-title">IQ BUVL</h3>
        <p className="service-description">
          Top-tier FPS Player with years of competitive experience.
        </p>
        <CalendlyPopupButton url="https://calendly.com/iqbuvl" />
      </div>

      <div className="service-card">
        <img src="/IQBowzrz.jpg" alt="IQ Bowzers" className="service-image" />
        <h3 className="service-title">IQ Bowzers</h3>
        <p className="service-description">
          Tactical strategist and team leader in squad-based games.
        </p>
        <CalendlyPopupButton url="https://calendly.com/iqbowzers" />
      </div>

      <div className="service-card">
        <img
          src="/Deb.jpeg"
          alt="IQ DebbieCakes"
          className="service-image"
          width={"100%"}
        />
        <h3 className="service-title">IQ DebbieCakes</h3>
        <p className="service-description">
          Creative powerhouse and content editor with style.
        </p>
        <CalendlyPopupButton url="https://calendly.com/deborahagosto19/marketing" />
      </div>
    </div>
  );
};

export default BookPlayer;

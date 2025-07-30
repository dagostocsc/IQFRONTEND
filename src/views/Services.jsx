import React from "react";
import "./Services.css";
import { useNavigate } from "react-router-dom";

const services = [
  {
    name: "Gaming Coaching",
    description: "One-on-one training to improve your gaming skills.",
    price: "$75/hr",
  },
  {
    name: "Video Editing",
    description: "Professional editing for your game clips or content.",
    price: "$75/hr",
  },
  {
    name: "Coaching for Video Editing",
    description: "Learn how to edit like a pro with personalized coaching.",
    price: "$80/hr",
  },
  {
    name: "Marketing Consulting",
    description: "Grow your brand with expert marketing strategies.",
    price: "$80/hr",
  },
];

const Services = () => {
  const navigate = useNavigate();

  const handleBook = (service) => {
    navigate("/bookplayer", { state: { service } }); // assuming you will have a /book route
  };

  return (
    <div className="services-container">
      {services.map((service, index) => (
        <div key={index} className="service-card">
          <h3 className="service-title">{service.name}</h3>
          <p className="service-description">{service.description}</p>
          <p className="service-price">{service.price}</p>
          <button className="book-now-btn" onClick={() => handleBook(service)}>
            Book Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default Services;

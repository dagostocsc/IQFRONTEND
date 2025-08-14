import React from "react";
import "./SocialLinks.css";

const SocialLinks = ({ links }) => {
  return (
    <div className="social-links">
      {links.map((item, idx) => (
        <a
          href={item.href}
          key={idx}
          className="social-link"
          target="_blank"
          rel="noreferrer"
        >
          <img src={item.img} alt={item.alt} />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;

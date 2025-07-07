import React from "react";
import "./VideoBG.css";

const VideoBG = ({ src }) => {
  return (
    <div className="videoBG">
      <video autoPlay muted loop>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBG;

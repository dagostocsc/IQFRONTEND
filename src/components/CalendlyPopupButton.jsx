import { useEffect } from "react";

const CalendlyPopupButton = ({ url, text = "Book Player" }) => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  const handleClick = () => {
    if (!url) {
      alert("This player has not set up a booking link yet.");
      return;
    }
    window.Calendly.initPopupWidget({ url });
  };

  return (
    <button className="book-button" onClick={handleClick}>
      {text}
    </button>
  );
};

export default CalendlyPopupButton;

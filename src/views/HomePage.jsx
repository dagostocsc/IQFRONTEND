import React, { useState } from "react";
import "./HomePage.css";

const HomePage = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const reviewsData = [
    {
      name: "Rachel Green",
      service: "Gaming Coaching",
      comment:
        "I never thought I'd improve this fast. The one-on-one coaching sessions are worth every penny.",
    },
    {
      name: "Jim Halpert",
      service: "Video Editing",
      comment:
        "I needed clips for my stream highlights and what I got looked like something straight out of a pro studio.",
    },
    {
      name: "Seong Gi-hun",
      service: "Coaching for Video Editing",
      comment:
        "I used to struggle editing even basic footage. Now I feel confident creating content from scratch.",
    },
    {
      name: "Monica Geller",
      service: "Gaming Coaching",
      comment:
        "Everything was smooth, structured, and super helpful! I appreciated the personalized tips.",
    },
    {
      name: "Dwight Schrute",
      service: "Marketing Consulting",
      comment:
        "Our brand reach increased 2x after following Chandler's social growth plan. Highly efficient.",
    },
    {
      name: "Kang Sae-byeok",
      service: "Video Editing",
      comment:
        "Quick turnaround, great quality, and sharp attention to detail. I’ll be back.",
    },
    {
      name: "Sheldon Cooper",
      service: "Marketing Consulting",
      comment:
        "Statistically speaking, their strategy had a 93% increase in our conversion rate. Fascinating.",
    },
    {
      name: "Penny",
      service: "Coaching for Video Editing",
      comment:
        "Even with no experience, I felt like I could follow along and actually learn. Super beginner friendly.",
    },
    {
      name: "Harvey Specter",
      service: "Marketing Consulting",
      comment:
        "They didn’t just give advice, they delivered results. My brand presence feels unstoppable now.",
    },
  ];

  return (
    <>
      <section className="how-it-works">
        <h2>Join Our Competitive Gaming Hub!</h2>
        <div className="steps">
          <div className="step">
            <h3>Train with Top-Tier Talent</h3>
            <p>Set up a question and add your options.</p>
          </div>
          <div className="step">
            <h3>Level Up with the Best in the Game</h3>
            <p>Send your poll via link or embed it anywhere.</p>
          </div>
          <div className="step">
            <h3>Master Your Skills with Elite Players</h3>
            <p>Watch the votes roll in and make the best choice.</p>
          </div>
        </div>
      </section>

      <section className="reviews">
        <h2>User Reviews</h2>
        <div className="reviews-container">
          {reviewsData.map(({ name, service, comment }, index) => (
            <div
              key={index}
              className={`review-card ${
                hoveredIndex === index ? "hovered" : ""
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="review-header">
                <strong>{name}</strong> <em>({service})</em>
              </div>
              <div className="stars-container">
                <div className="stars">★★★★★</div>
                {hoveredIndex === index && <div className="confetti"></div>}
              </div>
              <p className="review-comment">"{comment}"</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default HomePage;

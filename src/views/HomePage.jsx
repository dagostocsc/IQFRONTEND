import React, { useState, useEffect, useRef } from "react";
import "./HomePage.css";

const HomePage = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [active, setActive] = useState(false);
  const overlayRef = useRef(null);

  const reviewsData = [
    { name: "Rachel Green", service: "Gaming Coaching", comment: "I never thought I'd improve this fast. The one-on-one coaching sessions are worth every penny." },
    { name: "Jim Halpert", service: "Video Editing", comment: "I needed clips for my stream highlights and what I got looked like something straight out of a pro studio." },
    { name: "Seong Gi-hun", service: "Coaching for Video Editing", comment: "I used to struggle editing even basic footage. Now I feel confident creating content from scratch." },
    { name: "Monica Geller", service: "Gaming Coaching", comment: "Everything was smooth, structured, and super helpful! I appreciated the personalized tips." },
    { name: "Dwight Schrute", service: "Marketing Consulting", comment: "Our brand reach increased 2x after following Chandler's social growth plan. Highly efficient." },
    { name: "Kang Sae-byeok", service: "Video Editing", comment: "Quick turnaround, great quality, and sharp attention to detail. I’ll be back." },
    { name: "Sheldon Cooper", service: "Marketing Consulting", comment: "Statistically speaking, their strategy had a 93% increase in our conversion rate. Fascinating." },
    { name: "Penny", service: "Coaching for Video Editing", comment: "Even with no experience, I felt like I could follow along and actually learn. Super beginner friendly." },
    { name: "Harvey Specter", service: "Marketing Consulting", comment: "They didn’t just give advice, they delivered results. My brand presence feels unstoppable now." },
  ];

  const logos = [
    { href: "https://www.nasa.gov", img: "/femalehoodie.png", alt: "NASA" },
    { href: "https://www.spacex.com", img: "/sorry.png", alt: "SpaceX" },
    { href: "https://www.astronomy.com", img: "femalehoodie.png", alt: "Astronomy" },
    { href: "https://astroscale.com", img: "/sorry.png", alt: "Astroscale" },
    { href: "https://www.astrobotic.com", img: "femalehoodie.png", alt: "Astrobotic" },
    { href: "https://aas.org/news/astronomy-in-the-news", img: "/sorry.png", alt: "AAS" },
    { href: "https://www.space.com", img: "femalehoodie.png", alt: "Space News" },
    { href: "https://phys.org/space-news/astronomy/", img: "/sorry.png", alt: "Phys Org" },
  ];

  useEffect(() => {
    const onScroll = () => {
      const el = overlayRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setActive(rect.top < window.innerHeight && rect.bottom > 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Split Layout */}
      <section className="split-container">
        <div className="split-left">
          <div className="how-it-works">
            <h2>Join Our Competitive Gaming Hub!</h2>
            <h2>Access exclusive coaching, tournaments, and community events.</h2>
          </div>

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
        </div>

        <div className="split-right">
          <div
            ref={overlayRef}
            className={`right-overlay ${active ? "active" : ""}`}
          />
        </div>
      </section>

      {/* Logo marquee (between cards and reviews) */}
<section className="logo-strip" aria-label="Partner logos">
  <div className="scrolling-container">
    <div className="scrolling-track">
      {[...logos, ...logos].map(({ href, img, alt }, i) => (
        <div className="scrolling-item" key={`${href}-${i}`}>
          <a href={href} target="_blank" rel="noreferrer" className="logo-link" aria-label={alt}>
            <img src={img} alt={alt} className="logo-img" height={300} />
          </a>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Reviews */}
      <section className="reviews">
        <h2>User Reviews</h2>
        <div className="reviews-container">
          {reviewsData.map(({ name, service, comment }, index) => (
            <div
              key={index}
              className={`review-card ${hoveredIndex === index ? "hovered" : ""}`}
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

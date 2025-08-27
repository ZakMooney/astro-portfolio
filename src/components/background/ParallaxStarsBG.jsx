import React, { useEffect, useState } from "react";

import "./AuroraBG.css"; // modified https://www.mshr.app/mesh/1713097663011

const ParallaxStarsBG = () => { // modified https://codepen.io/sarazond/pen/LYGbwj
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const generateBoxShadow = (n, range) => {
    const shadows = [];
    const maxWidth = Math.max(dimensions.width * 1.5, 4000);
    const maxHeight = Math.max(dimensions.height * 1.5, 3000);

    for (let i = 0; i < n; i++) {
      const x = Math.random() * maxWidth;
      const y = Math.random() * maxHeight;
      shadows.push(`${x}px ${y}px #FFF`);
    }
    return shadows.join(", ");
  };

  const starsSmallStyle = {
    width: "1px",
    height: "1px",
    background: "transparent",
    boxShadow: generateBoxShadow(700, dimensions),
    animation: "animStar 50s linear infinite",
    position: "fixed",
    top: 0,
    left: 0,
  };

  const starsMediumStyle = {
    width: "2px",
    height: "2px",
    background: "transparent",
    boxShadow: generateBoxShadow(200, dimensions),
    animation: "animStar 100s linear infinite",
    position: "fixed",
    top: 0,
    left: 0,
  };

  const starsBigStyle = {
    width: "3px",
    height: "3px",
    background: "transparent",
    boxShadow: generateBoxShadow(100, dimensions),
    animation: "animStar 150s linear infinite",
    position: "fixed",
    top: 0,
    left: 0,
  };

  return (
    <>
      <style>{`
        @keyframes animStar {
          from {
            transform: translateY(0px);
          }
          to {
            transform: translateY(${-Math.max(
              dimensions.height * 1.5,
              3000
            )}px);
          }
        }
      `}</style>
      <div className="fixed -moon-1 bg-[#001428ff]">
        <div className="aurora-bg" />
        <div className="stars-container">
          <div id="stars" style={starsSmallStyle}></div>
          <div id="stars2" style={starsMediumStyle}></div>
          <div id="stars3" style={starsBigStyle}></div>
        </div>
      </div>
    </>
  );
};

export default ParallaxStarsBG;

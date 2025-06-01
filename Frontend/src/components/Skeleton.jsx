import React, { useRef, useEffect } from "react";
import fishImg from '../assets/fish.png';


const CIRCLE_RADIUS = 110;
const CIRCLE_SIZE = 300;
const CENTER = CIRCLE_SIZE / 2;
const CAT_SIZE = 60;
const FISH_SIZE = 50;
const ANIMATION_DURATION = 3.5; // seconds

const CAT_START_ANGLE = 0;    // стартовый угол кота
const FISH_START_ANGLE = 50;  // стартовый угол рыбки

function getFlip(angle) {
  const norm = ((angle % 360) + 360) % 360;
  return (norm > 270 || norm < 60) ? -1 : 1;
}

const CatFishCircleLoader = () => {
  const catRef = useRef();
  const fishRef = useRef();
  const startTime = useRef();

  useEffect(() => {
    let running = true;

    function animate(ts) {
      if (!startTime.current) startTime.current = ts;
      // НЕ используем mod для времени!
      const elapsed = (ts - startTime.current) / 1000; // непрерывное время
      const progress = elapsed / ANIMATION_DURATION;    // не mod!
      // каждый персонаж просто бежит вперёд, угол постоянно растёт
      const angleCat = CAT_START_ANGLE + progress * 360;
      const angleFish = FISH_START_ANGLE + progress * 360;

      if (catRef.current) {
        catRef.current.style.transform = `
          rotate(${angleCat}deg) 
          translateY(-${CIRCLE_RADIUS}px)
          rotate(${-angleCat}deg)
          scaleX(${getFlip(angleCat)})
        `;
      }
      if (fishRef.current) {
        fishRef.current.style.transform = `
          rotate(${angleFish}deg) 
          translateY(-${CIRCLE_RADIUS}px)
          rotate(${-angleFish}deg)
          scaleX(${getFlip(angleFish)})
        `;
      }

      if (running) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
    return () => { running = false; };
  }, []);

  return (
    <div style={{
      width: CIRCLE_SIZE, height: CIRCLE_SIZE,
      position: "relative", margin: "0 auto", 
    }}>
      {/* Круг */}
      <svg width={CIRCLE_SIZE} height={CIRCLE_SIZE} style={{ position: "absolute", top: 0, left: 0 }}>
        <circle
          cx={CENTER}
          cy={CENTER}
          r={CIRCLE_RADIUS}
          stroke="#4a5051"
          strokeWidth="10"
          fill="none"
          strokeDasharray="24 20"
        />
      </svg>
      {/* Котик */}
      <div
        ref={catRef}
        style={{
          width: CAT_SIZE, height: CAT_SIZE, position: "absolute",
          top: CENTER - CAT_SIZE / 2, left: CENTER - CAT_SIZE / 2,
          transformOrigin: `${CAT_SIZE / 2}px ${CAT_SIZE / 2}px`,
        }}
      >
        <img
          src="https://raw.githubusercontent.com/twitter/twemoji/master/assets/72x72/1f408.png"
          alt="котик"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
      {/* Рыбка */}
      <div
        ref={fishRef}
        style={{
          width: FISH_SIZE, height: FISH_SIZE, position: "absolute",
          top: CENTER - FISH_SIZE / 2, left: CENTER - FISH_SIZE / 2,
          transformOrigin: `${FISH_SIZE / 2}px ${FISH_SIZE / 2}px`,
        }}
      >
        <img
          src={fishImg}
          alt="рыбка"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
    </div>
  );
};

export default CatFishCircleLoader;
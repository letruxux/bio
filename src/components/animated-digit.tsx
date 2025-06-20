"use client";

import React, { useState, useEffect } from "react";

interface AnimatedNumberProps {
  targetNumber: number;
  delay: number;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ targetNumber, delay }) => {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setCurrentNumber(0); // reset immediato

    if (targetNumber === 0) {
      setCurrentNumber(0);
      setIsAnimating(false);
      return;
    }

    setIsAnimating(false); // reset animazione prima del delay

    const timeout = setTimeout(() => {
      setIsAnimating(true);
      const animationDuration = 1500;
      const steps = targetNumber;
      const stepDuration = animationDuration / Math.max(steps, 1);

      let step = 0;
      const interval = setInterval(() => {
        step++;
        setCurrentNumber(step);

        if (step >= targetNumber) {
          clearInterval(interval);
          setIsAnimating(false);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [targetNumber, delay]);

  return (
    <span
      className={`digit-custom ${isAnimating ? "animating" : ""}`}
      style={{
        fontFamily: "Phonk",
        minWidth: "2ch",
        display: "inline-block",
        textAlign: "right",
      }}
    >
      {currentNumber.toString().padStart(2, "0")}
    </span>
  );
};

export default AnimatedNumber;

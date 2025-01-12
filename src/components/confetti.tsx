"use client";

/* currently unused but will be used soon */
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import React, { useEffect } from "react";

export default function ConfettiComponent() {
  const { width, height } = useWindowSize();
  const [show, setShow] = React.useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 500);
  }, []);

  return (
    show && (
      <Confetti
        style={{ position: "fixed" }}
        width={width}
        height={height}
        numberOfPieces={300}
        recycle={false}
      />
    )
  );
}

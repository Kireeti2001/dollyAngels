import React from "react";
import { useSpring, animated } from "react-spring";

function Logo() {
  const logoAnimation = useSpring({
    from: { opacity: 0, transform: "scale(0.5)" },
    to: { opacity: 1, transform: "scale(1)" },
    config: { mass: 1, tension: 180, friction: 12 },
  });

  return (
    <animated.div style={logoAnimation}>
      <img
        src="/images/logo.png" // Replace with your logo path
        alt="Dolly Angels Logo"
        style={{ width: "150px", height: "auto" }}
      />
    </animated.div>
  );
}

export default Logo;
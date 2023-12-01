import React, { useState, useEffect } from "react";
import GameCaseComp from "./GameCaseComp";
import { useSpring, animated } from "react-spring";

const GameCarousel = () => {
  const [time, setTime] = useState(13 * 60 + 15); // 13 hours and 15 minutes in minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((time) => time - 1);
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const fade = useSpring({
    to: { opacity: 1, transform: "scale(1)" },
    from: { opacity: 0, transform: "scale(0.9)" },
    config: { duration: 500 },
  });

  // State for the gradient color
  const [color, setColor] = useState(0);

  // Update the color every second
  useEffect(() => {
    const interval = setInterval(() => {
      setColor((color + 1) % 360);
    }, 1000);
    return () => clearInterval(interval);
  }, [color]);

  // Calculate the gradient colors
  const color1 = `hsl(${(color + 0) % 360}, 0%, 0%)`; // Black
  const color2 = `hsl(${(color + 0) % 360}, 0%, 30%)`; // Light Gray
  const color3 = `hsl(${(color + 0) % 360}, 0%, 0%)`; // Black

  return (
    <>
      <div
        className="relative flex flex-row m-auto mt-10 mb-10"
        style={{
          background: `linear-gradient(45deg, ${color1}, ${color2}, ${color3})`,
          backgroundSize: "600% 600%",
          animation: "Gradient 6s ease infinite",
        }}
      >
        {/* Place your 3D models here */}
        <GameCaseComp
          cover="src/assets/baldurs_gate.jpg"
          spine="src/assets/baldursgatespine.png"
          back="src/assets/baldursgate.mp4"
        />
        <GameCaseComp
          cover="src/assets/gta4.jpg"
          spine="src/assets/gta4Spine.jpg"
          back="src/assets/gta4.mp4"
        />
        <GameCaseComp
          cover="src/assets/spiderman2.webp"
          spine="src/assets/spidermanspine.png"
          back="src/assets/spiderman.mp4"
        />
        <GameCaseComp
          cover="src/assets/starfield.jpeg"
          spine="src/assets/starfieldspine.png"
          back="src/assets/starfield.mp4"
        />

        {/* Absolute positioned sale and timer divs */}
        <animated.div
          style={fade}
          className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center z-10 pointer-events-none"
        >
          <animated.div
            style={{
              ...fade,
              transform: fade.transform.to(
                (t) => `scale(${t}) translateX(-50%)`
              ),
            }}
            className=" bg-lime-500 font-extrabold text-white bg-opacity-80 rounded-md text-center text-7xl p-2 m-1 shadow-lg pointer-events-auto animate-pulse"
          >
            Holiday Sale
          </animated.div>
          <animated.div
            style={{
              ...fade,
              transform: fade.transform.to(
                (t) => `scale(${t}) translateX(50%)`
              ),
            }}
            className=" bg-red-500 font-bold text-xl text-white bg-opacity-80 rounded-md text-center p-2 m-1 shadow-lg pointer-events-auto animate-pulse"
          >
            Only {String(Math.floor((time % 3600) / 60)).padStart(2, "0")} hrs
            and {String(Math.floor(time % 60)).padStart(2, "0")} mins left!
          </animated.div>
          <animated.button
            style={{
              ...fade,
              backgroundColor: "red",
            }}
            className="text-white text-2xl font-bold shadow-md rounded-md text-center p-2 m-1 mt-5 transition duration-300 ease-in-out pointer-events-auto animate-bounce"
            onClick={() =>
              window.open("https://github.com/Group2-FEC/Vapour", "_blank")
            }
          >
            Buy Now
          </animated.button>
        </animated.div>
      </div>
    </>
  );
};

export default GameCarousel;

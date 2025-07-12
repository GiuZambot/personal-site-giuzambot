import { useEffect, useRef, useState } from "react";
import morcego1 from "../../assets/morcego1.png";
import morcego2 from "../../assets/morcego2.png";
import styles from "./Bat.module.css";

const Bat = () => {
  const [sprite, setSprite] = useState(morcego1);
  const [isFlying, setIsFlying] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const batRef = useRef<HTMLImageElement>(null);
  const isFirstFlight = useRef(true);

  // Wing flap animation
  useEffect(() => {
    const wingFlapInterval = setInterval(() => {
      setSprite((prevSprite) =>
        prevSprite === morcego1 ? morcego2 : morcego1
      );
    }, 200);
    return () => clearInterval(wingFlapInterval);
  }, []);

  // Flight control and scheduling
  useEffect(() => {
    if (!isFlying) {
      let delay;
      if (isFirstFlight.current) {
        delay = 5000; // 5 seconds for the first flight
        isFirstFlight.current = false;
      } else {
        delay = 10000; // 10 seconds for subsequent flights
      }

      const timer = setTimeout(() => {
        const direction =
          Math.random() > 0.5 ? styles.flyLeftToRight : styles.flyRightToLeft;
        const topPosition = `${Math.random() * 15 + 2}%`; // Top 2% to 17% of the screen

        if (batRef.current) {
          batRef.current.style.top = topPosition;
        }

        setAnimationClass(direction);
        setIsFlying(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isFlying]);

  // Animation end handler
  useEffect(() => {
    const batElement = batRef.current;

    const handleAnimationEnd = () => {
      setIsFlying(false);
      setAnimationClass("");
    };

    batElement?.addEventListener("animationend", handleAnimationEnd);

    return () => {
      batElement?.removeEventListener("animationend", handleAnimationEnd);
    };
  }, []);

  return (
    <img
      ref={batRef}
      src={sprite}
      className={`${styles.bat} ${
        isFlying ? `${styles.animate} ${animationClass}` : ""
      }`}
      alt="Flying bat"
    />
  );
};

export default Bat;

import { useEffect, useRef, useState } from "react";
import morcego1 from "../../assets/optimized/morcego1.webp";
import morcego2 from "../../assets/optimized/morcego2.webp";
import styles from "./Bat.module.css";

const Bat = () => {
  const [isFlying, setIsFlying] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const batRef = useRef<HTMLDivElement>(null);
  const isFirstFlight = useRef(true);

  useEffect(() => {
    if (isFlying) return;

    const delay = isFirstFlight.current ? 5000 : 10000;
    isFirstFlight.current = false;
    const timer = window.setTimeout(() => {
      const direction =
        Math.random() > 0.5 ? styles.flyLeftToRight : styles.flyRightToLeft;

      if (batRef.current) {
        batRef.current.style.top = `${Math.random() * 15 + 2}%`;
      }

      setAnimationClass(direction);
      setIsFlying(true);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [isFlying]);

  useEffect(() => {
    const batElement = batRef.current;
    const handleAnimationEnd = () => {
      setIsFlying(false);
      setAnimationClass("");
    };

    batElement?.addEventListener("animationend", handleAnimationEnd);
    return () => batElement?.removeEventListener("animationend", handleAnimationEnd);
  }, []);

  return (
    <div
      ref={batRef}
      className={`${styles.bat} ${
        isFlying ? `${styles.animate} ${animationClass}` : ""
      }`}
      aria-hidden="true"
    >
      <img src={morcego1} alt="" width="160" height="92" />
      <img src={morcego2} alt="" width="160" height="92" />
    </div>
  );
};

export default Bat;

import React, { useState } from "react";
import grimoaberto from "../../assets/grimoaberto.png"; // Import the open grimorio image
import grimofechado from "../../assets/grimofechado1.png";
import styles from "./Grimorio.module.css";

const Grimorio: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage open/closed

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleClick = () => {
    setIsOpen(!isOpen); // Toggle on click
  };

  return (
    <div
      className={styles.grimorioContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <img
        src={grimofechado}
        alt="Grimorio Closed"
        className={`${styles.grimorio} ${
          isOpen ? styles.hidden : styles.visible
        }`}
      />
      <img
        src={grimoaberto}
        alt="Grimorio Open"
        className={`${styles.grimorio} ${
          isOpen ? styles.visible : styles.hidden
        }`}
      />
    </div>
  );
};

export default Grimorio;

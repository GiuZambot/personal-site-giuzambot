import React from "react";
import witchImage from "../../assets/bruxinhas.png";
import "./Witch.css";

const Witch: React.FC = () => {
  return (
    <div className="witch-container">
      <div className="witch-bobbing">
        <img src={witchImage} alt="Witch" className="witch" />
      </div>
    </div>
  );
};

export default Witch;

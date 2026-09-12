import witchImage from "../../assets/optimized/bruxinhas.webp";
import "./Witch.css";

const Witch = () => {
  return (
    <div className="witch-container">
      <div className="witch-bobbing">
        <img
          src={witchImage}
          alt="Bruxinhas voando"
          className="witch"
          width="300"
          height="450"
          decoding="async"
        />
      </div>
    </div>
  );
};

export default Witch;

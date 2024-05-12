import { IframeHTMLAttributes } from "react";

const Game = () => {
  return (
    <div>
      <iframe sandbox="cross-origin-isolated allow-same-origin allow-scripts" allow="cross-origin-isolated allow-same-origin allow-scripts" src="./game/index.html" width="100%" height="600" style={{ border: 'none' }}></iframe>
    </div>
  );
};

export default Game;

import React from "react";

import "./tile.css";

const Tile = ({ type, pieceChar, symbol, onClick }) => {
  return (
    <div className={type} onClick={onClick}>
      <div className={pieceChar}>{symbol}</div>
    </div>
  );
};

export { Tile };
export default Tile;

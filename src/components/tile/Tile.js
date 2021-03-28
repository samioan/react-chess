import React from "react";

import "./tile.css";

const Tile = ({ type, color, symbol, onClick }) => {
  return (
    <div className={color}>
      <div className={"tile " + type} onClick={onClick}>
        <div>{symbol}</div>
      </div>
    </div>
  );
};

export { Tile };
export default Tile;

import React from "react";

import "./tile.css";

const Tile = ({ type, symbol, onClick }) => {
  return (
    <div className={"tile " + type} onClick={onClick}>
      <div>{symbol}</div>
    </div>
  );
};

export { Tile };
export default Tile;

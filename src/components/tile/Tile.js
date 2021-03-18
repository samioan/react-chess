import React from "react";

import Piece from "../piece";

import "./tile.css";

const Tile = ({ type, piece }) => {
  switch (type) {
    case "empty":
      return (
        <div className="tile empty">
          <Piece rank="" />
        </div>
      );
    case "full":
      return (
        <div className="tile full">
          <Piece rank={piece} />
        </div>
      );
    case "selected":
      return (
        <div className="tile selected">
          <Piece rank={piece} />
        </div>
      );
    case "move":
      return (
        <div className="tile move">
          <Piece rank={piece} />
        </div>
      );
    case "capture":
      return (
        <div className="tile capture">
          <Piece rank={piece} />
        </div>
      );
    default:
      return null;
  }
};

export { Tile };
export default Tile;

import React from "react";
import piecesCreator from "../../lib/piecesCreator";
import Tile from "../tile";

import "./board.css";

const tiles = Array(75).fill(null);

const Board = () => {
  return (
    <div className="board">
      {tiles.slice(0, 1).map(() => (
        <Tile type="full" piece={piecesCreator.blackRook} />
      ))}
      {tiles.slice(2, 3).map(() => (
        <Tile type="full" piece={piecesCreator.blackKnight} />
      ))}
      {tiles.slice(4, 5).map(() => (
        <Tile type="full" piece={piecesCreator.blackBishop} />
      ))}
      {tiles.slice(6, 7).map(() => (
        <Tile type="full" piece={piecesCreator.blackQueen} />
      ))}
      {tiles.slice(8, 9).map(() => (
        <Tile type="full" piece={piecesCreator.blackKing} />
      ))}
      {tiles.slice(10, 11).map(() => (
        <Tile type="full" piece={piecesCreator.blackBishop} />
      ))}
      {tiles.slice(12, 13).map(() => (
        <Tile type="full" piece={piecesCreator.blackKnight} />
      ))}
      {tiles.slice(14, 15).map(() => (
        <Tile type="full" piece={piecesCreator.blackRook} />
      ))}
      {tiles.slice(9, 17).map(() => (
        <Tile type="full" piece={piecesCreator.blackPawn} />
      ))}
      {tiles.slice(18, 50).map(() => (
        <Tile type="empty" />
      ))}
      {tiles.slice(51, 59).map(() => (
        <Tile type="full" piece={piecesCreator.whitePawn} />
      ))}
      {tiles.slice(60, 61).map(() => (
        <Tile type="full" piece={piecesCreator.whiteRook} />
      ))}
      {tiles.slice(62, 63).map(() => (
        <Tile type="full" piece={piecesCreator.whiteKnight} />
      ))}
      {tiles.slice(64, 65).map(() => (
        <Tile type="full" piece={piecesCreator.whiteBishop} />
      ))}
      {tiles.slice(66, 67).map(() => (
        <Tile type="full" piece={piecesCreator.whiteQueen} />
      ))}
      {tiles.slice(68, 69).map(() => (
        <Tile type="full" piece={piecesCreator.whiteKing} />
      ))}
      {tiles.slice(70, 71).map(() => (
        <Tile type="full" piece={piecesCreator.whiteBishop} />
      ))}
      {tiles.slice(72, 73).map(() => (
        <Tile type="full" piece={piecesCreator.whiteKnight} />
      ))}
      {tiles.slice(74, 75).map(() => (
        <Tile type="full" piece={piecesCreator.whiteRook} />
      ))}
    </div>
  );
};

export { Board };
export default Board;

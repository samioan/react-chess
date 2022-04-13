import {
  selectBishop,
  selectRook,
  selectKnight,
  selectPawn,
} from "../piecesMoves";

const createAllAvailableMoves = (pieces, pieceColor) => {
  const availableSelections = pieces
    .map((row) => row.filter((item) => item.color === pieceColor))
    .flat();

  availableSelections.forEach((item) => {
    if (item.rank === "pawn") {
      selectPawn(item, pieces).forEach((item) => {
        item.color = pieceColor;
        item.rank = "pawn";
        item.status = "idle";
        item.unicodeSymbol = pieceColor === "white" ? "9817" : "9823";
      });
    }
    if (item.rank === "rook") {
      selectRook(item, pieces).forEach((item) => {
        item.color = pieceColor;
        item.rank = "rook";
        item.status = "idle";
        item.unicodeSymbol = pieceColor === "white" ? "9814" : "9820";
      });
    }
    if (item.rank === "knight") {
      selectKnight(item, pieces).forEach((item) => {
        item.color = pieceColor;
        item.rank = "knight";
        item.status = "idle";
        item.unicodeSymbol = pieceColor === "white" ? "9816" : "9822";
      });
    }
    if (item.rank === "bishop") {
      selectBishop(item, pieces).forEach((item) => {
        item.color = pieceColor;
        item.rank = "bishop";
        item.status = "idle";
        item.unicodeSymbol = pieceColor === "white" ? "9815" : "9821";
      });
    }
    if (item.rank === "queen") {
      selectRook(item, pieces).forEach((item) => {
        item.color = pieceColor;
        item.rank = "queen";
        item.status = "idle";
        item.unicodeSymbol = pieceColor === "white" ? "9813" : "9819";
      });
      selectBishop(item, pieces).forEach((item) => {
        item.color = pieceColor;
        item.rank = "queen";
        item.status = "idle";
        item.unicodeSymbol = pieceColor === "white" ? "9813" : "9819";
      });
    }
  });

  return pieces;
};

export { createAllAvailableMoves };
export default createAllAvailableMoves;

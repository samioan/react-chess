const pawnMoves = (piecesArray, pieceIndex, piece) => {
  const pawnMovesIndexes = [
    piecesArray[pieceIndex - 8],
    piecesArray[pieceIndex + 8],
  ];

  switch (piece[2].slice(0, 1)) {
    case "w":
      if (
        pawnMovesIndexes[0] !== undefined &&
        (pawnMovesIndexes[0][1] === "empty" ||
          pawnMovesIndexes[0][2].charAt(0) !== piece[2].charAt(0))
      ) {
        pawnMovesIndexes[0].splice(1, 1, "move");
      }
      break;
    case "b":
      if (
        pawnMovesIndexes[1] !== undefined &&
        (pawnMovesIndexes[1][1] === "empty" ||
          pawnMovesIndexes[1][2].charAt(0) !== piece[2].charAt(0))
      ) {
        pawnMovesIndexes[1].splice(1, 1, "move");
      }
      break;
    default:
  }
};

export { pawnMoves };
export default pawnMoves;

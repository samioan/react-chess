const pawnMoves = (piecesArray, pieceIndex, piece) => {
  const whitePawnMovesIndexes = [
    piecesArray[pieceIndex - 7],
    piecesArray[pieceIndex - 8],
    piecesArray[pieceIndex - 9],
  ];
  const blackPawnMovesIndexes = [
    piecesArray[pieceIndex + 7],
    piecesArray[pieceIndex + 8],
    piecesArray[pieceIndex + 9],
  ];

  const selectedPawnLetter = piece[2].slice(0, 1);

  switch (selectedPawnLetter) {
    case "w":
      whitePawnMovesIndexes.forEach((item) => {
        if (item !== undefined) {
          if (item[0][0] === piece[0][0]) {
            if (item.length === 3) {
              item.splice(1, 1, "move");
            }
          } else if (
            item.length === 4 &&
            item[2].charAt(0) === "b" &&
            item[0][1] !== piece[0][1]
          ) {
            item.splice(1, 1, "move");
          }
        }
      });
      break;
    case "b":
      blackPawnMovesIndexes.forEach((item) => {
        if (item !== undefined) {
          if (item[0][0] === piece[0][0]) {
            if (item.length === 3) {
              item.splice(1, 1, "move");
            }
          } else if (
            item.length === 4 &&
            item[2].charAt(0) === "w" &&
            item[0][1] !== piece[0][1]
          ) {
            item.splice(1, 1, "move");
          }
        }
      });
      break;
    default:
  }
};

export { pawnMoves };
export default pawnMoves;

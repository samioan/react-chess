const knightMoves = (piecesArray, pieceIndex, piece) => {
  const knightMoves = [
    piecesArray[pieceIndex - 15],
    piecesArray[pieceIndex - 17],
    piecesArray[pieceIndex - 6],
    piecesArray[pieceIndex - 10],
    piecesArray[pieceIndex + 15],
    piecesArray[pieceIndex + 17],
    piecesArray[pieceIndex + 6],
    piecesArray[pieceIndex + 10],
  ];

  const columns = ["A", "B", "C", "D", "E", "F", "G", "H"];

  knightMoves
    .filter(
      (item) =>
        item !== undefined &&
        (item[1] === "empty" || item[2].charAt(0) !== piece[2].charAt(0))
    )
    .filter(
      (item) =>
        columns.indexOf(piece[0].charAt(0)) + 2 >=
          columns.indexOf(item[0].charAt(0)) &&
        columns.indexOf(item[0].charAt(0)) >=
          columns.indexOf(piece[0].charAt(0)) - 2
    )
    .forEach((item) => {
      item.splice(1, 1, "move");
    });
};

export { knightMoves };
export default knightMoves;

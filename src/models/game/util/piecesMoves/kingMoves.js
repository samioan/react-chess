const kingMoves = (piecesArray, pieceIndex, piece) => {
  const kingMoves = [
    piecesArray[pieceIndex - 1],
    piecesArray[pieceIndex + 1],
    piecesArray[pieceIndex - 7],
    piecesArray[pieceIndex + 7],
    piecesArray[pieceIndex - 8],
    piecesArray[pieceIndex + 8],
    piecesArray[pieceIndex - 9],
    piecesArray[pieceIndex + 9],
  ];

  const columns = ["A", "B", "C", "D", "E", "F", "G", "H"];

  kingMoves
    .filter(
      (item) =>
        item !== undefined &&
        (item[1] === "empty" || item[2].charAt(0) !== piece[2].charAt(0))
    )
    .filter(
      (item) =>
        columns.indexOf(piece[0].charAt(0)) + 1 >=
          columns.indexOf(item[0].charAt(0)) &&
        columns.indexOf(item[0].charAt(0)) >=
          columns.indexOf(piece[0].charAt(0)) - 1
    )
    .forEach((item) => {
      item.splice(1, 1, "move");
    });
};

export { kingMoves };
export default kingMoves;

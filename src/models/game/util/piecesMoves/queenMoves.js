const queenMoves = (piecesArray, pieceIndex, piece) => {
  const queenMoves = [
    ...piecesArray.filter(
      (item) =>
        (piecesArray.indexOf(item) - pieceIndex) % 9 === 0 ||
        (piecesArray.indexOf(item) - pieceIndex) % 7 === 0
    ),
    ...piecesArray.filter(
      (item) =>
        (piecesArray.indexOf(item) - pieceIndex) % 8 === 0 ||
        (piecesArray.indexOf(item) - pieceIndex > 0 &&
          piecesArray.indexOf(item) - pieceIndex < 8) ||
        (piecesArray.indexOf(item) - pieceIndex < 0 &&
          piecesArray.indexOf(item) - pieceIndex > -8)
    ),
  ];

  const columns = ["A", "B", "C", "D", "E", "F", "G", "H"];

  queenMoves
    .filter(
      (item) =>
        item !== undefined &&
        (item[1] === "empty" || item[2].charAt(0) !== piece[2].charAt(0))
    )
    .filter(
      (item) =>
        (piecesArray.indexOf(item) - pieceIndex) % 8 === 0 ||
        (piecesArray.indexOf(item) - pieceIndex > 0 &&
          piecesArray.indexOf(item) - pieceIndex < 8 &&
          columns.indexOf(piece[0].charAt(0)) <
            columns.indexOf(item[0].charAt(0))) ||
        (piecesArray.indexOf(item) - pieceIndex < 0 &&
          piecesArray.indexOf(item) - pieceIndex > -8 &&
          columns.indexOf(piece[0].charAt(0)) >
            columns.indexOf(item[0].charAt(0))) ||
        (pieceIndex > piecesArray.indexOf(item) &&
          (piecesArray.indexOf(item) - pieceIndex) % 7 === 0 &&
          columns.indexOf(piece[0].charAt(0)) <
            columns.indexOf(item[0].charAt(0))) ||
        (pieceIndex > piecesArray.indexOf(item) &&
          (piecesArray.indexOf(item) - pieceIndex) % 9 === 0 &&
          columns.indexOf(piece[0].charAt(0)) >
            columns.indexOf(item[0].charAt(0))) ||
        (pieceIndex < piecesArray.indexOf(item) &&
          (piecesArray.indexOf(item) - pieceIndex) % 7 === 0 &&
          columns.indexOf(piece[0].charAt(0)) >
            columns.indexOf(item[0].charAt(0))) ||
        (pieceIndex < piecesArray.indexOf(item) &&
          (piecesArray.indexOf(item) - pieceIndex) % 9 === 0 &&
          columns.indexOf(piece[0].charAt(0)) <
            columns.indexOf(item[0].charAt(0)))
    )
    .forEach((item) => {
      item.splice(1, 1, "move");
    });
};

export { queenMoves };
export default queenMoves;

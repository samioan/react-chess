const bishopMoves = (piecesArray, pieceIndex, piece) => {
  const bishopMoves = piecesArray.filter(
    (item) =>
      (piecesArray.indexOf(item) - pieceIndex) % 9 === 0 ||
      (piecesArray.indexOf(item) - pieceIndex) % 7 === 0
  );

  const columns = ["A", "B", "C", "D", "E", "F", "G", "H"];

  bishopMoves
    .filter(
      (item) =>
        item !== undefined &&
        (item[1] === "empty" || item[2].charAt(0) !== piece[2].charAt(0))
    )
    .filter(
      (item) =>
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

export { bishopMoves };
export default bishopMoves;

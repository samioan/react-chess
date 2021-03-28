const rookMoves = (piecesArray, pieceIndex, piece) => {
  const rookMoves = piecesArray.filter(
    (item) =>
      (piecesArray.indexOf(item) - pieceIndex) % 8 === 0 ||
      (piecesArray.indexOf(item) - pieceIndex > 0 &&
        piecesArray.indexOf(item) - pieceIndex < 8) ||
      (piecesArray.indexOf(item) - pieceIndex < 0 &&
        piecesArray.indexOf(item) - pieceIndex > -8)
  );

  const columns = ["A", "B", "C", "D", "E", "F", "G", "H"];

  rookMoves
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
            columns.indexOf(item[0].charAt(0)))
    )
    .forEach((item) => {
      item.splice(1, 1, "move");
    });
};

export { rookMoves };
export default rookMoves;

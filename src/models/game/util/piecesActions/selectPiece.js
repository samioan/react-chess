const selectPiece = (piece, pieces) => {
  pieces.forEach((row) =>
    row.forEach((item) => {
      if (item.status === "selected" || item.status === "move") {
        if (item.rank) {
          item.status = "idle";
        } else {
          item.status = null;
        }
      }
    })
  );

  piece.status = "selected";
};

export { selectPiece };
export default selectPiece;

const deselectPiece = (piece, pieces) => {
  piece.status = "idle";
  pieces.forEach((row) =>
    row.forEach((item) => {
      if (item.status === "move") {
        if (item.rank) {
          item.status = "idle";
        } else {
          delete item["status"];
        }
      }
    })
  );
};

export { deselectPiece };
export default deselectPiece;

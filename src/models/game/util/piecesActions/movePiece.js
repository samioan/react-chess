const movePiece = (piece, pieces) => {
  const selectedPiece = pieces
    .map((row) => row.find((item) => item.status === "selected"))
    .filter((item) => item !== undefined)[0];

  piece.color = selectedPiece.color;
  piece.rank = selectedPiece.rank;
  piece.status = "idle";
  piece.unicodeSymbol = selectedPiece.unicodeSymbol;

  delete selectedPiece["color"];
  delete selectedPiece["rank"];
  delete selectedPiece["status"];
  delete selectedPiece["unicodeSymbol"];
};

export { movePiece };
export default movePiece;

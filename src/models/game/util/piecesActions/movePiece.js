const movePiece = (piece, pieces) => {
  const selectedPiece = pieces
    .map((row) => row.find((item) => item.status === "selected"))
    .filter((item) => item !== undefined)[0];

  piece.color = selectedPiece.color;
  piece.rank = selectedPiece.rank;
  piece.status = "idle";
  piece.unicodeSymbol = selectedPiece.unicodeSymbol;

  selectedPiece.color = null;
  selectedPiece.rank = null;
  selectedPiece.status = null;
  selectedPiece.unicodeSymbol = null;
};

export { movePiece };
export default movePiece;

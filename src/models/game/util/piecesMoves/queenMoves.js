import bishopMoves from "./bishopMoves";
import rookMoves from "./rookMoves";

const queenMoves = (piecesArray, pieceIndex, piece) => {
  const queenBishopMoves = bishopMoves(piecesArray, pieceIndex, piece);
  const queenRookMoves = rookMoves(piecesArray, pieceIndex, piece);

  const queenMoves = [...queenBishopMoves, ...queenRookMoves].forEach(
    (item) => {
      item.splice(1, 1, "move");
    }
  );
  return queenMoves;
};

export { queenMoves };
export default queenMoves;

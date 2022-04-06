import bishopMoves from "./bishopMoves";
import rookMoves from "./rookMoves";

const checkmate = (piecesArray, pieceIndex, piece) => {
  const queenBishopMoves = bishopMoves(piecesArray, pieceIndex, piece);
  const queenRookMoves = rookMoves(piecesArray, pieceIndex, piece);

  return [...queenBishopMoves, ...queenRookMoves];
};

export { checkmate };
export default checkmate;

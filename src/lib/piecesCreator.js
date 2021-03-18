const pieces = Array(12)
  .fill("98")
  .map((piece, index) => String.fromCharCode(piece + (index + 12)));

const piecesCreator = {
  whiteKing: pieces[0],
  whiteQueen: pieces[1],
  whiteRook: pieces[2],
  whiteBishop: pieces[3],
  whiteKnight: pieces[4],
  whitePawn: pieces[5],
  blackKing: pieces[6],
  blackQueen: pieces[7],
  blackRook: pieces[8],
  blackBishop: pieces[9],
  blackKnight: pieces[10],
  blackPawn: pieces[11],
};

export { piecesCreator };
export default piecesCreator;

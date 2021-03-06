const piecesCreator = () => {
  const piecesCharacters = Array(12)
    .fill("98")
    .map((piece, index) => String.fromCharCode(piece + (index + 12)));

  const piecesNames = [
    "whiteKing",
    "whiteQueen",
    "whiteRook",
    "whiteBishop",
    "whiteKnight",
    "whitePawn",
    "blackKing",
    "blackQueen",
    "blackRook",
    "blackBishop",
    "blackKnight",
    "blackPawn",
  ];

  const pieces = [
    ...piecesCharacters.map((x) => [
      piecesNames[piecesCharacters.indexOf(x)],
      x,
    ]),
  ];

  const reservePieces = [
    pieces[0],
    pieces[1],
    ...Array(2).fill(pieces[2]),
    ...Array(2).fill(pieces[3]),
    ...Array(2).fill(pieces[4]),
    ...Array(8).fill(pieces[5]),
    pieces[6],
    pieces[7],
    ...Array(2).fill(pieces[8]),
    ...Array(2).fill(pieces[9]),
    ...Array(2).fill(pieces[10]),
    ...Array(8).fill(pieces[11]),
  ];

  return reservePieces;
};

export { piecesCreator };
export default piecesCreator;

const piecesCharacters = Array(12)
  .fill("98")
  .map((piece, index) => String.fromCharCode(piece + (index + 12)));

const piecesNames = [
  "WhiteKing",
  "WhiteQueen",
  "WhiteRook",
  "WhiteBishop",
  "WhiteKnight",
  "WhitePawn",
  "BlackKing",
  "BlackQueen",
  "BlackRook",
  "BlackBishop",
  "BlackKnight",
  "BlackPawn",
];

const pieces = [
  ...piecesCharacters.map((x) => [piecesNames[piecesCharacters.indexOf(x)], x]),
];

const piecesCreator = [];

for (let i = 0; i <= 12; i++) {
  if (i === 5 || i === 11) {
    piecesCreator.push(
      pieces[i],
      pieces[i],
      pieces[i],
      pieces[i],
      pieces[i],
      pieces[i],
      pieces[i],
      pieces[i]
    );
  }
  if ((i > 1 && i < 5) || (i > 7 && i < 11)) {
    piecesCreator.push(pieces[i], pieces[i]);
  }
  if (i === 0 || i === 1 || i === 6 || i === 7) {
    piecesCreator.push(pieces[i]);
  }
}

export { piecesCreator };
export default piecesCreator;

import {
  blackKing,
  blackQueen,
  blackRook,
  blackBishop,
  blackKnight,
  blackPawn,
  whiteKing,
  whiteQueen,
  whiteRook,
  whiteBishop,
  whiteKnight,
  whitePawn,
} from "../../constants/pieces";

const placePiecesOnBoard = (board) => {
  const blackBackRow = [
    blackRook,
    blackKnight,
    blackBishop,
    blackQueen,
    blackKing,
    blackBishop,
    blackKnight,
    blackRook,
  ];

  const blackFrontRow = Array(8).fill(blackPawn);

  const whiteBackRow = [
    whiteRook,
    whiteKnight,
    whiteBishop,
    whiteQueen,
    whiteKing,
    whiteBishop,
    whiteKnight,
    whiteRook,
  ];

  const whiteFrontRow = Array(8).fill(whitePawn);

  board[0].forEach(
    (item, index) => (board[0][index] = { ...item, ...blackBackRow[index] })
  );

  board[1].forEach(
    (item, index) => (board[1][index] = { ...item, ...blackFrontRow[index] })
  );

  board[6].forEach(
    (item, index) => (board[6][index] = { ...item, ...whiteFrontRow[index] })
  );

  board[7].forEach(
    (item, index) => (board[7][index] = { ...item, ...whiteBackRow[index] })
  );

  return board;
};

export { placePiecesOnBoard };
export default placePiecesOnBoard;

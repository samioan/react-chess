import {
  BLACK_KING,
  BLACK_QUEEN,
  BLACK_ROOK,
  BLACK_BISHOP,
  BLACK_KNIGHT,
  BLACK_PAWN,
  WHITE_KING,
  WHITE_QUEEN,
  WHITE_ROOK,
  WHITE_BISHOP,
  WHITE_KNIGHT,
  WHITE_PAWN,
  EMPTY_TILE,
  TILE_STATUS,
} from "reference-data";

const createBoard = (() => {
  const initialPieces = [
    [
      BLACK_ROOK,
      BLACK_KNIGHT,
      BLACK_BISHOP,
      BLACK_QUEEN,
      BLACK_KING,
      BLACK_BISHOP,
      BLACK_KNIGHT,
      BLACK_ROOK,
    ],
    Array(8).fill(BLACK_PAWN),
    Array(8).fill(EMPTY_TILE),
    Array(8).fill(EMPTY_TILE),
    Array(8).fill(EMPTY_TILE),
    Array(8).fill(EMPTY_TILE),
    Array(8).fill(WHITE_PAWN),
    [
      WHITE_ROOK,
      WHITE_KNIGHT,
      WHITE_BISHOP,
      WHITE_QUEEN,
      WHITE_KING,
      WHITE_BISHOP,
      WHITE_KNIGHT,
      WHITE_ROOK,
    ],
  ];

  const board = initialPieces.map((row) =>
    row.map((item, index) => ({
      id: `${String.fromCharCode(97 + index)}${
        initialPieces.length - initialPieces.indexOf(row)
      }`,
      position: `${initialPieces.indexOf(row)}${index}`,
      status: TILE_STATUS.NOT_SELECTED,
      ...item,
    }))
  );

  return board;
})();

export { createBoard };
export default createBoard;

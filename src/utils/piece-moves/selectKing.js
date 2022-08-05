import flatten from "lodash/flatten";
import {
  TILE_ROW,
  TILE_COLUMN,
  TILE_STATUS,
  RANK,
  SPECIAL_STATUS,
} from "reference-data";

const selectKing = (
  selectedPiece,
  pieces,
  kingIsInCheck,
  kingsideInCheck,
  queensideInCheck
) => {
  const playerRooks = flatten(pieces)
    .filter(
      ({ rank, color, moved }) =>
        rank === RANK.ROOK && color === selectedPiece.color && !moved
    )
    .map(({ position }) => position);

  const kingMoves = [
    // regular moves
    `${TILE_ROW(selectedPiece) + 1}${TILE_COLUMN(selectedPiece)}`,
    `${TILE_ROW(selectedPiece) + 1}${TILE_COLUMN(selectedPiece) + 1}`,
    `${TILE_ROW(selectedPiece) + 1}${TILE_COLUMN(selectedPiece) - 1}`,
    `${TILE_ROW(selectedPiece)}${TILE_COLUMN(selectedPiece) + 1}`,
    `${TILE_ROW(selectedPiece)}${TILE_COLUMN(selectedPiece) - 1}`,
    `${TILE_ROW(selectedPiece) - 1}${TILE_COLUMN(selectedPiece)}`,
    `${TILE_ROW(selectedPiece) - 1}${TILE_COLUMN(selectedPiece) + 1}`,
    `${TILE_ROW(selectedPiece) - 1}${TILE_COLUMN(selectedPiece) - 1}`,
    // castling moves
    // kingside
    ...(playerRooks?.includes(
      `${TILE_ROW(selectedPiece)}${TILE_COLUMN(selectedPiece) + 3}`
    ) &&
    !selectedPiece.moved &&
    !pieces[TILE_ROW(selectedPiece)][TILE_COLUMN(selectedPiece) + 1].rank &&
    !kingIsInCheck &&
    !kingsideInCheck
      ? [`${TILE_ROW(selectedPiece)}${TILE_COLUMN(selectedPiece) + 2}`]
      : []),
    // queenside
    ...(playerRooks?.includes(
      `${TILE_ROW(selectedPiece)}${TILE_COLUMN(selectedPiece) - 4}`
    ) &&
    !selectedPiece.moved &&
    !pieces[TILE_ROW(selectedPiece)][TILE_COLUMN(selectedPiece) - 1].rank &&
    !pieces[TILE_ROW(selectedPiece)][TILE_COLUMN(selectedPiece) - 3].rank &&
    !kingIsInCheck &&
    !queensideInCheck
      ? [`${TILE_ROW(selectedPiece)}${TILE_COLUMN(selectedPiece) - 2}`]
      : []),
  ];

  return pieces.map((row) =>
    row.map((boardPiece) =>
      kingMoves.includes(boardPiece.position) &&
      boardPiece.color !== selectedPiece.color
        ? {
            ...boardPiece,
            status: TILE_STATUS.MOVE,
            specialStatus: (() => {
              if (
                boardPiece.position ===
                `${TILE_ROW(selectedPiece)}${TILE_COLUMN(selectedPiece) + 2}`
              ) {
                return SPECIAL_STATUS.KINGSIDE_CASTLING;
              }
              if (
                boardPiece.position ===
                `${TILE_ROW(selectedPiece)}${TILE_COLUMN(selectedPiece) - 2}`
              ) {
                return SPECIAL_STATUS.QUEENSIDE_CASTLING;
              }
              return null;
            })(),
          }
        : boardPiece
    )
  );
};

export { selectKing };
export default selectKing;

import {
  TILE_ROW,
  TILE_COLUMN,
  PLAYER_COLOR,
  TILE_STATUS,
  SPECIAL_STATUS,
} from "reference-data";

const selectPawn = (selectedPiece, pieces) => {
  const moveModifier = selectedPiece.color === PLAYER_COLOR.WHITE ? -1 : +1;
  const initialRow = selectedPiece.color === PLAYER_COLOR.WHITE ? 6 : 1;

  const pawnMoves = [
    // regular moves
    ...(!pieces[TILE_ROW(selectedPiece) + moveModifier][
      TILE_COLUMN(selectedPiece)
    ]?.rank
      ? [
          `${TILE_ROW(selectedPiece) + moveModifier}${TILE_COLUMN(
            selectedPiece
          )}`,
        ]
      : []),
    ...(TILE_ROW(selectedPiece) === initialRow &&
    !pieces[TILE_ROW(selectedPiece) + moveModifier][TILE_COLUMN(selectedPiece)]
      ?.rank &&
    !pieces[TILE_ROW(selectedPiece) + moveModifier * 2][
      TILE_COLUMN(selectedPiece)
    ]?.rank
      ? [
          `${TILE_ROW(selectedPiece) + moveModifier * 2}${TILE_COLUMN(
            selectedPiece
          )}`,
        ]
      : []),
    // capture moves
    ...(pieces[TILE_ROW(selectedPiece) + moveModifier][
      TILE_COLUMN(selectedPiece) - 1
    ]?.rank &&
    pieces[TILE_ROW(selectedPiece) + moveModifier][
      TILE_COLUMN(selectedPiece) - 1
    ]?.color !== selectedPiece.color
      ? [
          `${TILE_ROW(selectedPiece) + moveModifier}${
            TILE_COLUMN(selectedPiece) - 1
          }`,
        ]
      : []),
    ...(pieces[TILE_ROW(selectedPiece) + moveModifier][
      TILE_COLUMN(selectedPiece) + 1
    ]?.rank &&
    pieces[TILE_ROW(selectedPiece) + moveModifier][
      TILE_COLUMN(selectedPiece) + 1
    ]?.color !== selectedPiece.color
      ? [
          `${TILE_ROW(selectedPiece) + moveModifier}${
            TILE_COLUMN(selectedPiece) + 1
          }`,
        ]
      : []),
    // en passant
    ...(pieces[TILE_ROW(selectedPiece)][TILE_COLUMN(selectedPiece) + 1]
      ?.specialStatus === SPECIAL_STATUS.EN_PASSANT &&
    !pieces[TILE_ROW(selectedPiece) + moveModifier][
      TILE_COLUMN(selectedPiece) + 1
    ].rank
      ? [
          `${TILE_ROW(selectedPiece) + moveModifier}${
            TILE_COLUMN(selectedPiece) + 1
          }`,
        ]
      : []),
    ...(pieces[TILE_ROW(selectedPiece)][TILE_COLUMN(selectedPiece) - 1]
      ?.specialStatus === SPECIAL_STATUS.EN_PASSANT &&
    !pieces[TILE_ROW(selectedPiece) + moveModifier][
      TILE_COLUMN(selectedPiece) - 1
    ].rank
      ? [
          `${TILE_ROW(selectedPiece) + moveModifier}${
            TILE_COLUMN(selectedPiece) - 1
          }`,
        ]
      : []),
  ];

  return pieces.map((row) =>
    row.map((boardPiece) =>
      pawnMoves.includes(boardPiece.position)
        ? {
            ...boardPiece,
            status: TILE_STATUS.MOVE,
            specialStatus:
              boardPiece.position ===
              `${TILE_ROW(selectedPiece) + moveModifier * 2}${TILE_COLUMN(
                selectedPiece
              )}`
                ? SPECIAL_STATUS.EN_PASSANT
                : boardPiece.specialStatus,
          }
        : boardPiece
    )
  );
};

export { selectPawn };
export default selectPawn;

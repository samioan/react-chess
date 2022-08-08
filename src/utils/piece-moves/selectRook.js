import {
  TILE_ROW,
  TILE_COLUMN,
  TILE_STATUS,
  PLAYER_COLOR,
} from "reference-data";
import flatten from "lodash/flatten";

const selectRook = (selectedPiece, pieces) => {
  const opponentColor =
    selectedPiece.color === PLAYER_COLOR.WHITE
      ? PLAYER_COLOR.BLACK
      : PLAYER_COLOR.WHITE;

  const topLine = Array(TILE_ROW(selectedPiece))
    .fill(null)
    .map((_, index) => ({
      position: `${index}${TILE_COLUMN(selectedPiece)}`,
      color: pieces[index][TILE_COLUMN(selectedPiece)].color,
    }))
    .reverse();

  const bottomLine = Array(7 - TILE_ROW(selectedPiece))
    .fill(null)
    .map((_, index) => ({
      position: `${TILE_ROW(selectedPiece) + 1 + index}${TILE_COLUMN(
        selectedPiece
      )}`,
      color:
        pieces[TILE_ROW(selectedPiece) + 1 + index][TILE_COLUMN(selectedPiece)]
          .color,
    }));

  const leftLine = Array(TILE_COLUMN(selectedPiece))
    .fill(null)
    .map((_, index) => ({
      position: `${TILE_ROW(selectedPiece)}${index}`,
      color: pieces[TILE_ROW(selectedPiece)][index].color,
    }))
    .reverse();

  const rightLine = Array(7 - TILE_COLUMN(selectedPiece))
    .fill(null)
    .map((_, index) => ({
      position: `${TILE_ROW(selectedPiece)}${
        TILE_COLUMN(selectedPiece) + 1 + index
      }`,
      color:
        pieces[TILE_ROW(selectedPiece)][TILE_COLUMN(selectedPiece) + 1 + index]
          .color,
    }));

  const rookMoves = flatten(
    [topLine, bottomLine, leftLine, rightLine].map((line) =>
      line.slice(
        0,
        line.indexOf(
          line.find(
            ({ color }) =>
              color === opponentColor || color === selectedPiece.color
          )
        ) + 1 || line.length
      )
    )
  ).map(({ position }) => position);

  return pieces.map((row) =>
    row.map((boardPiece) =>
      rookMoves.includes(boardPiece.position) &&
      boardPiece.color !== selectedPiece.color
        ? {
            ...boardPiece,
            status: TILE_STATUS.MOVE,
          }
        : boardPiece
    )
  );
};

export { selectRook };
export default selectRook;

import {
  TILE_ROW,
  TILE_COLUMN,
  TILE_STATUS,
  PLAYER_COLOR,
} from "reference-data";
import flatten from "lodash/flatten";

const selectBishop = (selectedPiece, pieces) => {
  const opponentColor =
    selectedPiece.color === PLAYER_COLOR.WHITE
      ? PLAYER_COLOR.BLACK
      : PLAYER_COLOR.WHITE;

  const topLeftLine = Array(7)
    .fill(null)
    .map(
      (_, index) =>
        `${TILE_ROW(selectedPiece) - 1 - index}${
          TILE_COLUMN(selectedPiece) - 1 - index
        }`
    );

  const topRightLine = Array(7)
    .fill(null)
    .map(
      (_, index) =>
        `${TILE_ROW(selectedPiece) - 1 - index}${
          TILE_COLUMN(selectedPiece) + 1 + index
        }`
    );

  const bottomLeftLine = Array(7)
    .fill(null)
    .map(
      (_, index) =>
        `${TILE_ROW(selectedPiece) + 1 + index}${
          TILE_COLUMN(selectedPiece) - 1 - index
        }`
    );

  const bottomRightLine = Array(7)
    .fill(null)
    .map(
      (_, index) =>
        `${TILE_ROW(selectedPiece) + 1 + index}${
          TILE_COLUMN(selectedPiece) + 1 + index
        }`
    );

  const bishopMoves = flatten(
    [topLeftLine, topRightLine, bottomLeftLine, bottomRightLine]
      .map((line) =>
        line
          .filter(
            (character) => character.length === 2 && Number(character) <= 77
          )
          .map((piecePosition) => ({
            position: piecePosition,
            color: pieces[piecePosition[0]][piecePosition[1]]?.color,
          }))
          .filter(({ color }) => color !== undefined)
      )
      .map((line) =>
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
      bishopMoves.includes(boardPiece.position) &&
      boardPiece.color !== selectedPiece.color
        ? {
            ...boardPiece,
            status: TILE_STATUS.MOVE,
          }
        : boardPiece
    )
  );
};

export { selectBishop };
export default selectBishop;

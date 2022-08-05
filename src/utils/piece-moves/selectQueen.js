import flatten from "lodash/flatten";
import { TILE_STATUS } from "reference-data";
import { selectBishop, selectRook } from "utils";

const selectQueen = (selectedPiece, pieces) => {
  const queenMoves = flatten([
    flatten(selectBishop(selectedPiece, pieces)),
    flatten(selectRook(selectedPiece, pieces)),
  ])
    .filter(({ status }) => status === TILE_STATUS.MOVE)
    .map(({ position }) => position);

  return pieces.map((row) =>
    row.map((boardPiece) =>
      queenMoves.includes(boardPiece.position)
        ? {
            ...boardPiece,
            status: TILE_STATUS.MOVE,
          }
        : boardPiece
    )
  );
};

export { selectQueen };
export default selectQueen;

import { TILE_ROW, TILE_COLUMN, TILE_STATUS } from "reference-data";

const selectKnight = (selectedPiece, pieces) => {
  const knightMoves = [
    `${TILE_ROW(selectedPiece) - 2}${TILE_COLUMN(selectedPiece) - 1}`,
    `${TILE_ROW(selectedPiece) - 2}${TILE_COLUMN(selectedPiece) + 1}`,
    `${TILE_ROW(selectedPiece) - 1}${TILE_COLUMN(selectedPiece) - 2}`,
    `${TILE_ROW(selectedPiece) - 1}${TILE_COLUMN(selectedPiece) + 2}`,
    `${TILE_ROW(selectedPiece) + 1}${TILE_COLUMN(selectedPiece) - 2}`,
    `${TILE_ROW(selectedPiece) + 1}${TILE_COLUMN(selectedPiece) + 2}`,
    `${TILE_ROW(selectedPiece) + 2}${TILE_COLUMN(selectedPiece) - 1}`,
    `${TILE_ROW(selectedPiece) + 2}${TILE_COLUMN(selectedPiece) + 1}`,
  ];

  return pieces.map((row) =>
    row.map((boardPiece) =>
      knightMoves.includes(boardPiece.position) &&
      boardPiece.color !== selectedPiece.color
        ? {
            ...boardPiece,
            status: TILE_STATUS.MOVE,
          }
        : boardPiece
    )
  );
};

export { selectKnight };
export default selectKnight;

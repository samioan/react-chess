import flatten from "lodash/flatten";
import { TILE_ROW, TILE_COLUMN, RANK } from "reference-data";

const castlingBoards = (pieces, playerColor) => {
  const king = flatten(pieces).find(
    ({ rank, color }) => rank === RANK.KING && color === playerColor
  );

  const kingside = pieces.map((row) =>
    row.map((piece) => {
      if (piece.position === `${TILE_ROW(king)}${TILE_COLUMN(king) + 1}`) {
        return {
          ...piece,
          color: playerColor,
          rank: RANK.KING,
        };
      }
      if (piece.position === `${TILE_ROW(king)}${TILE_COLUMN(king)}`) {
        return {
          ...piece,
          color: null,
          rank: null,
        };
      }
      return piece;
    })
  );

  const queenside = pieces.map((row) =>
    row.map((piece) => {
      if (piece.position === `${TILE_ROW(king)}${TILE_COLUMN(king) - 1}`) {
        return {
          ...piece,
          color: playerColor,
          rank: RANK.KING,
        };
      }
      if (piece.position === `${TILE_ROW(king)}${TILE_COLUMN(king)}`) {
        return {
          ...piece,
          color: null,
          rank: null,
        };
      }
      return piece;
    })
  );

  return {
    kingside,
    queenside,
  };
};

export { castlingBoards };
export default castlingBoards;

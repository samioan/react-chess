import {
  RANK,
  TILE_STATUS,
  PLAYER_COLOR,
  UNICODE_SYMBOL,
} from "reference-data";

const pawnPromotion = (pieces) => {
  const promotedPawns = [
    pieces[0].filter((boardPiece) => boardPiece.rank === RANK.PAWN),
    pieces[7].filter((boardPiece) => boardPiece.rank === RANK.PAWN),
  ];

  return pieces.map((row) =>
    row.map((boardPiece) => {
      if (promotedPawns[0].includes(boardPiece)) {
        return {
          ...boardPiece,
          color: PLAYER_COLOR.WHITE,
          rank: RANK.QUEEN,
          unicodeSymbol: UNICODE_SYMBOL.WHITE_QUEEN,
          status: TILE_STATUS.NOT_SELECTED,
        };
      }
      if (promotedPawns[1].includes(boardPiece)) {
        return {
          ...boardPiece,
          color: PLAYER_COLOR.BLACK,
          rank: RANK.QUEEN,
          unicodeSymbol: UNICODE_SYMBOL.BLACK_QUEEN,
          status: TILE_STATUS.NOT_SELECTED,
        };
      }
      return boardPiece;
    })
  );
};

export { pawnPromotion };
export default pawnPromotion;

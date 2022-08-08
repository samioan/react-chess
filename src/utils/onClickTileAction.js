import {
  TILE_STATUS,
  SELECTED_TILE,
  SPECIAL_STATUS,
  RANK,
  UNICODE_SYMBOL,
  PLAYER_COLOR,
  TILE_ROW,
  TILE_COLUMN,
} from "reference-data";

const onClickTileAction = (clickedTile, boardPieces) => {
  return boardPieces.map((row) =>
    row.map((piece) => ({
      ...piece,
      status:
        piece.id === clickedTile.id &&
        clickedTile.status === TILE_STATUS.NOT_SELECTED
          ? TILE_STATUS.SELECTED
          : TILE_STATUS.NOT_SELECTED,
      color: (() => {
        if (clickedTile.status === TILE_STATUS.MOVE) {
          if (
            (clickedTile.specialStatus === SPECIAL_STATUS.QUEENSIDE_CASTLING &&
              piece.position ===
                `${TILE_ROW(clickedTile)}${TILE_COLUMN(clickedTile) + 1}`) ||
            (clickedTile.specialStatus === SPECIAL_STATUS.KINGSIDE_CASTLING &&
              piece.position ===
                `${TILE_ROW(clickedTile)}${TILE_COLUMN(clickedTile) - 1}`) ||
            piece.id === clickedTile.id
          ) {
            return SELECTED_TILE(boardPieces)?.color;
          }
          if (
            (clickedTile.specialStatus === SPECIAL_STATUS.QUEENSIDE_CASTLING &&
              piece.position ===
                `${TILE_ROW(clickedTile)}${TILE_COLUMN(clickedTile) - 2}`) ||
            (clickedTile.specialStatus === SPECIAL_STATUS.KINGSIDE_CASTLING &&
              piece.position ===
                `${TILE_ROW(clickedTile)}${TILE_COLUMN(clickedTile) + 1}`) ||
            piece.id === SELECTED_TILE(boardPieces)?.id
          ) {
            return null;
          }
          if (
            SELECTED_TILE(boardPieces)?.rank === RANK.PAWN &&
            ((SELECTED_TILE(boardPieces)?.color === PLAYER_COLOR.WHITE &&
              piece.position ===
                `${TILE_ROW(clickedTile) + 1}${TILE_COLUMN(clickedTile)}`) ||
              (SELECTED_TILE(boardPieces)?.color === PLAYER_COLOR.BLACK &&
                piece.position ===
                  `${TILE_ROW(clickedTile) - 1}${TILE_COLUMN(clickedTile)}`))
          ) {
            return null;
          }
        }
        return piece.color;
      })(),
      rank: (() => {
        if (clickedTile.status === TILE_STATUS.MOVE) {
          if (
            (clickedTile.specialStatus === SPECIAL_STATUS.QUEENSIDE_CASTLING &&
              piece.position ===
                `${TILE_ROW(clickedTile)}${TILE_COLUMN(clickedTile) + 1}`) ||
            (clickedTile.specialStatus === SPECIAL_STATUS.KINGSIDE_CASTLING &&
              piece.position ===
                `${TILE_ROW(clickedTile)}${TILE_COLUMN(clickedTile) - 1}`)
          ) {
            return RANK.ROOK;
          }
          if (
            (clickedTile.specialStatus === SPECIAL_STATUS.QUEENSIDE_CASTLING &&
              piece.position ===
                `${TILE_ROW(clickedTile)}${TILE_COLUMN(clickedTile) - 2}`) ||
            (clickedTile.specialStatus === SPECIAL_STATUS.KINGSIDE_CASTLING &&
              piece.position ===
                `${TILE_ROW(clickedTile)}${TILE_COLUMN(clickedTile) + 1}`) ||
            piece.id === SELECTED_TILE(boardPieces)?.id
          ) {
            return null;
          }
          if (piece.id === clickedTile.id) {
            return SELECTED_TILE(boardPieces)?.rank;
          }
          if (
            SELECTED_TILE(boardPieces)?.rank === RANK.PAWN &&
            ((SELECTED_TILE(boardPieces)?.color === PLAYER_COLOR.WHITE &&
              piece.position ===
                `${TILE_ROW(clickedTile) + 1}${TILE_COLUMN(clickedTile)}`) ||
              (SELECTED_TILE(boardPieces)?.color === PLAYER_COLOR.BLACK &&
                piece.position ===
                  `${TILE_ROW(clickedTile) - 1}${TILE_COLUMN(clickedTile)}`))
          ) {
            return null;
          }
        }
        return piece.rank;
      })(),
      unicodeSymbol: (() => {
        if (clickedTile.status === TILE_STATUS.MOVE) {
          if (
            (clickedTile.specialStatus === SPECIAL_STATUS.QUEENSIDE_CASTLING &&
              piece.position ===
                `${TILE_ROW(clickedTile)}${TILE_COLUMN(clickedTile) + 1}`) ||
            (clickedTile.specialStatus === SPECIAL_STATUS.KINGSIDE_CASTLING &&
              piece.position ===
                `${TILE_ROW(clickedTile)}${TILE_COLUMN(clickedTile) - 1}`)
          ) {
            return SELECTED_TILE(boardPieces)?.color === PLAYER_COLOR.WHITE
              ? UNICODE_SYMBOL.WHITE_ROOK
              : UNICODE_SYMBOL.BLACK_ROOK;
          }
          if (
            (clickedTile.specialStatus === SPECIAL_STATUS.QUEENSIDE_CASTLING &&
              piece.position ===
                `${TILE_ROW(clickedTile)}${TILE_COLUMN(clickedTile) - 2}`) ||
            (clickedTile.specialStatus === SPECIAL_STATUS.KINGSIDE_CASTLING &&
              piece.position ===
                `${TILE_ROW(clickedTile)}${TILE_COLUMN(clickedTile) + 1}`) ||
            piece.id === SELECTED_TILE(boardPieces)?.id
          ) {
            return null;
          }
          if (piece.id === clickedTile.id) {
            return SELECTED_TILE(boardPieces).unicodeSymbol;
          }
          if (
            SELECTED_TILE(boardPieces)?.rank === RANK.PAWN &&
            ((SELECTED_TILE(boardPieces)?.color === PLAYER_COLOR.WHITE &&
              piece.position ===
                `${TILE_ROW(clickedTile) + 1}${TILE_COLUMN(clickedTile)}`) ||
              (SELECTED_TILE(boardPieces)?.color === PLAYER_COLOR.BLACK &&
                piece.position ===
                  `${TILE_ROW(clickedTile) - 1}${TILE_COLUMN(clickedTile)}`))
          ) {
            return null;
          }
        }
        return piece.unicodeSymbol;
      })(),
      ...(piece.id === clickedTile.id &&
        clickedTile.status === TILE_STATUS.MOVE && {
          moved: true,
        }),
      ...(piece.id !== clickedTile.id &&
        clickedTile.status === TILE_STATUS.MOVE &&
        piece.specialStatus === SPECIAL_STATUS.EN_PASSANT && {
          specialStatus: null,
        }),
    }))
  );
};

export { onClickTileAction };
export default onClickTileAction;

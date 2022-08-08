import flatten from "lodash/flatten";
import chunk from "lodash/chunk";
import { TILE_STATUS, PLAYER_COLOR, RANK, KING_STATUS } from "reference-data";
import {
  selectBishop,
  selectKing,
  selectKnight,
  selectPawn,
  selectQueen,
  selectRook,
} from "utils";

const checkmate = (pieces, playerColor) => {
  const opponentColor =
    playerColor === PLAYER_COLOR.WHITE
      ? PLAYER_COLOR.BLACK
      : PLAYER_COLOR.WHITE;

  // draws all opponent moves
  const checkMoves = (pieces) =>
    flatten(
      flatten(pieces)
        .filter(({ color }) => color === opponentColor)
        .map((piece) => {
          switch (piece.rank) {
            case RANK.BISHOP:
              return [...flatten(selectBishop(piece, pieces))];
            case RANK.KING:
              return [...flatten(selectKing(piece, pieces, true, true, true))];
            case RANK.KNIGHT:
              return [...flatten(selectKnight(piece, pieces))];
            case RANK.PAWN:
              return [...flatten(selectPawn(piece, pieces))];
            case RANK.QUEEN:
              return [...flatten(selectQueen(piece, pieces))];
            case RANK.ROOK:
              return [...flatten(selectRook(piece, pieces))];
            default:
              return piece;
          }
        })
    ).filter(({ status }) => status === TILE_STATUS.MOVE);

  // creates all possible player moves and turns each one into its own board including that move
  const allPossibleMoves = flatten(
    flatten(pieces)
      .filter(({ color }) => color === playerColor)
      .map((piece) => {
        switch (piece.rank) {
          case RANK.BISHOP:
            return [...flatten(selectBishop(piece, pieces))].map((piece) => ({
              ...piece,
              rank: RANK.BISHOP,
            }));
          case RANK.KNIGHT:
            return [...flatten(selectKnight(piece, pieces))].map((piece) => ({
              ...piece,
              rank: RANK.KNIGHT,
            }));
          case RANK.PAWN:
            return [...flatten(selectPawn(piece, pieces))].map((piece) => ({
              ...piece,
              rank: RANK.PAWN,
            }));
          case RANK.QUEEN:
            return [...flatten(selectQueen(piece, pieces))].map((piece) => ({
              ...piece,
              rank: RANK.QUEEN,
            }));
          case RANK.ROOK:
            return [...flatten(selectRook(piece, pieces))].map((piece) => ({
              ...piece,
              rank: RANK.ROOK,
            }));
          default:
            return piece;
        }
      })
  )
    .filter(({ status }) => status === TILE_STATUS.MOVE)
    .map((piece) =>
      chunk(
        [
          ...flatten(pieces)
            .map((boardPiece) =>
              !!boardPiece.rank &&
              boardPiece.rank !== RANK.KING &&
              boardPiece.color === playerColor
                ? { ...boardPiece, color: null, rank: null }
                : boardPiece
            )
            .map((boardPiece) =>
              boardPiece.id === piece.id
                ? { ...boardPiece, rank: piece.rank, color: playerColor }
                : boardPiece
            ),
        ],
        8
      )
    )
    .slice(1);

  // creates all player king's moves
  const playerKingMoves = flatten(
    selectKing(
      flatten(pieces).find(
        ({ rank, color }) => rank === RANK.KING && color === playerColor
      ),
      pieces,
      true,
      true,
      true
    )
  )
    .filter(({ status }) => status === TILE_STATUS.MOVE)
    .map((piece) =>
      chunk(
        [
          ...flatten(pieces)
            .map((boardPiece) =>
              !!boardPiece.rank &&
              boardPiece.rank === RANK.KING &&
              boardPiece.color === playerColor
                ? { ...boardPiece, color: null, rank: null }
                : boardPiece
            )
            .map((boardPiece) =>
              boardPiece.id === piece.id
                ? { ...boardPiece, rank: RANK.KING, color: playerColor }
                : boardPiece
            ),
        ],
        8
      )
    );

  // check and checkmate checks
  if (
    checkMoves(pieces).some(
      ({ rank, color }) => rank === RANK.KING && color === playerColor
    )
  ) {
    if (
      allPossibleMoves
        .map((board) =>
          checkMoves(board).some(
            ({ rank, color }) => rank === RANK.KING && color === playerColor
          )
        )
        .every(Boolean) &&
      playerKingMoves
        .map((board) =>
          checkMoves(board).some(
            ({ rank, color }) => rank === RANK.KING && color === playerColor
          )
        )
        .every(Boolean)
    ) {
      return KING_STATUS.CHECKMATE;
    }
    return KING_STATUS.CHECK;
  }

  return KING_STATUS.SAFE;
};

export { checkmate };
export default checkmate;

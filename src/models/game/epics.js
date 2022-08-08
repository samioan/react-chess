import { map, filter } from "rxjs/operators";
import { combineEpics, ofType } from "redux-observable";

import {
  choosePiece,
  moveCreated,
  pawnPromoted,
  kingChecked,
  kingCheckmated,
  playersTurn,
  boardPieces,
  previousMovePieces,
  lastPlayer,
} from "models/game";
import {
  selectPawn,
  selectKnight,
  selectRook,
  selectKing,
  selectBishop,
  selectQueen,
  pawnPromotion,
  checkmate,
  castlingBoards,
} from "utils";
import { TILE_STATUS, RANK, KING_STATUS } from "reference-data";

const createMoveEpic = (action$, state$) =>
  action$.pipe(
    ofType(choosePiece.type),
    filter(
      ({ payload }) =>
        payload.status === TILE_STATUS.NOT_SELECTED && !!payload.rank
    ),
    map(({ payload }) =>
      moveCreated({
        boardPieces: (() => {
          switch (payload.rank) {
            case RANK.PAWN:
              return selectPawn(payload, boardPieces(state$.value));
            case RANK.KNIGHT:
              return selectKnight(payload, boardPieces(state$.value));
            case RANK.ROOK:
              return selectRook(payload, boardPieces(state$.value));
            case RANK.BISHOP:
              return selectBishop(payload, boardPieces(state$.value));
            case RANK.QUEEN:
              return selectQueen(payload, boardPieces(state$.value));
            case RANK.KING:
              return selectKing(
                payload,
                boardPieces(state$.value),
                checkmate(
                  boardPieces(state$.value),
                  playersTurn(state$.value)
                ) === KING_STATUS.CHECK,
                checkmate(
                  castlingBoards(
                    boardPieces(state$.value),
                    playersTurn(state$.value)
                  ).kingside,
                  playersTurn(state$.value)
                ) === KING_STATUS.CHECK,
                checkmate(
                  castlingBoards(
                    boardPieces(state$.value),
                    playersTurn(state$.value)
                  ).queenside,
                  playersTurn(state$.value)
                ) === KING_STATUS.CHECK
              );
            default:
              return boardPieces(state$.value);
          }
        })(),
      })
    )
  );

const promotePawnEpic = (_, state$) =>
  state$.pipe(
    filter(
      () =>
        boardPieces(state$.value)[0].some(({ rank }) => rank === RANK.PAWN) ||
        boardPieces(state$.value)[7].some(({ rank }) => rank === RANK.PAWN)
    ),
    map(() =>
      pawnPromoted({
        boardPieces: pawnPromotion(boardPieces(state$.value)),
      })
    )
  );

const checkEpic = (action$, state$) =>
  action$.pipe(
    ofType(choosePiece.type),
    filter(({ payload }) => payload.status === TILE_STATUS.MOVE),
    map(() =>
      kingChecked({
        ...(checkmate(boardPieces(state$.value), lastPlayer(state$.value)) ===
        KING_STATUS.CHECK
          ? {
              boardPieces: previousMovePieces(state$.value),
              playersTurn: lastPlayer(state$.value),
              isCheckSnackbarOpen: true,
            }
          : {
              boardPieces: boardPieces(state$.value),
              playersTurn: playersTurn(state$.value),
              isCheckSnackbarOpen: false,
            }),
      })
    )
  );

const checkmateEpic = (action$, state$) =>
  action$.pipe(
    ofType(choosePiece.type),
    filter(({ payload }) => payload.status === TILE_STATUS.MOVE),
    filter(
      () =>
        checkmate(boardPieces(state$.value), playersTurn(state$.value)) ===
        KING_STATUS.CHECKMATE
    ),
    map(() =>
      kingCheckmated({
        isCheckmateModalOpen: true,
      })
    )
  );

export default combineEpics(
  createMoveEpic,
  promotePawnEpic,
  checkEpic,
  checkmateEpic
);

export { createMoveEpic, promotePawnEpic, checkEpic, checkmateEpic };

import { map, filter } from "rxjs/operators";
import { combineEpics, ofType } from "redux-observable";

import {
  startGame,
  boardCreated,
  choosePiece,
  pawnSelected,
  rookSelected,
  knightSelected,
  bishopSelected,
  queenSelected,
  kingSelected,
  pieceDeselected,
  pieceMoved,
  pawnPromoted,
  whiteKingChecked,
  blackKingChecked,
  gameResumed,
  moveStored,
  moveAddedToLog,
  moveDeletedFromLog,
  whiteKingCheckmated,
  blackKingCheckmated,
  playersTurn,
  boardPieces,
  previousMovePieces,
  lastPlayer,
  movesLog,
} from "../game";

import { createEmptyBoard, placePiecesOnBoard } from "./util/board";

import { selectPiece, deselectPiece, movePiece } from "./util/piecesActions";
import {
  selectPawn,
  selectKnight,
  selectRook,
  selectKing,
  selectBishop,
} from "./util/piecesMoves";
import {
  promotePawn,
  check,
  cleanPiecesStatus,
  createAllAvailableMoves,
  checkEachKingMove,
} from "./util/specialActions";

const createBoardEpic = (action$) =>
  action$.pipe(
    ofType(startGame.type),
    map(() => {
      const newBoardPieces = createEmptyBoard();

      placePiecesOnBoard(newBoardPieces);

      return boardCreated({
        playersTurn: "white",
        boardPieces: newBoardPieces,
        movesLog: [newBoardPieces],
      });
    })
  );

const selectPieceEpic = (action$, state$) =>
  action$.pipe(
    ofType(choosePiece.type),
    map((action$) => {
      const originalBoardPieces = boardPieces(state$.value).slice(0);

      const piece = action$.payload;

      switch (piece.status) {
        case "idle":
          cleanPiecesStatus(originalBoardPieces);
          selectPiece(piece, originalBoardPieces);

          if (piece.status === "selected") {
            switch (piece.rank) {
              case "pawn":
                selectPawn(piece, originalBoardPieces);

                return pawnSelected({
                  boardPieces: originalBoardPieces,
                });
              case "knight":
                selectKnight(piece, originalBoardPieces);

                return knightSelected({
                  boardPieces: originalBoardPieces,
                });
              case "rook":
                selectRook(piece, originalBoardPieces);

                return rookSelected({
                  boardPieces: originalBoardPieces,
                });
              case "bishop":
                selectBishop(piece, originalBoardPieces);

                return bishopSelected({
                  boardPieces: originalBoardPieces,
                });
              case "queen":
                selectRook(piece, originalBoardPieces);
                selectBishop(piece, originalBoardPieces);

                return queenSelected({
                  boardPieces: originalBoardPieces,
                });
              case "king":
                selectKing(piece, originalBoardPieces);

                return kingSelected({
                  boardPieces: originalBoardPieces,
                });
              default:
            }
          }
          break;
        case "selected":
          cleanPiecesStatus(originalBoardPieces);
          deselectPiece(piece);

          return pieceDeselected({
            boardPieces: originalBoardPieces,
          });

        case "move":
          movePiece(piece, originalBoardPieces);
          cleanPiecesStatus(originalBoardPieces);

          return pieceMoved({
            lastPlayer:
              playersTurn(state$.value) === "white" ? "black" : "white",
            boardPieces: originalBoardPieces,
          });
        default:
      }
    })
  );

const promotePawnEpic = (action$, state$) =>
  action$.pipe(
    ofType(pieceMoved.type),
    filter(
      (action$) =>
        action$.payload.boardPieces[0].some(
          (item) => item.color === "white" && item.rank === "pawn"
        ) ||
        action$.payload.boardPieces[7].some(
          (item) => item.color === "black" && item.rank === "pawn"
        )
    ),
    map(() => {
      const originalBoardPieces = boardPieces(state$.value).slice();

      promotePawn(originalBoardPieces);

      return pawnPromoted({
        boardPieces: originalBoardPieces,
      });
    })
  );

const checkEpic = (action$, state$) =>
  action$.pipe(
    ofType(pieceMoved.type),
    map(() => {
      const originalBoardPieces = boardPieces(state$.value).slice();

      if (check(originalBoardPieces, "white", "black")) {
        cleanPiecesStatus(originalBoardPieces);

        return whiteKingChecked({
          playersTurn: "white",
          boardPieces:
            lastPlayer(state$.value) === "black"
              ? previousMovePieces(state$.value)
              : originalBoardPieces,
        });
      }
      if (check(originalBoardPieces, "black", "white")) {
        cleanPiecesStatus(originalBoardPieces);

        return blackKingChecked({
          playersTurn: "black",
          boardPieces:
            lastPlayer(state$.value) === "white"
              ? previousMovePieces(state$.value)
              : originalBoardPieces,
        });
      }

      cleanPiecesStatus(originalBoardPieces);

      return gameResumed({
        playersTurn: playersTurn(state$.value) === "white" ? "black" : "white",
        boardPieces: originalBoardPieces,
      });
    })
  );

const storePreviousMoveEpic = (action$, state$) =>
  action$.pipe(
    ofType(gameResumed.type, blackKingChecked.type, whiteKingChecked.type),
    map(() => {
      const boardPiecesCopy = JSON.parse(
        JSON.stringify(boardPieces(state$.value))
      );

      return moveStored({
        previousMovePieces: boardPiecesCopy,
      });
    })
  );

const addMoveToLogEpic = (action$, state$) =>
  action$.pipe(
    ofType(gameResumed.type, blackKingChecked.type, whiteKingChecked.type),
    filter(() => playersTurn(state$.value) === lastPlayer(state$.value)),
    map(() => {
      const boardPiecesCopy = JSON.parse(
        JSON.stringify(boardPieces(state$.value))
      );

      return moveAddedToLog({
        movesLog: [...movesLog(state$.value), boardPiecesCopy],
      });
    })
  );

const deleteMoveFromLogEpic = (action$, state$) =>
  action$.pipe(
    ofType(moveAddedToLog.type),
    filter((action$) => action$.payload.movesLog.length > 10),
    map(() => {
      const slicedMovesLog = movesLog(state$.value).slice(
        1,
        movesLog(state$.value).length
      );

      return moveDeletedFromLog({
        movesLog: slicedMovesLog,
      });
    })
  );

const whiteCheckmateEpic = (action$, state$) =>
  action$.pipe(
    ofType(whiteKingChecked.type),
    map(() => {
      const originalBoardPieces = boardPieces(state$.value).slice();

      const boardPiecesCopy = JSON.parse(
        JSON.stringify(boardPieces(state$.value))
      );
      const secondBoardPiecesCopy = JSON.parse(
        JSON.stringify(boardPieces(state$.value))
      );

      const kingCheck = [];
      createAllAvailableMoves(boardPiecesCopy, "white");
      checkEachKingMove(secondBoardPiecesCopy, "white").forEach((item) => {
        if (check(item, "white", "black")) {
          kingCheck.push({ check: true });
        } else kingCheck.push({ check: false });
      });

      if (
        check(boardPiecesCopy, "white", "black") &&
        kingCheck.every((item) => item.check)
      ) {
        return whiteKingCheckmated({
          playersTurn: null,
          boardPieces: originalBoardPieces,
        });
      }

      return gameResumed({
        boardPieces: originalBoardPieces,
      });
    })
  );

const blackCheckmateEpic = (action$, state$) =>
  action$.pipe(
    ofType(blackKingChecked.type),
    map(() => {
      const originalBoardPieces = boardPieces(state$.value).slice();

      const boardPiecesCopy = JSON.parse(
        JSON.stringify(boardPieces(state$.value))
      );

      const secondBoardPiecesCopy = JSON.parse(
        JSON.stringify(boardPieces(state$.value))
      );

      const kingCheck = [];

      createAllAvailableMoves(boardPiecesCopy, "black");

      checkEachKingMove(secondBoardPiecesCopy, "black").forEach((item) => {
        if (check(item, "black", "white")) {
          kingCheck.push({ check: true });
        } else kingCheck.push({ check: false });
      });

      if (
        check(boardPiecesCopy, "black", "white") &&
        kingCheck.every((item) => item.check)
      ) {
        return blackKingCheckmated({
          playersTurn: null,
          boardPieces: originalBoardPieces,
        });
      }

      return gameResumed({
        boardPieces: originalBoardPieces,
      });
    })
  );

export default combineEpics(
  createBoardEpic,
  selectPieceEpic,
  promotePawnEpic,
  checkEpic,
  storePreviousMoveEpic,
  addMoveToLogEpic,
  deleteMoveFromLogEpic,
  whiteCheckmateEpic,
  blackCheckmateEpic
);

export {
  createBoardEpic,
  selectPieceEpic,
  promotePawnEpic,
  checkEpic,
  storePreviousMoveEpic,
  addMoveToLogEpic,
  deleteMoveFromLogEpic,
  whiteCheckmateEpic,
  blackCheckmateEpic,
};

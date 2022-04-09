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
  moveDeleted,
  playersTurn,
  boardPieces,
  movesLog,
  lastPlayer,
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
  checkmate,
  cleanPiecesStatus,
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

const checkmateEpic = (action$, state$) =>
  action$.pipe(
    ofType(pieceMoved.type),
    map(() => {
      const originalBoardPieces = boardPieces(state$.value).slice();

      if (checkmate(originalBoardPieces, "white", "black")) {
        cleanPiecesStatus(originalBoardPieces);

        return whiteKingChecked({
          playersTurn: "white",
          boardPieces:
            lastPlayer(state$.value) === "black"
              ? movesLog(state$.value)[movesLog(state$.value).length - 1]
              : originalBoardPieces,
        });
      }
      if (checkmate(originalBoardPieces, "black", "white")) {
        cleanPiecesStatus(originalBoardPieces);

        return blackKingChecked({
          playersTurn: "black",
          boardPieces:
            lastPlayer(state$.value) === "white"
              ? movesLog(state$.value)[movesLog(state$.value).length - 1]
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
        movesLog: [...movesLog(state$.value), boardPiecesCopy],
      });
    })
  );

const deletePreviousMoveEpic = (action$, state$) =>
  action$.pipe(
    ofType(moveStored.type),
    filter((action$) => action$.payload.movesLog.length > 10),
    map(() => {
      const newMovesLog = movesLog(state$.value).slice(
        1,
        movesLog(state$.value).length
      );

      return moveDeleted({
        movesLog: newMovesLog,
      });
    })
  );

export default combineEpics(
  createBoardEpic,
  selectPieceEpic,
  promotePawnEpic,
  checkmateEpic,
  storePreviousMoveEpic,
  deletePreviousMoveEpic
);

export {
  createBoardEpic,
  selectPieceEpic,
  promotePawnEpic,
  checkmateEpic,
  storePreviousMoveEpic,
  deletePreviousMoveEpic,
};

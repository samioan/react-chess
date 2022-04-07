import { map, filter } from "rxjs/operators";
import { combineEpics, ofType } from "redux-observable";

import { playersTurn, boardPieces, movesLog } from "./selectors";
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
} from "./actions";

import { createEmptyBoard, placePiecesOnBoard } from "./util/board";
import rookMoves from "./util/piecesMoves/rookMoves";
import knightMoves from "./util/piecesMoves/knightMoves";
import bishopMoves from "./util/piecesMoves/bishopMoves";
import queenMoves from "./util/piecesMoves/queenMoves";
import kingMoves from "./util/piecesMoves/kingMoves";

import { selectPiece, deselectPiece, movePiece } from "./util/piecesActions";
import { selectPawn, selectKnight } from "./util/piecesMoves";

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
          selectPiece(piece);

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
              default:
            }
          }
          break;
        case "selected":
          deselectPiece(piece, originalBoardPieces);

          return pieceDeselected({
            boardPieces: originalBoardPieces,
          });

        case "move":
          movePiece(piece, originalBoardPieces);
          deselectPiece(piece, originalBoardPieces);

          return pieceMoved({
            playersTurn:
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
        action$.payload.boardPieces
          .slice(0, 7)
          .toString()
          .includes("whitePawn") ||
        action$.payload.boardPieces
          .slice(56, 63)
          .toString()
          .includes("blackPawn")
    ),
    map(() => {
      const originalBoardPieces = boardPieces(state$.value).slice();

      originalBoardPieces.forEach((item) => {
        if (item[0][1] === "8" && item[2] === "whitePawn") {
          item.splice(2, 1, "whiteQueen");
          item.splice(3, 1, String.fromCharCode("9813"));
        }
        if (item[0][1] === "1" && item[2] === "blackPawn") {
          item.splice(2, 1, "blackQueen");
          item.splice(3, 1, String.fromCharCode("9819"));
        }
      });

      return pawnPromoted({
        boardPieces: originalBoardPieces,
      });
    })
  );

const selectRookEpic = (action$, state$) =>
  action$.pipe(
    ofType(choosePiece.type),
    filter(
      (action$) =>
        action$.payload[1] === "selected" &&
        action$.payload[2].slice(5, action$.payload[2].length) === "Rook"
    ),
    map((action$) => {
      const originalBoardPieces = boardPieces(state$.value).slice();
      const tile = action$.payload;
      const chosenPieceIndex = originalBoardPieces.indexOf(tile);

      rookMoves(originalBoardPieces, chosenPieceIndex, tile);

      return rookSelected({
        boardPieces: originalBoardPieces,
      });
    })
  );

const selectKnightEpic = (action$, state$) =>
  action$.pipe(
    ofType(choosePiece.type),
    filter(
      (action$) =>
        action$.payload[1] === "selected" &&
        action$.payload[2].slice(5, action$.payload[2].length) === "Knight"
    ),
    map((action$) => {
      const originalBoardPieces = boardPieces(state$.value).slice();
      const tile = action$.payload;
      const chosenPieceIndex = originalBoardPieces.indexOf(tile);

      knightMoves(originalBoardPieces, chosenPieceIndex, tile);

      return knightSelected({
        boardPieces: originalBoardPieces,
      });
    })
  );

const selectBishopEpic = (action$, state$) =>
  action$.pipe(
    ofType(choosePiece.type),
    filter(
      (action$) =>
        action$.payload[1] === "selected" &&
        action$.payload[2].slice(5, action$.payload[2].length) === "Bishop"
    ),
    map((action$) => {
      const originalBoardPieces = boardPieces(state$.value).slice();
      const tile = action$.payload;
      const chosenPieceIndex = originalBoardPieces.indexOf(tile);

      bishopMoves(originalBoardPieces, chosenPieceIndex, tile);

      return bishopSelected({
        boardPieces: originalBoardPieces,
      });
    })
  );

const selectQueenEpic = (action$, state$) =>
  action$.pipe(
    ofType(choosePiece.type),
    filter(
      (action$) =>
        action$.payload[1] === "selected" &&
        action$.payload[2].slice(5, action$.payload[2].length) === "Queen"
    ),
    map((action$) => {
      const originalBoardPieces = boardPieces(state$.value).slice();
      const tile = action$.payload;
      const chosenPieceIndex = originalBoardPieces.indexOf(tile);

      queenMoves(originalBoardPieces, chosenPieceIndex, tile);

      return queenSelected({
        boardPieces: originalBoardPieces,
      });
    })
  );

const selectKingEpic = (action$, state$) =>
  action$.pipe(
    ofType(choosePiece.type),
    filter(
      (action$) =>
        action$.payload[1] === "selected" &&
        action$.payload[2].slice(5, action$.payload[2].length) === "King"
    ),
    map((action$) => {
      const originalBoardPieces = boardPieces(state$.value).slice();
      const tile = action$.payload;
      const chosenPieceIndex = originalBoardPieces.indexOf(tile);

      kingMoves(originalBoardPieces, chosenPieceIndex, tile);

      return kingSelected({
        boardPieces: originalBoardPieces,
      });
    })
  );

export default combineEpics(
  createBoardEpic,
  selectPieceEpic,
  promotePawnEpic,
  selectRookEpic,
  selectKnightEpic,
  selectBishopEpic,
  selectQueenEpic,
  selectKingEpic
);

export {
  createBoardEpic,
  selectPieceEpic,
  promotePawnEpic,
  selectRookEpic,
  selectKnightEpic,
  selectBishopEpic,
  selectQueenEpic,
  selectKingEpic,
};

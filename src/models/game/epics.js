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

import { selectPiece, deselectPiece, movePiece } from "./util/piecesActions";
import {
  selectPawn,
  selectKnight,
  selectRook,
  selectKing,
  selectBishop,
} from "./util/piecesMoves";

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

export default combineEpics(createBoardEpic, selectPieceEpic, promotePawnEpic);

export { createBoardEpic, selectPieceEpic, promotePawnEpic };

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
import { promotePawn } from "./util/specialActions";

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

export default combineEpics(createBoardEpic, selectPieceEpic, promotePawnEpic);

export { createBoardEpic, selectPieceEpic, promotePawnEpic };

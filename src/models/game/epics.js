import { map, filter } from "rxjs/operators";
import { combineEpics, ofType } from "redux-observable";

import {
  playersTurn,
  reservePieces,
  playerPieces,
  aiPieces,
  boardPieces,
} from "./selectors";
import {
  startGame,
  boardCreated,
  piecesCreated,
  piecesSplit,
  piecesPlaced,
  choosePiece,
  pieceSelected,
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
  continueGame,
} from "./actions";

import piecesArranger from "./util/piecesArranger";
import boardCreator from "./util/boardCreator";
import piecesCreator from "./util/piecesCreator";
import pawnMoves from "./util/piecesMoves/pawnMoves";
import rookMoves from "./util/piecesMoves/rookMoves";
import knightMoves from "./util/piecesMoves/knightMoves";
import bishopMoves from "./util/piecesMoves/bishopMoves";
import queenMoves from "./util/piecesMoves/queenMoves";
import kingMoves from "./util/piecesMoves/kingMoves";
import checkmate from "./util/piecesMoves/checkmate";
import { deselectPiece, movePiece, selectPiece } from "./util/pieceSelection";

const createBoardEpic = (action$, state$) =>
  action$.pipe(
    ofType(startGame.type),
    map(() => {
      const newBoardPieces = boardCreator();
      const firstPlayer = "w";
      return boardCreated({
        playersTurn: firstPlayer,
        boardPieces: newBoardPieces,
      });
    })
  );

const createPiecesEpic = (action$, state$) =>
  action$.pipe(
    ofType(startGame.type),
    map(() => {
      const newReservePieces = piecesCreator();

      return piecesCreated({
        reservePieces: newReservePieces,
      });
    })
  );

const splitPiecesEpic = (action$, state$) =>
  action$.pipe(
    ofType(piecesCreated.type),
    map(() => {
      const newReservePieces = reservePieces(state$.value).slice();
      const newPlayerPieces = piecesArranger(newReservePieces.slice(0, 16))[1];
      const newAiPieces = piecesArranger(newReservePieces.slice(16, 32))[0];
      newReservePieces.splice(0, newReservePieces.length);

      return piecesSplit({
        reservePieces: newReservePieces,
        playerPieces: newPlayerPieces,
        aiPieces: newAiPieces,
      });
    })
  );

const placePiecesEpic = (action$, state$) =>
  action$.pipe(
    ofType(piecesSplit.type),
    map(() => {
      const originalBoardPieces = boardPieces(state$.value).slice();
      const newPlayerPieces = playerPieces(state$.value).slice();
      const newAiPieces = aiPieces(state$.value).slice();

      const playerBoardPieces = originalBoardPieces
        .slice(0, 16)
        .map((item, index) => [item, "full", newAiPieces[index]].flat());

      const aiBoardPieces = originalBoardPieces
        .slice(48, 64)
        .map((item, index) => [item, "full", newPlayerPieces[index]].flat());

      const emptyBoardPieces = originalBoardPieces
        .slice(16, 48)
        .map((item) => [item, "empty", ""].flat());

      const newBoardPieces = [
        ...playerBoardPieces,
        ...emptyBoardPieces,
        ...aiBoardPieces,
      ];

      newPlayerPieces.splice(0, newPlayerPieces.length);
      newAiPieces.splice(0, newAiPieces.length);

      return piecesPlaced({
        boardPieces: newBoardPieces,
        reservePieces: [newBoardPieces],
        playerPieces: newPlayerPieces,
        aiPieces: newAiPieces,
      });
    })
  );

const selectPieceEpic = (action$, state$) =>
  action$.pipe(
    ofType(choosePiece.type),
    filter((action$) => action$.payload[1] !== "empty"),
    map((action$) => {
      const originalBoardPieces = boardPieces(state$.value).slice(0);
      const originalReservePieces = reservePieces(state$.value).slice(0);
      const originalPlayersTurn = playersTurn(state$.value).slice();
      const blackTurn = "b";
      const whiteTurn = "w";
      const tile = action$.payload;

      switch (tile[1]) {
        case "full":
          if (tile[2][0] === originalPlayersTurn) {
            selectPiece(originalBoardPieces, tile);
          }
          return pieceSelected({
            boardPieces: originalBoardPieces,
          });
        case "selected":
          deselectPiece(originalBoardPieces);

          return pieceDeselected({
            boardPieces: originalBoardPieces,
          });

        case "move":
          originalReservePieces.push(boardPieces(state$.value));
          movePiece(originalBoardPieces, tile);

          return pieceMoved({
            playersTurn: originalPlayersTurn === "w" ? blackTurn : whiteTurn,
            boardPieces: originalBoardPieces,
            reservePieces: originalReservePieces,
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

const selectPawnEpic = (action$, state$) =>
  action$.pipe(
    ofType(choosePiece.type),
    filter(
      (action$) =>
        action$.payload[1] === "selected" &&
        action$.payload[2].slice(5, action$.payload[2].length) === "Pawn"
    ),
    map((action$) => {
      const originalBoardPieces = boardPieces(state$.value).slice();
      const tile = action$.payload;
      const chosenPieceIndex = originalBoardPieces.indexOf(tile);

      pawnMoves(originalBoardPieces, chosenPieceIndex, tile);

      return pawnSelected({
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

const checkEpic = (action$, state$) =>
  action$.pipe(
    ofType(pieceMoved.type),
    map(() => {
      const originalPlayersTurn = playersTurn(state$.value).slice();
      const originalBoardPieces = boardPieces(state$.value).slice();
      const tile =
        originalPlayersTurn === "w"
          ? originalBoardPieces.find((item) => item[2] === "blackKing")
          : originalBoardPieces.find((item) => item[2] === "whiteKing");
      const chosenPieceIndex = originalBoardPieces.indexOf(tile);

      const checkmateArray = checkmate(
        originalBoardPieces,
        chosenPieceIndex,
        tile
      );

      if (
        originalPlayersTurn === "b" &&
        checkmateArray?.some((item) => item.length === 4 && item[2][0] === "b")
      ) {
        return whiteKingChecked({
          boardPieces:
            (movePiece(originalBoardPieces, tile), originalBoardPieces),
        });
      }

      if (
        originalPlayersTurn === "w" &&
        checkmateArray?.some((item) => item.length === 4 && item[2][0] === "w")
      ) {
        return blackKingChecked({
          boardPieces:
            (movePiece(originalBoardPieces, tile), originalBoardPieces),
        });
      }
      return continueGame({
        boardPieces:
          (movePiece(originalBoardPieces, tile), originalBoardPieces),
      });
    })
  );

const returnWhiteMoveEpic = (action$, state$) =>
  action$.pipe(
    ofType(whiteKingChecked.type),
    map(() =>
      continueGame({
        playersTurn: "w",
        boardPieces: reservePieces(state$.value)[
          reservePieces(state$.value).length - 1
        ],
      })
    )
  );

export default combineEpics(
  createBoardEpic,
  createPiecesEpic,
  splitPiecesEpic,
  placePiecesEpic,
  selectPieceEpic,
  promotePawnEpic,
  selectPawnEpic,
  selectRookEpic,
  selectKnightEpic,
  selectBishopEpic,
  selectQueenEpic,
  selectKingEpic,
  checkEpic,
  returnWhiteMoveEpic
);

export {
  createBoardEpic,
  createPiecesEpic,
  splitPiecesEpic,
  placePiecesEpic,
  selectPieceEpic,
  promotePawnEpic,
  selectPawnEpic,
  selectRookEpic,
  selectKnightEpic,
  selectBishopEpic,
  selectQueenEpic,
  selectKingEpic,
  checkEpic,
  returnWhiteMoveEpic,
};

import { map } from "rxjs/operators";
import { combineEpics, ofType } from "redux-observable";

import {
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
  pieceUnselected,
  pieceMoved,
} from "./actions";

import piecesArranger from "./util/piecesArranger";
import boardCreator from "./util/boardCreator";
import piecesCreator from "./util/piecesCreator";

const createBoardEpic = (action$, state$) =>
  action$.pipe(
    ofType(startGame.type),
    map(() => {
      const newBoardPieces = boardCreator();

      return boardCreated({
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
        .map((item, index) => [item, "full", newPlayerPieces[index]].flat());

      const aiBoardPieces = originalBoardPieces
        .slice(48, 64)
        .map((item, index) => [item, "full", newAiPieces[index]].flat());

      const emptyBoardPieces = originalBoardPieces
        .slice(16, 48)
        .map((item) => [item, "empty"].flat());

      const newBoardPieces = [
        ...aiBoardPieces,
        ...emptyBoardPieces,
        ...playerBoardPieces,
      ];

      newPlayerPieces.splice(0, newPlayerPieces.length);
      newAiPieces.splice(0, newAiPieces.length);

      return piecesPlaced({
        boardPieces: newBoardPieces,
        playerPieces: newPlayerPieces,
        aiPieces: newAiPieces,
      });
    })
  );

const choosePieceEpic = (action$, state$) =>
  action$.pipe(
    ofType(choosePiece.type),
    map((action$) => {
      const originalBoardPieces = boardPieces(state$.value).slice();
      switch (action$.payload[1]) {
        case "full":
          originalBoardPieces.forEach((item) => {
            if (item[1] === "selected") {
              item.splice(1, 1, "full");
            }
            if (item[1] === "move") {
              item.splice(1, 1, "empty");
            }
          });
          action$.payload.splice(1, 1, "selected");
          switch (action$.payload[2]) {
            case "whitePawn":
              originalBoardPieces[
                originalBoardPieces.indexOf(action$.payload) - 8
              ].splice(1, 1, "move");
              break;
            case "whiteKnight":
              originalBoardPieces[
                originalBoardPieces.indexOf(action$.payload) - 15
              ].splice(1, 1, "move");
              break;
            default:
          }
          return pieceSelected({
            boardPieces: originalBoardPieces,
          });
        case "selected":
          originalBoardPieces.forEach((item) => {
            if (item[1] === "selected") {
              item.splice(1, 1, "full");
            }
            if (item[1] === "move") {
              item.splice(1, 1, "empty");
            }
          });
          return pieceUnselected({
            boardPieces: originalBoardPieces,
          });
        case "move":
          originalBoardPieces.forEach((item) => {
            if (item[1] === "selected") {
              action$.payload.splice(1, 1, "full");
              action$.payload.splice(2, 1, item[2]);
              action$.payload.splice(3, 1, item[3]);
              item.splice(1, 1, "empty");
              item.splice(2, 1);
              item.splice(3, 1);
            }
          });
          return pieceMoved({
            boardPieces: originalBoardPieces,
          });
        default:
      }
    })
  );

export default combineEpics(
  createBoardEpic,
  createPiecesEpic,
  splitPiecesEpic,
  placePiecesEpic,
  choosePieceEpic
);

export {
  createBoardEpic,
  createPiecesEpic,
  splitPiecesEpic,
  placePiecesEpic,
  choosePieceEpic,
};

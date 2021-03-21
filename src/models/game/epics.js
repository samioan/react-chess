import { map } from "rxjs/operators";
import { combineEpics, ofType } from "redux-observable";

import {
  reservePieces,
  playerPieces,
  aiPieces,
  boardPieces,
} from "./selectors";
import { startGame, piecesCreated, piecesSplit, boardCreated } from "./actions";
import piecesCreator from "../../lib/piecesCreator";
import piecesArranger from "./util/piecesArranger";

const createPiecesEpic = (action$, state$) =>
  action$.pipe(
    ofType(startGame.type),
    map(() => {
      const newReservePieces = piecesCreator();

      return piecesCreated({
        boardPieces: [{}],
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

      return piecesSplit({
        reservePieces: newReservePieces,
        playerPieces: newPlayerPieces,
        aiPieces: newAiPieces,
      });
    })
  );

const createBoardEpic = (action$, state$) =>
  action$.pipe(
    ofType(piecesSplit.type),
    map(() => {
      const newPlayerPieces = playerPieces(state$.value).slice();
      const newAiPieces = aiPieces(state$.value).slice();

      const newBoardPieces = [
        ...newAiPieces,
        ...Array(32).fill({ empty: null }),
        ...newPlayerPieces,
      ];
      return boardCreated({
        boardPieces: newBoardPieces,
      });
    })
  );

export default combineEpics(createPiecesEpic, splitPiecesEpic, createBoardEpic);

export { createPiecesEpic, splitPiecesEpic, createBoardEpic };

import { map } from "rxjs/operators";
import { combineEpics, ofType } from "redux-observable";

import { reservePieces, playerPieces, aiPieces } from "./selectors";
import { startGame, gameStarted } from "./actions";
import piecesCreator from "../../lib/piecesCreator";

const startGameEpic = (action$, state$) =>
  action$.pipe(
    ofType(startGame.type),
    map(() => {
      const newReservePieces = piecesCreator;

      return gameStarted({
        reservePieces: newReservePieces,
      });
    })
  );

export default combineEpics(startGameEpic);

export { startGameEpic };

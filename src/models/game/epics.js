import { map, filter, mergeMap } from "rxjs/operators";
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
  pawnSelected,
  rookSelected,
  knightSelected,
  bishopSelected,
  queenSelected,
  kingSelected,
  pieceDeselected,
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

const selectPieceEpic = (action$, state$) =>
  action$.pipe(
    ofType(choosePiece.type),
    filter((action$) => action$.payload[1] === "full"),
    map((action$) => {
      const originalBoardPieces = boardPieces(state$.value).slice();
      const tile = action$.payload;

      originalBoardPieces.forEach((item) => {
        if (item[1] === "selected") {
          item.splice(1, 1, "full");
        }
        if (item[1] === "move") {
          if (item.length === 4) {
            item.splice(1, 1, "full");
          } else item.splice(1, 1, "empty");
        }
      });
      tile.splice(1, 1, "selected");

      return pieceSelected({
        boardPieces: originalBoardPieces,
      });
    })
  );

const selectPawnEpic = (action$, state$) =>
  action$.pipe(
    ofType(choosePiece.type),
    filter(
      (action$) =>
        action$.payload[2].slice(5, action$.payload[2].length) === "Pawn"
    ),
    map((action$) => {
      const originalBoardPieces = boardPieces(state$.value).slice();
      const tile = action$.payload;
      const chosenPieceIndex = originalBoardPieces.indexOf(tile);

      const pawnMoves = [
        originalBoardPieces[chosenPieceIndex - 8],
        originalBoardPieces[chosenPieceIndex + 8],
      ];

      switch (tile[2].slice(0, 1)) {
        case "w":
          pawnMoves[0].splice(1, 1, "move");
          break;
        case "b":
          pawnMoves[1].splice(1, 1, "move");
          break;
        default:
      }

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
        action$.payload[2].slice(5, action$.payload[2].length) === "Rook"
    ),
    map((action$) => {
      const originalBoardPieces = boardPieces(state$.value).slice();
      const tile = action$.payload;
      const chosenPieceIndex = originalBoardPieces.indexOf(tile);

      const rookMoves = originalBoardPieces.filter(
        (item) =>
          (originalBoardPieces.indexOf(item) - chosenPieceIndex) % 8 === 0 ||
          (originalBoardPieces.indexOf(item) - chosenPieceIndex > 0 &&
            originalBoardPieces.indexOf(item) - chosenPieceIndex < 8) ||
          (originalBoardPieces.indexOf(item) - chosenPieceIndex < 0 &&
            originalBoardPieces.indexOf(item) - chosenPieceIndex > -8)
      );

      rookMoves
        .filter(
          (item) =>
            item !== undefined &&
            (item[1] === "empty" || item[2].charAt(0) !== tile[2].charAt(0))
        )
        .forEach((item) => {
          item.splice(1, 1, "move");
        });

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
        action$.payload[2].slice(5, action$.payload[2].length) === "Knight"
    ),
    map((action$) => {
      const originalBoardPieces = boardPieces(state$.value).slice();
      const tile = action$.payload;
      const chosenPieceIndex = originalBoardPieces.indexOf(tile);

      const knightMoves = [
        originalBoardPieces[chosenPieceIndex - 15],
        originalBoardPieces[chosenPieceIndex - 17],
        originalBoardPieces[chosenPieceIndex - 6],
        originalBoardPieces[chosenPieceIndex - 10],
        originalBoardPieces[chosenPieceIndex + 15],
        originalBoardPieces[chosenPieceIndex + 17],
        originalBoardPieces[chosenPieceIndex + 6],
        originalBoardPieces[chosenPieceIndex + 10],
      ];

      knightMoves
        .filter(
          (item) =>
            item !== undefined &&
            (item[1] === "empty" || item[2].charAt(0) !== tile[2].charAt(0))
        )
        .forEach((item) => {
          item.splice(1, 1, "move");
        });

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
        action$.payload[2].slice(5, action$.payload[2].length) === "Bishop"
    ),
    map((action$) => {
      const originalBoardPieces = boardPieces(state$.value).slice();
      const tile = action$.payload;
      const chosenPieceIndex = originalBoardPieces.indexOf(tile);

      const bishopMoves = originalBoardPieces.filter(
        (item) =>
          (originalBoardPieces.indexOf(item) - chosenPieceIndex) % 9 === 0 ||
          (originalBoardPieces.indexOf(item) - chosenPieceIndex) % 7 === 0
      );

      bishopMoves
        .filter(
          (item) =>
            item !== undefined &&
            (item[1] === "empty" || item[2].charAt(0) !== tile[2].charAt(0))
        )
        .forEach((item) => {
          item.splice(1, 1, "move");
        });

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
        action$.payload[2].slice(5, action$.payload[2].length) === "Queen"
    ),
    map((action$) => {
      const originalBoardPieces = boardPieces(state$.value).slice();
      const tile = action$.payload;
      const chosenPieceIndex = originalBoardPieces.indexOf(tile);

      const queenMoves = [
        ...originalBoardPieces.filter(
          (item) =>
            (originalBoardPieces.indexOf(item) - chosenPieceIndex) % 9 === 0 ||
            (originalBoardPieces.indexOf(item) - chosenPieceIndex) % 7 === 0
        ),
        ...originalBoardPieces.filter(
          (item) =>
            (originalBoardPieces.indexOf(item) - chosenPieceIndex) % 8 === 0 ||
            (originalBoardPieces.indexOf(item) - chosenPieceIndex > 0 &&
              originalBoardPieces.indexOf(item) - chosenPieceIndex < 8) ||
            (originalBoardPieces.indexOf(item) - chosenPieceIndex < 0 &&
              originalBoardPieces.indexOf(item) - chosenPieceIndex > -8)
        ),
      ];

      queenMoves
        .filter(
          (item) =>
            item !== undefined &&
            (item[1] === "empty" || item[2].charAt(0) !== tile[2].charAt(0))
        )
        .forEach((item) => {
          item.splice(1, 1, "move");
        });

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
        action$.payload[2].slice(5, action$.payload[2].length) === "King"
    ),
    map((action$) => {
      const originalBoardPieces = boardPieces(state$.value).slice();
      const tile = action$.payload;
      const chosenPieceIndex = originalBoardPieces.indexOf(tile);

      const kingMoves = [
        originalBoardPieces[chosenPieceIndex - 1],
        originalBoardPieces[chosenPieceIndex + 1],
        originalBoardPieces[chosenPieceIndex - 7],
        originalBoardPieces[chosenPieceIndex + 7],
        originalBoardPieces[chosenPieceIndex - 8],
        originalBoardPieces[chosenPieceIndex + 8],
        originalBoardPieces[chosenPieceIndex - 9],
        originalBoardPieces[chosenPieceIndex + 9],
      ];

      kingMoves
        .filter(
          (item) =>
            item !== undefined &&
            (item[1] === "empty" || item[2].charAt(0) !== tile[2].charAt(0))
        )
        .forEach((item) => {
          item.splice(1, 1, "move");
        });

      return kingSelected({
        boardPieces: originalBoardPieces,
      });
    })
  );

// const deselectPieceEpic = (action$, state$) =>
//   action$.pipe(
//     ofType(choosePiece.type),
//     filter((action$) => action$.payload[1] === "selected"),
//     map((action$) => {
//       const originalBoardPieces = boardPieces(state$.value).slice();
//       const tile = action$.payload;

//       originalBoardPieces.forEach((item) => {
//         if (item[1] === "move") {
//           if (item.length === 4) {
//             item.splice(1, 1, "full");
//           } else item.splice(1, 1, "empty");
//         }
//       });
//       tile.splice(1, 1, "full");

//       return pieceDeselected({
//         boardPieces: originalBoardPieces,
//       });
//     })
//   );

const movePieceEpic = (action$, state$) =>
  action$.pipe(
    ofType(choosePiece.type),
    filter((action$) => action$.payload[1] === "move"),
    map((action$) => {
      const originalBoardPieces = boardPieces(state$.value).slice();
      const tile = action$.payload;

      originalBoardPieces.forEach((item) => {
        if (item[1] === "selected") {
          tile.splice(1, 1, "full");
          tile.splice(2, 1, item[2]);
          tile.splice(3, 1, item[3]);
          item.splice(1, 1, "empty");
          item.splice(2, 1);
          item.splice(3, 1);
          item.splice(4, 1);
        }
      });
      originalBoardPieces.forEach((item) => {
        if (item[1] === "move") {
          if (item.length === 4) {
            item.splice(1, 1, "full");
          } else item.splice(1, 1, "empty");
        }
      });

      return pieceMoved({
        boardPieces: originalBoardPieces,
      });
    })
  );

export default combineEpics(
  createBoardEpic,
  createPiecesEpic,
  splitPiecesEpic,
  placePiecesEpic,
  selectPieceEpic,
  selectPawnEpic,
  selectRookEpic,
  selectKnightEpic,
  selectBishopEpic,
  selectQueenEpic,
  selectKingEpic,
  // deselectPieceEpic,
  movePieceEpic
);

export {
  createBoardEpic,
  createPiecesEpic,
  splitPiecesEpic,
  placePiecesEpic,
  selectPieceEpic,
  selectPawnEpic,
  selectRookEpic,
  selectKnightEpic,
  selectBishopEpic,
  selectQueenEpic,
  selectKingEpic,
  // deselectPieceEpic,
  movePieceEpic,
};

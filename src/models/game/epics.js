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
      const tile = action$.payload;
      const chosenPieceIndex = originalBoardPieces.indexOf(tile);

      const pawnMoves = [
        originalBoardPieces[chosenPieceIndex - 8],
        originalBoardPieces[chosenPieceIndex + 8],
      ];

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

      const bishopMoves = originalBoardPieces.filter(
        (item) =>
          (originalBoardPieces.indexOf(item) - chosenPieceIndex) % 9 === 0 ||
          (originalBoardPieces.indexOf(item) - chosenPieceIndex) % 7 === 0
      );

      const rookMoves = originalBoardPieces.filter(
        (item) =>
          (originalBoardPieces.indexOf(item) - chosenPieceIndex) % 8 === 0 ||
          (originalBoardPieces.indexOf(item) - chosenPieceIndex > 0 &&
            originalBoardPieces.indexOf(item) - chosenPieceIndex < 8) ||
          (originalBoardPieces.indexOf(item) - chosenPieceIndex < 0 &&
            originalBoardPieces.indexOf(item) - chosenPieceIndex > -8)
      );

      const kingMoves = [
        ...pawnMoves,
        originalBoardPieces[chosenPieceIndex - 1],
        originalBoardPieces[chosenPieceIndex + 1],
        originalBoardPieces[chosenPieceIndex - 7],
        originalBoardPieces[chosenPieceIndex + 7],
        originalBoardPieces[chosenPieceIndex - 9],
        originalBoardPieces[chosenPieceIndex + 9],
      ];

      const queenMoves = [...bishopMoves, ...rookMoves];
      switch (tile[1]) {
        case "full":
          originalBoardPieces.forEach((item) => {
            if (item[1] === "selected") {
              item.splice(1, 1, "full");
            }
            if (item[1] === "move") {
              item.splice(1, 1, "empty");
            }
          });
          tile.splice(1, 1, "selected");
          switch (tile[2].slice(5, tile[2].length)) {
            case "Pawn":
              switch (tile[2].slice(0, 1)) {
                case "w":
                  pawnMoves[0].splice(1, 1, "move");
                  break;
                case "b":
                  pawnMoves[1].splice(1, 1, "move");
                  break;
                default:
              }
              break;
            case "Knight":
              knightMoves
                .filter(
                  (item) =>
                    item !== undefined &&
                    (item[1] === "empty" ||
                      item[2].charAt(0) !== tile[2].charAt(0))
                )
                .forEach((item) => {
                  item.splice(1, 1, "move");
                  // console.log("ITEM");
                  // console.log(originalBoardPieces.indexOf(item));
                  // console.log("PIECE");
                  // console.log(chosenPieceIndex);
                  // console.log("RESULT");
                  // console.log(
                  //   chosenPieceIndex - originalBoardPieces.indexOf(item)
                  // );
                  // console.log("___________");
                });

              break;
            case "Bishop":
              bishopMoves
                .filter(
                  (item) =>
                    item !== undefined &&
                    (item[1] === "empty" ||
                      item[2].charAt(0) !== tile[2].charAt(0))
                )
                .forEach((item) => {
                  item.splice(1, 1, "move");
                });
              break;
            case "Rook":
              rookMoves
                .filter(
                  (item) =>
                    item !== undefined &&
                    (item[1] === "empty" ||
                      item[2].charAt(0) !== tile[2].charAt(0))
                )
                .forEach((item) => {
                  item.splice(1, 1, "move");
                });
              break;
            case "King":
              kingMoves
                .filter(
                  (item) =>
                    item !== undefined &&
                    (item[1] === "empty" ||
                      item[2].charAt(0) !== tile[2].charAt(0))
                )
                .forEach((item) => {
                  item.splice(1, 1, "move");
                });
              break;
            case "Queen":
              queenMoves
                .filter(
                  (item) =>
                    item !== undefined &&
                    (item[1] === "empty" ||
                      item[2].charAt(0) !== tile[2].charAt(0))
                )
                .forEach((item) => {
                  item.splice(1, 1, "move");
                });
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
              if (item.length === 4) {
                item.splice(1, 1, "full");
              } else item.splice(1, 1, "empty");
            }
          });
          return pieceUnselected({
            boardPieces: originalBoardPieces,
          });

        case "move":
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

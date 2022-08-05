import {
  choosePiece,
  moveCreated,
  pawnPromoted,
  kingChecked,
  kingCheckmated,
  closeCheckSnackbar,
  restartGame,
} from "./actions";

import { createBoard, onClickTileAction } from "utils";
import { PLAYER_COLOR, TILE_STATUS } from "reference-data";

const initialState = {
  playersTurn: PLAYER_COLOR.WHITE,
  lastPlayer: null,
  boardPieces: createBoard,
  previousMovePieces: [],
  isCheckSnackbarOpen: false,
  isCheckmateModalOpen: false,
};

const gameReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case choosePiece.type: {
      return {
        ...state,
        lastPlayer:
          payload.status === TILE_STATUS.MOVE
            ? state.playersTurn === PLAYER_COLOR.WHITE
              ? PLAYER_COLOR.WHITE
              : PLAYER_COLOR.BLACK
            : state.lastPlayer,
        playersTurn:
          payload.status === TILE_STATUS.MOVE
            ? state.playersTurn === PLAYER_COLOR.WHITE
              ? PLAYER_COLOR.BLACK
              : PLAYER_COLOR.WHITE
            : state.playersTurn,
        previousMovePieces:
          payload.status === TILE_STATUS.NOT_SELECTED
            ? state.boardPieces
            : state.previousMovePieces,
        boardPieces: onClickTileAction(payload, state.boardPieces),
      };
    }
    case moveCreated.type: {
      return {
        ...state,
        ...payload,
      };
    }
    case pawnPromoted.type: {
      return {
        ...state,
        ...payload,
      };
    }
    case kingChecked.type: {
      return {
        ...state,
        ...payload,
      };
    }
    case closeCheckSnackbar.type: {
      return {
        ...state,
        isCheckSnackbarOpen: false,
      };
    }
    case kingCheckmated.type: {
      return {
        ...state,
        ...payload,
      };
    }
    case restartGame.type: {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
};

export { initialState };
export default gameReducer;

import {
  boardCreated,
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
  gameResumed,
  moveStored,
  moveDeleted,
} from "./actions";

const initialState = {
  playersTurn: "white",
  lastPlayer: null,
  boardPieces: [],
  movesLog: [],
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case boardCreated.type: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case pawnSelected.type: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case rookSelected.type: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case knightSelected.type: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case bishopSelected.type: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case queenSelected.type: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case kingSelected.type: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case pieceDeselected.type: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case pieceMoved.type: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case pawnPromoted.type: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case whiteKingChecked.type: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case blackKingChecked.type: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case gameResumed.type: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case moveStored.type: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case moveDeleted.type: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};

export { initialState };
export default gameReducer;

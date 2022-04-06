import {
  boardCreated,
  piecesCreated,
  piecesSplit,
  piecesPlaced,
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

const initialState = {
  playersTurn: "w",
  boardPieces: [],
  reservePieces: [],
  playerPieces: [],
  aiPieces: [],
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case boardCreated.type: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case piecesCreated.type: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case piecesSplit.type: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case piecesPlaced.type: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case pieceSelected.type: {
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
    case continueGame.type: {
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

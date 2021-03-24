import {
  boardCreated,
  piecesCreated,
  piecesSplit,
  piecesPlaced,
  pieceSelected,
  pieceUnselected,
  pieceMoved,
} from "./actions";

const initialState = {
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
    case pieceUnselected.type: {
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
    default:
      return state;
  }
};

export { initialState };
export default gameReducer;

import { boardCreated, piecesCreated, piecesSplit } from "./actions";

const initialState = {
  boardPieces: Array(64).fill({ piece: null }),
  reservePieces: [{}],
  playerPieces: [{}],
  aiPieces: [{}],
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
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

    case boardCreated.type: {
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

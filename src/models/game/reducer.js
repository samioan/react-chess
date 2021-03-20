import { gameStarted } from "./actions";

const initialState = {
  reservePieces: [],
  playerPieces: [],
  aiPieces: [],
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case gameStarted.type: {
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

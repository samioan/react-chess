const playersTurn = (state) => state.game.playersTurn;
const boardPieces = (state) => state.game.boardPieces;
const previousMovePieces = (state) => state.game.previousMovePieces;
const lastPlayer = (state) => state.game.lastPlayer;
const isCheckSnackbarOpen = (state) => state.game.isCheckSnackbarOpen;
const isCheckmateModalOpen = (state) => state.game.isCheckmateModalOpen;

export {
  playersTurn,
  boardPieces,
  previousMovePieces,
  lastPlayer,
  isCheckSnackbarOpen,
  isCheckmateModalOpen,
};

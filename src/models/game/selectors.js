const playersTurn = (state) => state.game.playersTurn;
const boardPieces = (state) => state.game.boardPieces;
const previousMovePieces = (state) => state.game.previousMovePieces;
const lastPlayer = (state) => state.game.lastPlayer;
const movesLog = (state) => state.game.movesLog;
const movesLogIndex = (state) => state.game.movesLogIndex;

export {
  playersTurn,
  boardPieces,
  previousMovePieces,
  lastPlayer,
  movesLog,
  movesLogIndex,
};

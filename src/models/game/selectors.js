const playersTurn = (state) => state.game.playersTurn;
const boardPieces = (state) => state.game.boardPieces;
const movesLog = (state) => state.game.movesLog;
const lastPlayer = (state) => state.game.lastPlayer;

export { playersTurn, boardPieces, movesLog, lastPlayer };

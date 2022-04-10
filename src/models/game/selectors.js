const playersTurn = (state) => state.game.playersTurn;
const boardPieces = (state) => state.game.boardPieces;
const previousMovePieces = (state) => state.game.previousMovePieces;
const lastPlayer = (state) => state.game.lastPlayer;
const movesLog = (state) => state.game.movesLog;

export { playersTurn, boardPieces, previousMovePieces, lastPlayer, movesLog };

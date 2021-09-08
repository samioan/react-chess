const playersTurn = (state) => state.game.playersTurn;
const boardPieces = (state) => state.game.boardPieces;
const reservePieces = (state) => state.game.reservePieces;
const playerPieces = (state) => state.game.playerPieces;
const aiPieces = (state) => state.game.aiPieces;

export { playersTurn, boardPieces, reservePieces, playerPieces, aiPieces };

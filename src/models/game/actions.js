const Action = (type) => {
  const actionCreator = (payload) => ({
    type,
    payload,
  });
  actionCreator.type = type;
  return actionCreator;
};

export const startGame = Action("START_GAME");
export const boardCreated = Action("BOARD_CREATED");
export const piecesCreated = Action("PIECES_CREATED");
export const piecesSplit = Action("PIECES_SPLIT");
export const piecesPlaced = Action("PIECES_PLACED");
export const choosePiece = Action("CHOOSE_PIECE");
export const pieceSelected = Action("PIECE_SELECTED");
export const pieceUnselected = Action("PIECE_UNSELECTED");
export const pieceMoved = Action("PIECE_MOVED");

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
export const pawnSelected = Action("PAWN_SELECTED");
export const rookSelected = Action("ROOK_SELECTED");
export const knightSelected = Action("KNIGHT_SELECTED");
export const bishopSelected = Action("BISHOP_SELECTED");
export const queenSelected = Action("QUEEN_SELECTED");
export const kingSelected = Action("KING_SELECTED");
export const pieceDeselected = Action("PIECE_DESELECTED");
export const pieceMoved = Action("PIECE_MOVED");
export const pawnPromoted = Action("PAWN_PROMOTED");

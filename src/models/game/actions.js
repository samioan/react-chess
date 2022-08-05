const Action = (type) => {
  const actionCreator = (payload) => ({
    type,
    payload,
  });
  actionCreator.type = type;
  return actionCreator;
};

export const choosePiece = Action("CHOOSE_PIECE");
export const moveCreated = Action("MOVE_CREATED");
export const pawnPromoted = Action("PAWN_PROMOTED");
export const kingChecked = Action("KING_CHECKED");
export const kingCheckmated = Action("KING_CHECKMATED");
export const closeCheckSnackbar = Action("CLOSE_CHECK_SNACKBAR");
export const restartGame = Action("RESTART_GAME");

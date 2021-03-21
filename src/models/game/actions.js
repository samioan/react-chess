const Action = (type) => {
  const actionCreator = (payload) => ({
    type,
    payload,
  });
  actionCreator.type = type;
  return actionCreator;
};

export const startGame = Action("START_GAME");
export const piecesCreated = Action("PIECES_CREATED");
export const piecesSplit = Action("PIECES_SPLIT");
export const boardCreated = Action("BOARD_CREATED");

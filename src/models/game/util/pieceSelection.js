const selectPiece = (piecesArray, piece) => {
  piecesArray.forEach((item) => {
    if (item[1] === "selected") {
      item.splice(1, 1, "full");
    }
    if (item[1] === "move") {
      if (item.length === 4) {
        item.splice(1, 1, "full");
      } else item.splice(1, 1, "empty");
    }
  });
  piece.splice(1, 1, "selected");
};

const deselectPiece = (piecesArray) => {
  piecesArray.forEach((item) => {
    if (item[1] === "selected") {
      item.splice(1, 1, "full");
    }
    if (item[1] === "move") {
      if (item.length === 4) {
        item.splice(1, 1, "full");
      } else item.splice(1, 1, "empty");
    }
  });
};

const movePiece = (piecesArray, piece) => {
  piecesArray.forEach((item) => {
    if (item[1] === "selected") {
      piece.splice(1, 1, "full");
      piece.splice(2, 1, item[2]);
      piece.splice(3, 1, item[3]);
      item.splice(1, 1, "empty");
      item.splice(2, 1);
      item.splice(3, 1);
      item.splice(4, 1);
    }
  });
  piecesArray.forEach((item) => {
    if (item[1] === "move") {
      if (item.length === 4) {
        item.splice(1, 1, "full");
      } else item.splice(1, 1, "empty");
    }
  });
};

export { selectPiece, deselectPiece, movePiece };

const bishopMoves = (piecesArray, pieceIndex, piece) => {
  const bishopMoves = piecesArray.filter(
    (item) =>
      (piecesArray.indexOf(item) - pieceIndex) % 9 === 0 ||
      (piecesArray.indexOf(item) - pieceIndex) % 7 === 0
  );

  const columns = ["A", "B", "C", "D", "E", "F", "G", "H"];

  bishopMoves
    .filter(
      (item) =>
        item !== undefined &&
        (item[1] === "empty" || item[2].charAt(0) !== piece[2].charAt(0))
    )
    .filter(
      (item) =>
        (pieceIndex > piecesArray.indexOf(item) &&
          (piecesArray.indexOf(item) - pieceIndex) % 7 === 0 &&
          columns.indexOf(piece[0].charAt(0)) <
            columns.indexOf(item[0].charAt(0))) ||
        (pieceIndex > piecesArray.indexOf(item) &&
          (piecesArray.indexOf(item) - pieceIndex) % 9 === 0 &&
          columns.indexOf(piece[0].charAt(0)) >
            columns.indexOf(item[0].charAt(0))) ||
        (pieceIndex < piecesArray.indexOf(item) &&
          (piecesArray.indexOf(item) - pieceIndex) % 7 === 0 &&
          columns.indexOf(piece[0].charAt(0)) >
            columns.indexOf(item[0].charAt(0))) ||
        (pieceIndex < piecesArray.indexOf(item) &&
          (piecesArray.indexOf(item) - pieceIndex) % 9 === 0 &&
          columns.indexOf(piece[0].charAt(0)) <
            columns.indexOf(item[0].charAt(0)))
    )
    .forEach((item) => {
      item.splice(1, 1, "move");
    });

  const newBishopMoves = bishopMoves
    .filter((item) => item[1] === "move")
    .sort((a, b) => a[0][0].localeCompare(b[0][0]));

  const bishopArraySmall = [];
  const bishopArrayBig = [];

  newBishopMoves.forEach((item) => {
    item.splice(1, 1, "empty");
    if (item[0][0] < piece[0][0]) {
      bishopArraySmall.push(item);
    }
  });

  newBishopMoves.forEach((item) => {
    if (item[0][0] > piece[0][0]) {
      bishopArrayBig.push(item);
    }
  });

  bishopArraySmall.sort((a, b) => Number(b[0][1]) - Number(a[0][1]));
  bishopArrayBig.sort((a, b) => Number(b[0][1]) - Number(a[0][1]));

  const line1 = [];
  const line2 = [];
  const line3 = [];
  const line4 = [];

  bishopArraySmall.forEach((item) => {
    if (Number(item[0][1]) < Number(piece[0][1])) {
      line1.push(item);
    }
  });

  bishopArraySmall.forEach((item) => {
    if (Number(item[0][1]) > Number(piece[0][1])) {
      line2.push(item);
    }
  });

  bishopArrayBig.forEach((item) => {
    if (Number(item[0][1]) < Number(piece[0][1])) {
      line3.push(item);
    }
  });

  bishopArrayBig.forEach((item) => {
    if (Number(item[0][1]) > Number(piece[0][1])) {
      line4.push(item);
    }
  });

  const newLine1 = [];
  const newLine2 = [];
  const newLine3 = [];
  const newLine4 = [];

  const newDownLineMaker = (oldLine, newLine) => {
    for (var i = 0; i < oldLine.length; i++) {
      let oldLineNumber = Number(oldLine[i][0][1]);
      const pieceNumber = Number(piece[0][1]);

      if (pieceNumber - oldLineNumber === i + 1) {
        newLine.push(oldLine[i]);
      }
    }
    return newLine;
  };

  const newUpLineMaker = (oldLine, newLine) => {
    let counter = 1;
    for (var i = oldLine.length - 1; i > -1; i--) {
      let oldLineNumber = Number(oldLine[i][0][1]);
      const pieceNumber = Number(piece[0][1]);

      if (oldLineNumber - pieceNumber === counter) {
        newLine.push(oldLine[i]);
        counter++;
      }
    }
    return newLine;
  };

  newDownLineMaker(line1, newLine1);
  newDownLineMaker(line3, newLine3);
  newUpLineMaker(line2, newLine2);
  newUpLineMaker(line4, newLine4);

  const newerBishopMoves = [
    ...newLine1,
    ...newLine2,
    ...newLine3,
    ...newLine4,
  ].forEach((item) => {
    item.splice(1, 1, "move");
  });
  return newerBishopMoves;
};

export { bishopMoves };
export default bishopMoves;

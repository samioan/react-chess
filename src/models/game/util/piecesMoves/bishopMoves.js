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
    if (item.length === 3) {
      item.splice(1, 1, "empty");
    }
    if (item.length === 4) {
      item.splice(1, 1, "full");
    }
    if (item[0][0] < piece[0][0]) {
      bishopArraySmall.push(item);
    }
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

  const newerLine1 = newLine1.filter((item) => item.length === 3);
  const newerLine2 = newLine2.filter((item) => item.length === 3);
  const newerLine3 = newLine3.filter((item) => item.length === 3);
  const newerLine4 = newLine4.filter((item) => item.length === 3);

  const newerLineEnemies1 = newLine1.filter((item) => item.length === 4);
  const newerLineEnemies2 = newLine2.filter((item) => item.length === 4);
  const newerLineEnemies3 = newLine3.filter((item) => item.length === 4);
  const newerLineEnemies4 = newLine4.filter((item) => item.length === 4);

  if (newerLineEnemies1.length > 0) {
    newerLine1.push(newerLineEnemies1[0]);
  }

  if (newerLineEnemies2.length > 0) {
    newerLine2.push(newerLineEnemies2[0]);
  }

  if (newerLineEnemies3.length > 0) {
    newerLine3.push(newerLineEnemies3[0]);
  }

  if (newerLineEnemies4.length > 0) {
    newerLine4.push(newerLineEnemies4[0]);
  }

  const finalLine1 = [];
  const finalLine2 = [];
  const finalLine3 = [];
  const finalLine4 = [];

  const finalDownLineMaker = (newLine, finalLine, newLineEnemies) => {
    if (newLineEnemies.length > 0) {
      for (var i = 0; i < newLine.length; i++) {
        let newLineNumber = Number(newLine[i][0][1]);
        const enemyNumber = Number(newLineEnemies[0][0][1]);

        if (newLineNumber > enemyNumber) {
          finalLine.push(newLine[i]);
        }
      }
      finalLine.push(newLineEnemies[0]);

      return finalLine;
    }
  };

  const finalUpLineMaker = (newLine, finalLine, newLineEnemies) => {
    if (newLineEnemies.length > 0) {
      for (var i = 0; i < newLine.length; i++) {
        let newLineNumber = Number(newLine[i][0][1]);
        const enemyNumber = Number(newLineEnemies[0][0][1]);

        if (newLineNumber < enemyNumber) {
          finalLine.push(newLine[i]);
        }
      }
      finalLine.push(newLineEnemies[0]);

      return finalLine;
    }
  };

  finalDownLineMaker(newLine1, finalLine1, newerLineEnemies1);
  finalDownLineMaker(newLine3, finalLine3, newerLineEnemies3);
  finalUpLineMaker(newLine2, finalLine2, newerLineEnemies2);
  finalUpLineMaker(newLine4, finalLine4, newerLineEnemies4);

  const newerBishopMoves = [];

  if (newerLineEnemies1.length > 0) {
    newerBishopMoves.push(...finalLine1);
  } else newerBishopMoves.push(...newLine1);

  if (newerLineEnemies2.length > 0) {
    newerBishopMoves.push(...finalLine2);
  } else newerBishopMoves.push(...newLine2);

  if (newerLineEnemies3.length > 0) {
    newerBishopMoves.push(...finalLine3);
  } else newerBishopMoves.push(...newLine3);

  if (newerLineEnemies4.length > 0) {
    newerBishopMoves.push(...finalLine4);
  } else newerBishopMoves.push(...newLine4);

  newerBishopMoves.forEach((item) => {
    item.splice(1, 1, "move");
  });

  return newerBishopMoves;
};

export { bishopMoves };
export default bishopMoves;

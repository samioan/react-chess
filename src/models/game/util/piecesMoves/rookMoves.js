const rookMoves = (piecesArray, pieceIndex, piece) => {
  const rookMoves = piecesArray.filter(
    (item) =>
      (piecesArray.indexOf(item) - pieceIndex) % 8 === 0 ||
      (piecesArray.indexOf(item) - pieceIndex > 0 &&
        piecesArray.indexOf(item) - pieceIndex < 8) ||
      (piecesArray.indexOf(item) - pieceIndex < 0 &&
        piecesArray.indexOf(item) - pieceIndex > -8)
  );

  const columns = ["A", "B", "C", "D", "E", "F", "G", "H"];

  rookMoves
    .filter(
      (item) =>
        item !== undefined &&
        (item[1] === "empty" || item[2].charAt(0) !== piece[2].charAt(0))
    )
    .filter(
      (item) =>
        (piecesArray.indexOf(item) - pieceIndex) % 8 === 0 ||
        (piecesArray.indexOf(item) - pieceIndex > 0 &&
          piecesArray.indexOf(item) - pieceIndex < 8 &&
          columns.indexOf(piece[0].charAt(0)) <
            columns.indexOf(item[0].charAt(0))) ||
        (piecesArray.indexOf(item) - pieceIndex < 0 &&
          piecesArray.indexOf(item) - pieceIndex > -8 &&
          columns.indexOf(piece[0].charAt(0)) >
            columns.indexOf(item[0].charAt(0)))
    )
    .forEach((item) => {
      item.splice(1, 1, "move");
    });

  const newRookMoves = rookMoves
    .filter((item) => item[1] === "move")
    .sort((a, b) => a[0][0].localeCompare(b[0][0]));

  const rookArrayVertical = [];
  const rookArrayHorizontal = [];

  newRookMoves.forEach((item) => {
    if (item.length === 3) {
      item.splice(1, 1, "empty");
    }
    if (item.length === 4) {
      item.splice(1, 1, "full");
    }
    if (item[0][0] === piece[0][0]) {
      rookArrayVertical.push(item);
    }
    if (item[0][1] === piece[0][1]) {
      rookArrayHorizontal.push(item);
    }
  });

  rookArrayVertical.sort((a, b) => Number(b[0][1]) - Number(a[0][1]));
  rookArrayHorizontal.sort((a, b) => Number(b[0][1]) - Number(a[0][1]));

  const line1 = [];
  const line2 = [];
  const line3 = [];
  const line4 = [];

  rookArrayVertical.forEach((item) => {
    if (Number(item[0][1]) < Number(piece[0][1])) {
      line1.push(item);
    }
  });

  rookArrayVertical.forEach((item) => {
    if (Number(item[0][1]) > Number(piece[0][1])) {
      line2.push(item);
    }
  });

  rookArrayHorizontal.forEach((item) => {
    if (item[0][0] < piece[0][0]) {
      line3.push(item);
    }
  });

  rookArrayHorizontal.forEach((item) => {
    if (item[0][0] > piece[0][0]) {
      line4.push(item);
    }
  });

  const newLine1 = [];
  const newLine2 = [];
  const newLine3 = [];
  const newLine4 = [];

  const newVerticalDownLineMaker = (oldLine, newLine) => {
    for (var i = 0; i < oldLine.length; i++) {
      let oldLineNumber = Number(oldLine[i][0][1]);
      const pieceNumber = Number(piece[0][1]);

      if (pieceNumber - oldLineNumber === i + 1) {
        newLine.push(oldLine[i]);
      }
    }

    return newLine;
  };

  const newVerticalUpLineMaker = (oldLine, newLine) => {
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

  const newHorizontalLeftLineMaker = (oldLine, newLine) => {
    let counter = 1;

    for (var i = oldLine.length - 1; i > -1; i--) {
      let oldLineLetter = oldLine[i][0][0].charCodeAt(0);
      const pieceLetter = piece[0][0].charCodeAt(0);

      if (pieceLetter - oldLineLetter === counter) {
        newLine.push(oldLine[i]);
        counter++;
      }
    }

    return newLine;
  };

  const newHorizontalRightLineMaker = (oldLine, newLine) => {
    for (var i = 0; i < oldLine.length; i++) {
      let oldLineLetter = oldLine[i][0][0].charCodeAt(0);
      const pieceLetter = piece[0][0].charCodeAt(0);

      if (oldLineLetter - pieceLetter === i + 1) {
        newLine.push(oldLine[i]);
      }
    }

    return newLine;
  };

  newVerticalDownLineMaker(line1, newLine1);
  newVerticalUpLineMaker(line2, newLine2);
  newHorizontalLeftLineMaker(line3, newLine3);
  newHorizontalRightLineMaker(line4, newLine4);

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

  const finalVerticalDownLineMaker = (newLine, finalLine, newLineEnemies) => {
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

  const finalVerticalUpLineMaker = (newLine, finalLine, newLineEnemies) => {
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

  const finalHorizontalLeftLineMaker = (newLine, finalLine, newLineEnemies) => {
    if (newLineEnemies.length > 0) {
      for (var i = 0; i < newLine.length; i++) {
        let newLineLetter = newLine[i][0][0].charCodeAt(0);
        const enemyLetter = newLineEnemies[0][0][0].charCodeAt(0);

        if (newLineLetter > enemyLetter) {
          finalLine.push(newLine[i]);
        }
      }
      finalLine.push(newLineEnemies[0]);

      return finalLine;
    }
  };

  const finalHorizontalRightLineMaker = (
    newLine,
    finalLine,
    newLineEnemies
  ) => {
    if (newLineEnemies.length > 0) {
      for (var i = 0; i < newLine.length; i++) {
        let newLineLetter = newLine[i][0][0].charCodeAt(0);
        const enemyLetter = newLineEnemies[0][0][0].charCodeAt(0);

        if (newLineLetter < enemyLetter) {
          finalLine.push(newLine[i]);
        }
      }
      finalLine.push(newLineEnemies[0]);

      return finalLine;
    }
  };

  finalVerticalDownLineMaker(newLine1, finalLine1, newerLineEnemies1);
  finalVerticalUpLineMaker(newLine2, finalLine2, newerLineEnemies2);
  finalHorizontalLeftLineMaker(newLine3, finalLine3, newerLineEnemies3);
  finalHorizontalRightLineMaker(newLine4, finalLine4, newerLineEnemies4);

  const newerRookMoves = [];

  if (newerLineEnemies1.length > 0) {
    newerRookMoves.push(...finalLine1);
  } else newerRookMoves.push(...newLine1);

  if (newerLineEnemies2.length > 0) {
    newerRookMoves.push(...finalLine2);
  } else newerRookMoves.push(...newLine2);

  if (newerLineEnemies3.length > 0) {
    newerRookMoves.push(...finalLine3);
  } else newerRookMoves.push(...newLine3);

  if (newerLineEnemies4.length > 0) {
    newerRookMoves.push(...finalLine4);
  } else newerRookMoves.push(...newLine4);

  newerRookMoves.forEach((item) => {
    item.splice(1, 1, "move");
  });

  return newerRookMoves;
};

export { rookMoves };
export default rookMoves;

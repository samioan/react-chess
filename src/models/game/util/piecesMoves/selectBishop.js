const selectBishop = (piece, pieces) => {
  const modifier = {
    color: piece.color === "white" ? "white" : "black",
  };

  const pointers = {
    topLeft: `${Number(Number(piece.position.charAt(0)) - 1)}${Number(
      Number(piece.position.charAt(1)) - 1
    )}`,
    topRight: `${Number(Number(piece.position.charAt(0)) - 1)}${Number(
      Number(piece.position.charAt(1)) + 1
    )}`,
    bottomLeft: `${Number(Number(piece.position.charAt(0)) + 1)}${Number(
      Number(piece.position.charAt(1)) - 1
    )}`,
    bottomRight: `${Number(Number(piece.position.charAt(0)) + 1)}${Number(
      Number(piece.position.charAt(1)) + 1
    )}`,
  };

  const createLegalPointers = (pointer) =>
    pointer.length === 2 &&
    Number(pointer.charAt(0)) <= 7 &&
    Number(pointer.charAt(1)) <= 7 &&
    pointer;

  const bishopMoves = [];

  const topLeftRow =
    createLegalPointers(pointers.topLeft) &&
    Array(7)
      .fill(pointers.topLeft)
      .map(
        (item, index) =>
          `${Number(item.charAt(0) - index)}${Number(item.charAt(1) - index)}`
      )
      .filter(
        (item) =>
          item.length === 2 &&
          Number(item.charAt(0)) <= 7 &&
          Number(item.charAt(1)) <= 7
      )
      .map((item) => pieces[item.charAt(0)][item.charAt(1)]);

  const topRightRow =
    createLegalPointers(pointers.topRight) &&
    Array(7)
      .fill(pointers.topRight)
      .map(
        (item, index) =>
          `${Number(item.charAt(0) - index)}${Number(item.charAt(1)) + index}`
      )
      .filter(
        (item) =>
          item.length === 2 &&
          Number(item.charAt(0)) <= 7 &&
          Number(item.charAt(1)) <= 7
      )
      .map((item) => pieces[item.charAt(0)][item.charAt(1)]);

  const bottomLeftRow =
    createLegalPointers(pointers.bottomLeft) &&
    Array(7)
      .fill(pointers.bottomLeft)
      .map(
        (item, index) =>
          `${Number(item.charAt(0)) + index}${Number(item.charAt(1)) - index}`
      )
      .filter(
        (item) =>
          item.length === 2 &&
          Number(item.charAt(0)) <= 7 &&
          Number(item.charAt(1)) <= 7
      )
      .map((item) => pieces[item.charAt(0)][item.charAt(1)]);

  const bottomRightRow =
    createLegalPointers(pointers.bottomRight) &&
    Array(7)
      .fill(pointers.bottomRight)
      .map(
        (item, index) =>
          `${Number(item.charAt(0)) + index}${Number(item.charAt(1)) + index}`
      )
      .filter(
        (item) =>
          item.length === 2 &&
          Number(item.charAt(0)) <= 7 &&
          Number(item.charAt(1)) <= 7
      )
      .map((item) => pieces[item.charAt(0)][item.charAt(1)]);

  const createLegalMoves = (row) => {
    for (let index in row) {
      if (row[index].color === null) {
        bishopMoves.push(row[index]);
      }
      if (row[index].color !== null) {
        bishopMoves.push(row[index]);
        break;
      }
    }
  };

  createLegalMoves(topLeftRow);
  createLegalMoves(topRightRow);
  createLegalMoves(bottomLeftRow);
  createLegalMoves(bottomRightRow);

  bishopMoves
    .filter((item) => item?.color !== modifier.color)
    .forEach((item) => {
      item.status = "move";
    });
  return bishopMoves;
};

export { selectBishop };
export default selectBishop;

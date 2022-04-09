const selectRook = (piece, pieces) => {
  const modifier = {
    color: piece.color === "white" ? "white" : "black",
  };

  const pointers = {
    top: `${Number(
      Number(piece.position.charAt(0)) - 1
    )}${piece.position.charAt(1)}`,
    right: `${piece.position.charAt(0)}${Number(
      Number(piece.position.charAt(1)) + 1
    )}`,
    bottom: `${Number(
      Number(piece.position.charAt(0)) + 1
    )}${piece.position.charAt(1)}`,
    left: `${piece.position.charAt(0)}${Number(
      Number(piece.position.charAt(1)) - 1
    )}`,
  };

  const createLegalPointers = (pointer) =>
    pointer.length === 2 &&
    Number(pointer.charAt(0)) <= 7 &&
    Number(pointer.charAt(1)) <= 7 &&
    pointer;

  const rookMoves = [];

  const topRow =
    createLegalPointers(pointers.top) &&
    Array(Number(piece.position.charAt(0)))
      .fill(pointers.top)
      .map(
        (item, index) => `${Number(item.charAt(0) - index)}${item.charAt(1)}`
      )
      .map((item) => pieces[item.charAt(0)][item.charAt(1)]);

  const rightRow =
    createLegalPointers(pointers.right) &&
    Array(Number(7 - piece.position.charAt(1)))
      .fill(pointers.right)
      .map(
        (item, index) => `${item.charAt(0)}${Number(item.charAt(1)) + index}`
      )
      .map((item) => pieces[item.charAt(0)][item.charAt(1)]);

  const bottomRow =
    createLegalPointers(pointers.bottom) &&
    Array(Number(7 - piece.position.charAt(0)))
      .fill(pointers.bottom)
      .map(
        (item, index) => `${Number(item.charAt(0)) + index}${item.charAt(1)}`
      )
      .map((item) => pieces[item.charAt(0)][item.charAt(1)]);

  const leftRow =
    createLegalPointers(pointers.left) &&
    Array(Number(piece.position.charAt(1)))
      .fill(pointers.left)
      .map(
        (item, index) => `${item.charAt(0)}${Number(item.charAt(1)) - index}`
      )
      .map((item) => pieces[item.charAt(0)][item.charAt(1)]);

  const createLegalMoves = (row) => {
    for (let index in row) {
      if (row[index].color === null) {
        rookMoves.push(row[index]);
      }
      if (row[index].color !== null) {
        rookMoves.push(row[index]);
        break;
      }
    }
  };

  createLegalMoves(topRow);
  createLegalMoves(rightRow);
  createLegalMoves(bottomRow);
  createLegalMoves(leftRow);

  rookMoves
    .filter((item) => item?.color !== modifier.color)
    .forEach((item) => {
      item.status = "move";
    });
};

export { selectRook };
export default selectRook;

const selectPawn = (piece, pieces) => {
  const modifier = {
    number: piece.color === "white" ? -1 : +1,
    color: piece.color === "white" ? "black" : "white",
  };

  const pawnMoves = [
    `${Number(piece.position.charAt(0)) + modifier.number}${Number(
      piece.position.charAt(1)
    )}`,
    `${Number(piece.position.charAt(0)) + modifier.number}${
      Number(piece.position.charAt(1)) - 1
    }`,
    `${Number(piece.position.charAt(0)) + modifier.number}${
      Number(piece.position.charAt(1)) + 1
    }`,
  ]
    .filter(
      (item) =>
        item.length === 2 &&
        Number(item.charAt(0)) >= 0 &&
        Number(item.charAt(0)) <= 7 &&
        Number(item.charAt(1)) >= 0 &&
        Number(item.charAt(1)) <= 7
    )
    .map((item) => pieces[item.charAt(0)][item.charAt(1)]);

  if (!pawnMoves[0]?.rank) {
    pawnMoves[0].status = "move";
  }
  pawnMoves?.slice(1).forEach((item) => {
    if (item?.color === modifier.color) {
      item.status = "move";
    }
  });
};

export { selectPawn };
export default selectPawn;

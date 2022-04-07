const selectKnight = (piece, pieces) => {
  const modifier = {
    color: piece.color === "white" ? "white" : "black",
  };

  const knightMoves = [
    `${Number(piece?.position?.charAt(0)) - 2}${
      Number(piece?.position?.charAt(1)) - 1
    }`,
    `${Number(piece?.position?.charAt(0)) - 2}${
      Number(piece?.position?.charAt(1)) + 1
    }`,
    `${Number(piece?.position?.charAt(0)) - 1}${
      Number(piece?.position?.charAt(1)) - 2
    }`,
    `${Number(piece?.position?.charAt(0)) - 1}${
      Number(piece?.position?.charAt(1)) + 2
    }`,
    `${Number(piece?.position?.charAt(0)) + 1}${
      Number(piece?.position?.charAt(1)) - 2
    }`,
    `${Number(piece?.position?.charAt(0)) + 1}${
      Number(piece?.position?.charAt(1)) + 2
    }`,
    `${Number(piece?.position?.charAt(0)) + 2}${
      Number(piece?.position?.charAt(1)) - 1
    }`,
    `${Number(piece?.position?.charAt(0)) + 2}${
      Number(piece?.position?.charAt(1)) + 1
    }`,
  ]
    .filter((item) => item.length === 2 && item >= 0 && item < 77)
    .map((item) => pieces[item.charAt(0)][item.charAt(1)]);

  knightMoves?.forEach((item) => {
    if (item.color !== modifier.color) {
      item.status = "move";
    }
  });
};

export { selectKnight };
export default selectKnight;

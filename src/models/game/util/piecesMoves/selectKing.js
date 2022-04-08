const selectKing = (piece, pieces) => {
  const modifier = {
    color: piece.color === "white" ? "white" : "black",
  };

  const kingMoves = [
    `${Number(piece?.position?.charAt(0)) + 1}${Number(
      piece?.position?.charAt(1)
    )}`,
    `${Number(piece?.position?.charAt(0)) + 1}${
      Number(piece?.position?.charAt(1)) + 1
    }`,
    `${Number(piece?.position?.charAt(0)) + 1}${
      Number(piece?.position?.charAt(1)) - 1
    }`,
    `${Number(piece?.position?.charAt(0))}${
      Number(piece?.position?.charAt(1)) + 1
    }`,
    `${Number(piece?.position?.charAt(0))}${
      Number(piece?.position?.charAt(1)) - 1
    }`,
    `${Number(piece?.position?.charAt(0)) - 1}${Number(
      piece?.position?.charAt(1)
    )}`,
    `${Number(piece?.position?.charAt(0)) - 1}${
      Number(piece?.position?.charAt(1)) + 1
    }`,
    `${Number(piece?.position?.charAt(0)) - 1}${
      Number(piece?.position?.charAt(1)) - 1
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

  kingMoves?.forEach((item) => {
    if (item?.color !== modifier.color) {
      item.status = "move";
    }
  });
};

export { selectKing };
export default selectKing;

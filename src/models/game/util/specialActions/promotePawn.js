const promotePawn = (pieces) => {
  pieces[0].forEach((item) => {
    if (item.color === "white" && item.rank === "pawn") {
      item.color = "white";
      item.rank = "queen";
      item.unicodeSymbol = "9813";
      item.status = "idle";
    }
  });

  pieces[7].forEach((item) => {
    if (item.color === "black" && item.rank === "pawn") {
      item.color = "black";
      item.rank = "queen";
      item.unicodeSymbol = "9819";
      item.status = "idle";
    }
  });
};

export { promotePawn };
export default promotePawn;

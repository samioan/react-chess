import { selectKing } from "../piecesMoves";

const checkEachKingMove = (pieces, pieceColor) => {
  const piecesCopy = JSON.parse(JSON.stringify(pieces));

  const king = piecesCopy
    .map((row) =>
      row.filter((item) => item.rank === "king" && item.color === pieceColor)
    )
    .find((item) => item.length === 1)[0];

  const kingPieces = [];

  selectKing(king, piecesCopy).forEach((item) => {
    const extraCopy = JSON.parse(JSON.stringify(piecesCopy));

    const piece =
      extraCopy[Number(item.position.charAt(0))][
        Number(item.position.charAt(1))
      ];

    const kinger =
      extraCopy[Number(king.position.charAt(0))][
        Number(king.position.charAt(1))
      ];

    piece.color = pieceColor;
    piece.rank = "king";
    piece.status = "idle";
    piece.unicodeSymbol = pieceColor === "white" ? "9812" : "9818";

    kinger.color = null;
    kinger.rank = null;
    kinger.status = null;
    kinger.unicodeSymbol = null;

    kingPieces.push(extraCopy);
  });

  return kingPieces;
};

export { checkEachKingMove };
export default checkEachKingMove;

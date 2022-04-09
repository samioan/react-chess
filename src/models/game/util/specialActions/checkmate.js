import {
  selectBishop,
  selectRook,
  selectKing,
  selectKnight,
  selectPawn,
} from "../piecesMoves";

const checkmate = (pieces, pieceColor, enemyPieceColor) => {
  const king = pieces
    .map((row) =>
      row.filter((item) => item.rank === "king" && item.color === pieceColor)
    )
    .find((item) => item.length === 1)[0];

  const kingCheck = [
    ...selectBishop(king, pieces),
    ...selectRook(king, pieces),
    ...selectKnight(king, pieces),
  ];

  const kingDanger = [];

  if (kingCheck?.some((item) => item.color === enemyPieceColor)) {
    kingCheck.forEach((item) => {
      switch (item.rank) {
        case "pawn":
          kingDanger.push(
            ...selectPawn(item, pieces)?.filter(
              (item) => item.rank === "king" && item.color === pieceColor
            )
          );
          break;
        case "rook":
          kingDanger.push(
            ...selectRook(item, pieces)?.filter(
              (item) => item.rank === "king" && item.color === pieceColor
            )
          );
          break;
        case "knight":
          kingDanger.push(
            ...selectKnight(item, pieces)?.filter(
              (item) => item.rank === "king" && item.color === pieceColor
            )
          );
          break;
        case "bishop":
          kingDanger.push(
            ...selectBishop(item, pieces)?.filter(
              (item) => item.rank === "king" && item.color === pieceColor
            )
          );
          break;
        case "queen":
          kingDanger.push(
            ...selectRook(item, pieces)?.filter(
              (item) => item.rank === "king" && item.color === pieceColor
            )
          );
          kingDanger.push(
            ...selectBishop(item, pieces)?.filter(
              (item) => item.rank === "king" && item.color === pieceColor
            )
          );
          break;
        case "king":
          kingDanger.push(
            ...selectKing(item, pieces)?.filter(
              (item) => item.rank === "king" && item.color === pieceColor
            )
          );
          break;
        default:
      }
    });

    if (kingDanger.length > 0) {
      console.log(`${pieceColor} danger!`, kingDanger);
      return true;
    }
  }
};

export { checkmate };
export default checkmate;

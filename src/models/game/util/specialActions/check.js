import {
  selectBishop,
  selectRook,
  selectKing,
  selectKnight,
  selectPawn,
} from "../piecesMoves";

const check = (pieces, pieceColor, enemyPieceColor) => {
  const kingCheck = pieces
    .map((row) => row.filter((item) => item.color === enemyPieceColor))
    .flat();

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
      return true;
    }
  }
};

export { check };
export default check;

import React from "react";
import Grid from "@material-ui/core/Grid";

import alternateTileColors from "./library/alternateTileColors";
import { Tile } from "./components";
import styles from "./styles";

const Board = ({ choosePiece, boardPieces, playersTurn }) => {
  const classes = styles();

  return (
    <div className={classes.board}>
      {boardPieces?.map((row, index) => (
        <Grid key={index} container className={classes.rowContainer}>
          {row.map((item) => (
            <Tile
              key={item.id}
              color={alternateTileColors(item)}
              status={item.status}
              unicodeSymbol={
                item.unicodeSymbol && String.fromCharCode(item.unicodeSymbol)
              }
              onClick={
                item.status === "selected" ||
                item.status === "move" ||
                item.color === playersTurn
                  ? () => choosePiece(item)
                  : () => {}
              }
            />
          ))}
        </Grid>
      ))}
    </div>
  );
};

export { Board };
export default Board;

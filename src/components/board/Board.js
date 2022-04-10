import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Tile from "../tile";
import { connect } from "react-redux";

import { boardPieces, playersTurn } from "../../models/game/selectors";
import { startGame, choosePiece } from "../../models/game/actions";
import alternateTileColors from "../../lib/alternateTileColors";

import styles from "./styles";

const Board = ({
  boardPieces,
  onClickPlayHandler,
  onClickChooseHandler,
  playersTurn,
}) => {
  const classes = styles();

  useEffect(() => {
    onClickPlayHandler();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <Grid container justifyContent="center">
        <Button onClick={onClickPlayHandler}>Reset Game</Button>
      </Grid>

      <div className={classes.board}>
        {boardPieces.map((row) =>
          row.map((item) => (
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
                  ? () => onClickChooseHandler(item)
                  : () => {}
              }
            />
          ))
        )}
      </div>

      <Typography variant="h6" align="center" gutterBottom>
        {playersTurn === "white" ? "White Plays" : "Black Plays"}
      </Typography>
    </div>
  );
};

const mapStateToProps = (state) => ({
  boardPieces: boardPieces(state),
  playersTurn: playersTurn(state),
});

const mapDispatchToProps = (dispatch) => ({
  onClickPlayHandler: () => dispatch(startGame()),
  onClickChooseHandler: (piece) => dispatch(choosePiece(piece)),
});

export { Board };
export default connect(mapStateToProps, mapDispatchToProps)(Board);

import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Tile from "../tile";
import { connect } from "react-redux";

import { boardPieces } from "../../models/game/selectors";
import { startGame, choosePiece } from "../../models/game/actions";
import colorPicker from "../../lib/colorPicker";

import styles from "./styles";

const Board = ({ boardPieces, onClickPlayHandler, onClickChooseHandler }) => {
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
        {boardPieces.map((tile, index) => (
          <Tile
            key={index}
            color={colorPicker(tile)}
            type={tile[1]}
            symbol={tile[3]}
            onClick={() => onClickChooseHandler(tile)}
          />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  boardPieces: boardPieces(state),
});

const mapDispatchToProps = (dispatch) => ({
  onClickPlayHandler: () => dispatch(startGame()),
  onClickChooseHandler: (piece) => dispatch(choosePiece(piece)),
});

export { Board };
export default connect(mapStateToProps, mapDispatchToProps)(Board);

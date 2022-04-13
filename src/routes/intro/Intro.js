import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { boardPieces, playersTurn, startGame } from "models/game";

// import styles from "./styles";

const Intro = ({ onClickPlayHandler }) => {
  // const classes = styles();

  return (
    <div>
      <Grid container justifyContent="center">
        <Link to="game">
          <Button onClick={onClickPlayHandler}>Play</Button>
        </Link>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  boardPieces: boardPieces(state),
  playersTurn: playersTurn(state),
});

const mapDispatchToProps = (dispatch) => ({
  onClickPlayHandler: () => dispatch(startGame()),
});

export { Intro };
export default connect(mapStateToProps, mapDispatchToProps)(Intro);

import React from "react";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import { boardPieces, playersTurn, startGame } from "models/game";

import links from "./constants/links";
import styles from "./styles";

const Intro = ({ onClickPlayHandler }) => {
  const classes = styles();

  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="center"
        className={classes.introContainer}
      >
        <Typography variant="h4" align="center" className={classes.title}>
          React Chess
        </Typography>

        <Typography variant="h6" align="center" className={classes.title}>
          Made with React, Redux and RxJS
        </Typography>

        <Divider />

        <Button
          onClick={onClickPlayHandler}
          href="game"
          className={classes.button}
        >
          New Game
        </Button>

        {links.map((item) => (
          <Button
            href={item.link}
            target="_blank"
            className={classes.buttonMiddle}
          >
            {item.title}
          </Button>
        ))}
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

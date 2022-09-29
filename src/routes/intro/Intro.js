import React from "react";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import styles from "./styles";

const Intro = () => {
  const classes = styles();

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      className={classes.introContainer}
    >
      <Typography variant="h1" align="center" className={classes.title}>
        React Chess
      </Typography>

      <Typography variant="h2" align="center" className={classes.subtitle}>
        Created with React, Redux and RxJS
      </Typography>

      <Divider />

      <Button component={Link} to="game" className={classes.button}>
        New Game
      </Button>
    </Grid>
  );
};

export { Intro };
export default Intro;

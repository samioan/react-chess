import React from "react";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import links from "./constants/links";
import styles from "./styles";

const Intro = () => {
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

        <Button component={Link} to="game" className={classes.button}>
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

export { Intro };
export default Intro;

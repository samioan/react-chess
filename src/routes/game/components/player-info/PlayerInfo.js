import React from "react";
import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";

import styles from "./styles";

const Board = ({ playerName, playerAvatar }) => {
  const classes = styles();

  return (
    <Grid container className={classes.playerContainer}>
      {playerAvatar ? (
        <img
          src={playerAvatar}
          alt={playerName.charAt(0)}
          className={classes.avatar}
        />
      ) : (
        <div className={classes.default}>{playerName.charAt(0)}</div>
      )}
      <Typography>{playerName}</Typography>
    </Grid>
  );
};

export { Board };
export default Board;

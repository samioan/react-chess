import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import styles from "./styles";

const PlayerInfo = ({ playerName, playerAvatar }) => {
  const classes = styles();

  return (
    <Grid container className={classes.playerContainer}>
      {!!playerAvatar ? (
        <img
          src={playerAvatar}
          alt={playerName.charAt(0)}
          className={classes.avatar}
        />
      ) : (
        <div className={classes.default}>
          <Typography>{playerName.charAt(0)}</Typography>
        </div>
      )}
      <Typography>{playerName}</Typography>
    </Grid>
  );
};

export { PlayerInfo };
export default PlayerInfo;

import React from "react";

import styles from "./styles";

const Tile = ({ type, color, symbol, onClick }) => {
  const classes = styles();
  return (
    <div className={classes[color]}>
      <div className={`${classes.tile} ${classes[type]}`} onClick={onClick}>
        <div>{symbol}</div>
      </div>
    </div>
  );
};

export { Tile };
export default Tile;

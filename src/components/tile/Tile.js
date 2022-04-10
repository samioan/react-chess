import React from "react";

import styles from "./styles";

const Tile = ({ status, color, unicodeSymbol, onClick }) => {
  const classes = styles();
  return (
    <div className={classes[color]}>
      <div className={`${classes.tile} ${classes[status]}`} onClick={onClick}>
        <div>{unicodeSymbol}</div>
      </div>
    </div>
  );
};

export { Tile };
export default Tile;

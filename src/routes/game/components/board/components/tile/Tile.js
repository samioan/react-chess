import React from "react";

import styles from "./styles";

const Tile = ({ status, color, unicodeSymbol, onClick }) => {
  const classes = styles();
  return (
    <div className={`${classes.colorContainer} ${classes[color]}`}>
      <div
        className={`${classes.tileContainer} ${classes[status]}`}
        onClick={onClick}
      >
        <div className={classes.symbol}>{unicodeSymbol}</div>
      </div>
    </div>
  );
};

export { Tile };
export default Tile;

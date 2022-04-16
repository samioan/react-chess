import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

const Board = ({ tooltipTitle, onClick, disabled, icon }) => (
  <Tooltip title={tooltipTitle}>
    <IconButton onClick={onClick} disabled={disabled}>
      {icon}
    </IconButton>
  </Tooltip>
);

export { Board };
export default Board;
